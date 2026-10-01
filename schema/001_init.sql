-- ROOTLINE schema 001_init.sql
-- Core Postgres DDL for The Hutson–Norwood Tree.
-- Valid CREATE TABLE statements with primary and foreign keys.
-- Not a production migration: no RLS policies, no job tables, no backfill.
-- Do not insert real family biography. SAMPLE rows are not loaded here.

BEGIN;

-- gen_random_uuid() is built into PostgreSQL 13+.
DO $$
BEGIN
  PERFORM gen_random_uuid();
EXCEPTION
  WHEN undefined_function THEN
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
END $$;

CREATE TYPE rl_date_qualifier AS ENUM (
  'exact',
  'about',
  'before',
  'after',
  'between',
  'unknown'
);

CREATE TYPE rl_line_tag AS ENUM (
  'hutson',
  'norwood',
  'both',
  'allied_other'
);

CREATE TYPE rl_privacy AS ENUM (
  'public_deceased',
  'members',
  'stewards',
  'owner_only',
  'hidden'
);

CREATE TYPE rl_living AS ENUM (
  'living',
  'deceased',
  'unknown'
);

CREATE TYPE rl_workflow AS ENUM (
  'draft',
  'pending',
  'changes_requested',
  'approved',
  'declined',
  'withdrawn'
);

-- Orthogonal to workflow status. Living-adult veto, guardian consent,
-- and profile-steward consent for a deceased person use this gate.
CREATE TYPE rl_consent_gate AS ENUM (
  'not_required',
  'awaiting',
  'granted',
  'vetoed'
);

CREATE TYPE rl_voice_attach AS ENUM (
  'pending_transcript',
  'needs_steward_attach',
  'attached',
  'rejected'
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  email_normalized text GENERATED ALWAYS AS (lower(btrim(email))) STORED,
  password_hash text,
  display_name text NOT NULL,
  magic_link_enabled boolean NOT NULL DEFAULT true,
  two_factor_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  disabled_at timestamptz,
  CONSTRAINT users_email_unique UNIQUE (email_normalized),
  CONSTRAINT users_email_shape CHECK (position('@' IN email) > 1)
);

CREATE TABLE places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  locality text,
  region text,
  country text,
  latitude double precision,
  longitude double precision,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT places_lat_range CHECK (
    latitude IS NULL OR (latitude >= -90 AND latitude <= 90)
  ),
  CONSTRAINT places_lon_range CHECK (
    longitude IS NULL OR (longitude >= -180 AND longitude <= 180)
  )
);

CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  living_status rl_living NOT NULL DEFAULT 'unknown',
  -- Empty array means the line is not yet known. Never invent a line tag.
  line_tags rl_line_tag[] NOT NULL DEFAULT ARRAY[]::rl_line_tag[],
  is_sample boolean NOT NULL DEFAULT false,
  sex_gender text,
  sex_gender_privacy rl_privacy NOT NULL DEFAULT 'owner_only',
  profile_steward_user_id uuid,
  current_version integer NOT NULL DEFAULT 1 CHECK (current_version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT people_profile_steward_fk
    FOREIGN KEY (profile_steward_user_id) REFERENCES users (id)
);

CREATE TABLE person_names (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  name_kind text NOT NULL CHECK (
    name_kind IN ('preferred', 'birth', 'nickname', 'married', 'other')
  ),
  full_name text NOT NULL,
  given_name text,
  surname text,
  is_preferred boolean NOT NULL DEFAULT false,
  sort_key text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX person_names_one_preferred
  ON person_names (person_id)
  WHERE is_preferred;

ALTER TABLE people
  ADD COLUMN preferred_name_id uuid REFERENCES person_names (id);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_kind text NOT NULL CHECK (
    event_kind IN (
      'birth', 'death', 'marriage', 'migration', 'military',
      'civic', 'church', 'education', 'other'
    )
  ),
  title text NOT NULL,
  date_qualifier rl_date_qualifier NOT NULL DEFAULT 'unknown',
  date_start date,
  date_end date,
  date_display text,
  place_id uuid REFERENCES places (id),
  description text,
  privacy rl_privacy NOT NULL DEFAULT 'members',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT events_date_shape CHECK (
    (
      date_qualifier = 'unknown'
      AND date_start IS NULL
      AND date_end IS NULL
    )
    OR (
      date_qualifier = 'between'
      AND date_start IS NOT NULL
      AND date_end IS NOT NULL
      AND date_start <= date_end
    )
    OR (
      date_qualifier IN ('exact', 'about', 'before', 'after')
      AND date_start IS NOT NULL
      AND date_end IS NULL
    )
  )
);

CREATE TABLE person_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  event_id uuid REFERENCES events (id),
  fact_kind text NOT NULL CHECK (
    fact_kind IN (
      'birth', 'death', 'marriage', 'occupation', 'education',
      'military_service', 'residence', 'burial', 'public_life',
      'social_link', 'other'
    )
  ),
  date_qualifier rl_date_qualifier NOT NULL DEFAULT 'unknown',
  date_start date,
  date_end date,
  date_display text,
  place_id uuid REFERENCES places (id),
  value_text text,
  privacy rl_privacy NOT NULL DEFAULT 'members',
  is_contested boolean NOT NULL DEFAULT false,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  superseded_by uuid REFERENCES person_facts (id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT person_facts_date_shape CHECK (
    (
      date_qualifier = 'unknown'
      AND date_start IS NULL
      AND date_end IS NULL
    )
    OR (
      date_qualifier = 'between'
      AND date_start IS NOT NULL
      AND date_end IS NOT NULL
      AND date_start <= date_end
    )
    OR (
      date_qualifier IN ('exact', 'about', 'before', 'after')
      AND date_start IS NOT NULL
      AND date_end IS NULL
    )
  ),
  -- Social links are never public-site material.
  CONSTRAINT person_facts_social_not_public CHECK (
    fact_kind <> 'social_link'
    OR privacy IN ('owner_only', 'hidden', 'members', 'stewards')
  )
);

CREATE INDEX person_facts_person_idx ON person_facts (person_id);
CREATE INDEX person_facts_kind_idx ON person_facts (fact_kind);

CREATE TABLE relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_person_id uuid NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  to_person_id uuid NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  -- parent / step_parent / adoptive_parent: from_person is the parent of to_person.
  -- partner, spouse, and sibling kinds: store one row; application orders the ids.
  rel_kind text NOT NULL CHECK (
    rel_kind IN (
      'parent', 'partner', 'spouse', 'sibling', 'step_parent',
      'adoptive_parent', 'half_sibling', 'step_sibling', 'chosen_family'
    )
  ),
  date_qualifier rl_date_qualifier NOT NULL DEFAULT 'unknown',
  date_start date,
  date_end date,
  privacy rl_privacy NOT NULL DEFAULT 'members',
  -- Application may set true only while the Steward chosen-family rule is on.
  chosen_family_enabled_snapshot boolean NOT NULL DEFAULT false,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT relationships_not_self CHECK (from_person_id <> to_person_id),
  CONSTRAINT relationships_date_shape CHECK (
    (
      date_qualifier = 'unknown'
      AND date_start IS NULL
      AND date_end IS NULL
    )
    OR (
      date_qualifier = 'between'
      AND date_start IS NOT NULL
      AND date_end IS NOT NULL
      AND date_start <= date_end
    )
    OR (
      date_qualifier IN ('exact', 'about', 'before', 'after')
      AND date_start IS NOT NULL
      AND date_end IS NULL
    )
  ),
  CONSTRAINT relationships_chosen_family_gate CHECK (
    rel_kind <> 'chosen_family' OR chosen_family_enabled_snapshot = true
  )
);

CREATE INDEX relationships_from_idx ON relationships (from_person_id);
CREATE INDEX relationships_to_idx ON relationships (to_person_id);

CREATE TABLE sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  source_kind text NOT NULL CHECK (
    source_kind IN (
      'document', 'oral_history', 'photograph', 'certificate', 'obituary', 'other'
    )
  ),
  citation_text text NOT NULL,
  created_by uuid REFERENCES users (id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_key_original text NOT NULL,
  storage_key_display text,
  mime_type text NOT NULL,
  byte_size bigint,
  caption text,
  uploaded_by uuid REFERENCES users (id),
  privacy rl_privacy NOT NULL DEFAULT 'members',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT media_byte_size_nonnegative CHECK (byte_size IS NULL OR byte_size >= 0)
);

ALTER TABLE sources
  ADD COLUMN primary_media_id uuid REFERENCES media (id);

CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  story_kind text NOT NULL CHECK (
    story_kind IN ('story', 'letter', 'recipe', 'memory')
  ),
  author_user_id uuid REFERENCES users (id),
  privacy rl_privacy NOT NULL DEFAULT 'members',
  current_version integer NOT NULL DEFAULT 1 CHECK (current_version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE story_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid NOT NULL REFERENCES stories (id) ON DELETE CASCADE,
  person_id uuid REFERENCES people (id),
  event_id uuid REFERENCES events (id),
  place_id uuid REFERENCES places (id),
  CONSTRAINT story_links_has_target CHECK (
    person_id IS NOT NULL OR event_id IS NOT NULL OR place_id IS NOT NULL
  )
);

CREATE INDEX story_links_story_idx ON story_links (story_id);

CREATE TABLE media_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id uuid NOT NULL REFERENCES media (id) ON DELETE CASCADE,
  person_id uuid REFERENCES people (id),
  story_id uuid REFERENCES stories (id),
  event_id uuid REFERENCES events (id),
  place_id uuid REFERENCES places (id),
  link_role text NOT NULL CHECK (
    link_role IN ('portrait', 'gallery', 'document', 'audio', 'other')
  ),
  CONSTRAINT media_links_has_target CHECK (
    person_id IS NOT NULL
    OR story_id IS NOT NULL
    OR event_id IS NOT NULL
    OR place_id IS NOT NULL
  )
);

CREATE INDEX media_links_media_idx ON media_links (media_id);
CREATE INDEX media_links_person_idx ON media_links (person_id);

CREATE TABLE voice_memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id uuid NOT NULL REFERENCES media (id),
  story_id uuid REFERENCES stories (id),
  transcript_text text,
  attach_status rl_voice_attach NOT NULL DEFAULT 'needs_steward_attach',
  attached_person_id uuid REFERENCES people (id),
  attached_event_id uuid REFERENCES events (id),
  attached_by uuid REFERENCES users (id),
  attached_at timestamptz,
  -- False until a Steward attaches the transcript. Ask Rootline must ignore these rows.
  rag_eligible boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT voice_rag_requires_steward_attach CHECK (
    rag_eligible = false
    OR (
      attach_status = 'attached'
      AND attached_by IS NOT NULL
      AND transcript_text IS NOT NULL
      AND char_length(btrim(transcript_text)) > 0
      AND (
        attached_person_id IS NOT NULL
        OR attached_event_id IS NOT NULL
        OR story_id IS NOT NULL
      )
    )
  )
);

CREATE TABLE honor_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  category text NOT NULL CHECK (
    category IN ('military', 'civic', 'church', 'educators', 'firsts')
  ),
  title text NOT NULL,
  summary text,
  -- A badge cannot exist without a source. Extra citations may also point here.
  source_id uuid NOT NULL REFERENCES sources (id),
  privacy rl_privacy NOT NULL DEFAULT 'members',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX honor_badges_person_idx ON honor_badges (person_id);

-- Many citations may point at one fact, event, story, badge, or relationship.
CREATE TABLE citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES sources (id),
  person_fact_id uuid REFERENCES person_facts (id) ON DELETE CASCADE,
  event_id uuid REFERENCES events (id) ON DELETE CASCADE,
  story_id uuid REFERENCES stories (id) ON DELETE CASCADE,
  honor_badge_id uuid REFERENCES honor_badges (id) ON DELETE CASCADE,
  relationship_id uuid REFERENCES relationships (id) ON DELETE CASCADE,
  locator text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT citations_one_target CHECK (
    (person_fact_id IS NOT NULL)::integer
    + (event_id IS NOT NULL)::integer
    + (story_id IS NOT NULL)::integer
    + (honor_badge_id IS NOT NULL)::integer
    + (relationship_id IS NOT NULL)::integer
    = 1
  )
);

CREATE INDEX citations_fact_idx ON citations (person_fact_id);
CREATE INDEX citations_source_idx ON citations (source_id);

CREATE TABLE memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users (id),
  status text NOT NULL CHECK (
    status IN ('pending', 'active', 'suspended', 'ended')
  ),
  person_id uuid REFERENCES people (id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- One active membership per account (single tree).
CREATE UNIQUE INDEX memberships_one_active_per_user
  ON memberships (user_id)
  WHERE status = 'active';

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users (id),
  role_name text NOT NULL CHECK (
    role_name IN (
      'member', 'reviewer', 'steward', 'founding_steward',
      'profile_steward', 'guardian'
    )
  ),
  scope_person_id uuid REFERENCES people (id),
  granted_by uuid REFERENCES users (id),
  grant_reason text NOT NULL CHECK (char_length(btrim(grant_reason)) > 0),
  granted_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  CONSTRAINT roles_scope_when_needed CHECK (
    (
      role_name IN ('profile_steward', 'guardian')
      AND scope_person_id IS NOT NULL
    )
    OR role_name NOT IN ('profile_steward', 'guardian')
  )
);

CREATE INDEX roles_user_idx ON roles (user_id) WHERE revoked_at IS NULL;

CREATE TABLE invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  issued_by uuid NOT NULL REFERENCES users (id),
  issuer_is_steward boolean NOT NULL DEFAULT false,
  auto_approve boolean NOT NULL DEFAULT false,
  expires_at timestamptz,
  max_uses integer NOT NULL DEFAULT 1,
  use_count integer NOT NULL DEFAULT 0,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT invites_max_uses_positive CHECK (max_uses > 0),
  CONSTRAINT invites_use_count_nonnegative CHECK (use_count >= 0),
  CONSTRAINT invites_uses_within_max CHECK (use_count <= max_uses),
  -- Member-issued codes cannot auto-approve. Steward-issued codes may.
  CONSTRAINT invites_auto_only_for_steward CHECK (
    auto_approve = false OR issuer_is_steward = true
  )
);

CREATE TABLE access_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users (id),
  invite_id uuid REFERENCES invites (id),
  full_name text NOT NULL,
  asserted_relationship text NOT NULL,
  voucher_person_id uuid REFERENCES people (id),
  is_minor boolean NOT NULL DEFAULT false,
  guardian_user_id uuid REFERENCES users (id),
  status rl_workflow NOT NULL DEFAULT 'draft',
  consent_gate rl_consent_gate NOT NULL DEFAULT 'not_required',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT access_claims_minor_guardian_to_approve CHECK (
    status IS DISTINCT FROM 'approved'
    OR is_minor = false
    OR guardian_user_id IS NOT NULL
  ),
  CONSTRAINT access_claims_minor_consent_to_approve CHECK (
    status IS DISTINCT FROM 'approved'
    OR is_minor = false
    OR consent_gate = 'granted'
  ),
  CONSTRAINT access_claims_veto_not_open CHECK (
    consent_gate <> 'vetoed'
    OR status IN ('declined', 'withdrawn')
  )
);

CREATE INDEX access_claims_status_idx ON access_claims (status, created_at);

CREATE TABLE proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_kind text NOT NULL CHECK (
    proposal_kind IN (
      'new_person', 'relationship', 'photo', 'story', 'voice_memory',
      'correction', 'social_link', 'honor_badge', 'merge'
    )
  ),
  proposer_user_id uuid NOT NULL REFERENCES users (id),
  target_person_id uuid REFERENCES people (id),
  merge_into_person_id uuid REFERENCES people (id),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status rl_workflow NOT NULL DEFAULT 'draft',
  consent_gate rl_consent_gate NOT NULL DEFAULT 'not_required',
  living_owner_user_id uuid REFERENCES users (id),
  -- Theories stay off the official tree: a sandbox proposal cannot be approved.
  research_sandbox boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT proposals_merge_pair CHECK (
    proposal_kind <> 'merge'
    OR (
      target_person_id IS NOT NULL
      AND merge_into_person_id IS NOT NULL
      AND target_person_id <> merge_into_person_id
    )
  ),
  CONSTRAINT proposals_approved_needs_consent CHECK (
    status <> 'approved'
    OR consent_gate IN ('not_required', 'granted')
  ),
  CONSTRAINT proposals_awaiting_blocks_approval CHECK (
    consent_gate <> 'awaiting'
    OR status IN ('pending', 'changes_requested', 'withdrawn', 'declined')
  ),
  CONSTRAINT proposals_veto_closes CHECK (
    consent_gate <> 'vetoed'
    OR status IN ('declined', 'withdrawn')
  ),
  CONSTRAINT proposals_sandbox_not_official CHECK (
    research_sandbox = false OR status <> 'approved'
  ),
  CONSTRAINT proposals_draft_gate_clear CHECK (
    status <> 'draft' OR consent_gate = 'not_required'
  )
);

CREATE INDEX proposals_queue_idx ON proposals (status, created_at);

CREATE TABLE approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid REFERENCES proposals (id),
  access_claim_id uuid REFERENCES access_claims (id),
  actor_user_id uuid NOT NULL REFERENCES users (id),
  actor_capacity text NOT NULL CHECK (
    actor_capacity IN (
      'member', 'reviewer', 'steward', 'living_owner',
      'guardian', 'profile_steward'
    )
  ),
  decision text NOT NULL CHECK (
    decision IN (
      'submit', 'request_changes', 'approve', 'decline',
      'withdraw', 'veto', 'consent_grant', 'attach'
    )
  ),
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT approvals_reason_required CHECK (char_length(btrim(reason)) > 0),
  CONSTRAINT approvals_one_subject CHECK (
    (proposal_id IS NOT NULL)::integer
    + (access_claim_id IS NOT NULL)::integer
    = 1
  )
);

CREATE INDEX approvals_proposal_idx ON approvals (proposal_id);
CREATE INDEX approvals_claim_idx ON approvals (access_claim_id);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users (id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  reason text,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT audit_decision_needs_reason CHECK (
    action NOT IN (
      'proposal.approve', 'proposal.decline', 'proposal.request_changes',
      'proposal.veto', 'proposal.withdraw',
      'claim.approve', 'claim.decline', 'claim.request_changes',
      'claim.veto', 'archive.delete', 'role.grant', 'export.create'
    )
    OR (reason IS NOT NULL AND char_length(btrim(reason)) > 0)
  )
);

CREATE INDEX audit_events_entity_idx ON audit_events (entity_type, entity_id, created_at);

CREATE TABLE privacy_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL UNIQUE REFERENCES people (id) ON DELETE CASCADE,
  profile_visibility rl_privacy NOT NULL DEFAULT 'members',
  address_visibility rl_privacy NOT NULL DEFAULT 'hidden',
  social_visibility rl_privacy NOT NULL DEFAULT 'hidden',
  new_photos_need_owner boolean NOT NULL DEFAULT true,
  -- When false, Ask Rootline does not mention this person at all.
  mention_in_ask boolean NOT NULL DEFAULT true,
  hide_from_public_site boolean NOT NULL DEFAULT true,
  birthday_notices_opt_in boolean NOT NULL DEFAULT false,
  remembrance_notices_opt_in boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE steward_succession (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  steward_user_id uuid NOT NULL REFERENCES users (id),
  successor_user_id uuid NOT NULL REFERENCES users (id),
  succession_order integer NOT NULL,
  named_reason text NOT NULL,
  named_at timestamptz NOT NULL DEFAULT now(),
  accepted_at timestamptz,
  revoked_at timestamptz,
  CONSTRAINT succession_order_positive CHECK (succession_order > 0),
  CONSTRAINT succession_not_self CHECK (steward_user_id <> successor_user_id),
  CONSTRAINT succession_reason_required CHECK (char_length(btrim(named_reason)) > 0)
);

CREATE UNIQUE INDEX steward_succession_active_order
  ON steward_succession (steward_user_id, succession_order)
  WHERE revoked_at IS NULL;

CREATE TABLE exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by uuid NOT NULL REFERENCES users (id),
  export_kind text NOT NULL CHECK (
    export_kind IN ('gedcom', 'media_bundle', 'pdf_book', 'full')
  ),
  status text NOT NULL CHECK (
    status IN ('queued', 'running', 'ready', 'failed')
  ),
  storage_key text,
  scheduled boolean NOT NULL DEFAULT false,
  cadence text,
  error_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT exports_cadence_known CHECK (
    cadence IS NULL OR cadence IN ('monthly', 'quarterly', 'manual')
  )
);

CREATE INDEX exports_requested_idx ON exports (requested_by, created_at DESC);

COMMENT ON TABLE people IS
  'Official person records only. Member edits arrive as proposals. is_sample must stay true until the Founding Steward confirms a real identity.';
COMMENT ON COLUMN person_facts.date_qualifier IS
  'exact, about, before, after, between, or unknown. Unknown is valid. Do not invent a date.';
COMMENT ON TABLE citations IS
  'Multiple rows may cite the same person_fact_id (or event, story, badge, relationship).';
COMMENT ON COLUMN honor_badges.source_id IS
  'Required. An honor badge without a source cannot be inserted.';
COMMENT ON COLUMN voice_memories.rag_eligible IS
  'Stays false until attach_status = attached by a Steward. Ask Rootline indexes only eligible rows that are also on approved records.';
COMMENT ON TABLE privacy_settings IS
  'Living address and social default hidden. Public site defaults hidden. Birthday and remembrance notices default off.';

COMMIT;
