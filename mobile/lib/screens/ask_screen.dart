import 'package:flutter/material.dart';
import '../data/ask.dart';
import '../theme/tokens.dart';

/// Ask Rootline — chip-driven canned stubs, no external LLM.
class AskScreen extends StatefulWidget {
  const AskScreen({super.key});

  @override
  State<AskScreen> createState() => _AskScreenState();
}

class _AskScreenState extends State<AskScreen> {
  AskChip? _active;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Text('Ask Rootline', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 4),
        Text(
          'Deterministic SAMPLE stubs · no external LLM · never invents facts',
          style: Theme.of(context).textTheme.bodySmall,
        ),
        const SizedBox(height: 16),
        Text('Try a chip', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: askChips.map((chip) {
            final selected = _active?.id == chip.id;
            return ChoiceChip(
              label: Text(chip.label),
              selected: selected,
              onSelected: (_) => setState(() => _active = chip),
              selectedColor: RlTokens.plumWash,
              labelStyle: TextStyle(
                color: selected ? RlTokens.plum : RlTokens.ink,
                fontWeight: FontWeight.w600,
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 20),
        if (_active == null)
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                'Pick Kinship, Military, or Living address to see a canned answer '
                'from the approved SAMPLE archive (or a privacy refusal).',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ),
          )
        else ...[
          Text(
            _active!.query,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: RlTokens.plum,
                ),
          ),
          const SizedBox(height: 10),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(
                        _active!.id == 'refuse-address'
                            ? Icons.block
                            : Icons.chat_bubble_outline,
                        size: 18,
                        color: _active!.id == 'refuse-address'
                            ? RlTokens.danger
                            : RlTokens.teal,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        _active!.id == 'refuse-address'
                            ? 'Refused'
                            : 'Answer (SAMPLE)',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: _active!.id == 'refuse-address'
                              ? RlTokens.danger
                              : RlTokens.ink,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _active!.answer,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          ),
        ],
      ],
    );
  }
}
