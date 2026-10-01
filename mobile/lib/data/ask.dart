// Ask Rootline — deterministic canned stubs (no external LLM).

class AskChip {
  const AskChip({
    required this.id,
    required this.label,
    required this.query,
    required this.answer,
  });

  final String id;
  final String label;
  final String query;
  final String answer;
}

const List<AskChip> askChips = [
  AskChip(
    id: 'kinship',
    label: 'Kinship',
    query: 'How am I related to Haven?',
    answer:
        'Haven Nicole Norwood is your spouse (approved legal marriage on the official tree). '
        'No invented links.',
  ),
  AskChip(
    id: 'parents',
    label: 'Parents',
    query: 'Who are Sommer’s parents?',
    answer:
        'Approved parents of Sommer Michelle Norwood: Carter McGrew Norwood III; Sondra Yvonne Norwood.',
  ),
  AskChip(
    id: 'refuse-address',
    label: 'Living address',
    query: 'What is Charlie’s street address?',
    answer:
        'I can’t share a living person’s private address. Charles Sepe Tiaraju Hutson’s privacy settings keep that field private. '
        'If you need to reach a Steward, use the Stewards / contact path in the app — not Ask Rootline for private contact details.',
  ),
];
