import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';
import '../widgets/person_avatar.dart';

/// Official Hutson–Norwood core pedigree (Founding Steward facts).
class TreeScreen extends StatelessWidget {
  const TreeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Text(kTreeName, style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 4),
        Text(
          'Official core · equal billing · focus Haven & Charlie',
          style: Theme.of(context).textTheme.bodySmall,
        ),
        const SizedBox(height: 20),
        const _GenerationLabel(label: 'Generation · Carter II & Carol Anne'),
        const _NodeRow(people: [carterIi, carolAnne]),
        const SizedBox(height: 4),
        Center(
          child: Text(
            'spouse · Carol Anne deceased May 16, 2024',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontStyle: FontStyle.italic,
                ),
          ),
        ),
        const SizedBox(height: 8),
        const _Connector(),
        const SizedBox(height: 8),
        const _GenerationLabel(label: 'Children · III, Carla · Sondra · Brenda'),
        const _NodeRow(people: [carterIii, carla]),
        const SizedBox(height: 8),
        const _NodeRow(people: [sondra, brenda]),
        const SizedBox(height: 4),
        Center(
          child: Text(
            'III ═ Sondra · Brenda → Sondra',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  fontStyle: FontStyle.italic,
                ),
          ),
        ),
        const SizedBox(height: 8),
        const _Connector(),
        const SizedBox(height: 8),
        const _GenerationLabel(label: 'Haven ═ Charlie · Sommer ⟷ Derek'),
        const _NodeRow(people: [haven, charlie], highlight: true),
        const SizedBox(height: 8),
        const _NodeRow(people: [sommer, derek]),
        const SizedBox(height: 24),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Line key', style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 10),
                const _KeyRow(color: RlTokens.plum, label: 'Norwood (plum ring)'),
                const SizedBox(height: 6),
                const _KeyRow(color: RlTokens.teal, label: 'Hutson (teal ring)'),
                const SizedBox(height: 6),
                const _KeyRow(
                  color: RlTokens.honorGold,
                  label: 'Honor gold — medals / Honor Roll ONLY',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _GenerationLabel extends StatelessWidget {
  const _GenerationLabel({required this.label});
  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        label,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              fontWeight: FontWeight.w600,
              letterSpacing: 0.04,
            ),
      ),
    );
  }
}

class _Connector extends StatelessWidget {
  const _Connector();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 2,
        height: 20,
        color: RlTokens.border,
      ),
    );
  }
}

class _NodeRow extends StatelessWidget {
  const _NodeRow({required this.people, this.highlight = false});
  final List<Person> people;
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.center,
      spacing: 12,
      runSpacing: 12,
      children: [
        for (final p in people)
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: highlight ? RlTokens.tealWash : RlTokens.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: highlight ? RlTokens.teal : RlTokens.border,
              ),
            ),
            child: Column(
              children: [
                PersonAvatar(person: p, size: 48),
                const SizedBox(height: 6),
                Text(
                  p.preferredName,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Text(
                  p.livingStatus == LivingStatus.living
                      ? 'Living'
                      : p.deathDisplay,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _KeyRow extends StatelessWidget {
  const _KeyRow({required this.color, required this.label});
  final Color color;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 14,
          height: 14,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 8),
        Expanded(child: Text(label, style: Theme.of(context).textTheme.bodySmall)),
      ],
    );
  }
}
