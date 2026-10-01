import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';
import '../widgets/person_card.dart';

class PeopleScreen extends StatefulWidget {
  const PeopleScreen({super.key});

  @override
  State<PeopleScreen> createState() => _PeopleScreenState();
}

class _PeopleScreenState extends State<PeopleScreen> {
  String _filter = 'all';

  List<Person> get _filtered {
    switch (_filter) {
      case 'norwood':
        return peopleList
            .where((p) =>
                p.line == LineTag.norwood || p.line == LineTag.both)
            .toList();
      case 'hutson':
        return peopleList
            .where((p) =>
                p.line == LineTag.hutson || p.line == LineTag.both)
            .toList();
      case 'honor':
        return peopleList.where((p) => p.honor != null).toList();
      default:
        return peopleList;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: Text(
            'People',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 4, 16, 8),
          child: Text(
            'SAMPLE directory · equal Norwood / Hutson billing',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            children: [
              _FilterChip(
                label: 'All',
                selected: _filter == 'all',
                onTap: () => setState(() => _filter = 'all'),
              ),
              _FilterChip(
                label: 'Norwood',
                selected: _filter == 'norwood',
                color: RlTokens.plum,
                onTap: () => setState(() => _filter = 'norwood'),
              ),
              _FilterChip(
                label: 'Hutson',
                selected: _filter == 'hutson',
                color: RlTokens.teal,
                onTap: () => setState(() => _filter = 'hutson'),
              ),
              _FilterChip(
                label: 'Honor',
                selected: _filter == 'honor',
                color: RlTokens.honorGold,
                onTap: () => setState(() => _filter = 'honor'),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
            itemCount: _filtered.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, i) {
              final p = _filtered[i];
              return PersonCard(
                person: p,
                onTap: () {
                  showModalBottomSheet<void>(
                    context: context,
                    backgroundColor: RlTokens.surface,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.vertical(
                        top: Radius.circular(16),
                      ),
                    ),
                    builder: (_) => _PersonSheet(person: p),
                  );
                },
              );
            },
          ),
        ),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
    this.color,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final accent = color ?? RlTokens.plum;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: FilterChip(
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
        selectedColor: accent.withValues(alpha: 0.25),
        checkmarkColor: accent,
        labelStyle: TextStyle(
          color: selected ? accent : RlTokens.ink,
          fontWeight: FontWeight.w600,
          fontSize: 13,
        ),
      ),
    );
  }
}

class _PersonSheet extends StatelessWidget {
  const _PersonSheet({required this.person});
  final Person person;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 28),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(person.fullName, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 4),
          Text(
            '${person.yearsDisplay} · ${person.placeDisplay}',
            style: Theme.of(context).textTheme.bodySmall,
          ),
          const SizedBox(height: 12),
          _Field(label: 'Birth', value: person.birthDisplay),
          _Field(label: 'Occupation', value: person.occupationDisplay),
          _Field(label: 'Military', value: person.militaryDisplay),
          if (person.honor != null)
            _Field(
              label: 'Honor (gold)',
              value: '${person.honor!.title} — ${person.honor!.summary}',
            ),
          if (person.privacyOn)
            const Padding(
              padding: EdgeInsets.only(top: 8),
              child: Text(
                'Privacy ON — living address / social hidden.',
                style: TextStyle(
                  color: RlTokens.inkMuted,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          const SizedBox(height: 8),
          Text(
            'SAMPLE profile stub — not verified biography.',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: RichText(
        text: TextSpan(
          style: Theme.of(context).textTheme.bodyMedium,
          children: [
            TextSpan(
              text: '$label: ',
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            TextSpan(text: value),
          ],
        ),
      ),
    );
  }
}
