import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';
import '../widgets/line_chip.dart';

class StoriesScreen extends StatelessWidget {
  const StoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Text('Stories', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 4),
        Text(
          'SAMPLE approved memories · placeholder prose only',
          style: Theme.of(context).textTheme.bodySmall,
        ),
        const SizedBox(height: 16),
        ...stories.map((s) {
          final person = getPerson(s.personId);
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            s.title,
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ),
                        LineChip(line: s.line),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${s.kind} · ${person?.fullName ?? s.personId} · ${s.status}',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 10),
                    Text(s.body, style: Theme.of(context).textTheme.bodyMedium),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: RlTokens.goldWash,
                        borderRadius: BorderRadius.circular(RlTokens.radiusSm),
                      ),
                      child: const Text(
                        'SAMPLE',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: RlTokens.ink,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        }),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Text(
              'Empty state (teaching): propose a memory with a source for Steward review. '
              'Nothing unpublished appears in Ask.',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ),
        ),
      ],
    );
  }
}
