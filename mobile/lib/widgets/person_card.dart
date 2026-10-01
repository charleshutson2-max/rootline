import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';
import 'line_chip.dart';
import 'person_avatar.dart';

class PersonCard extends StatelessWidget {
  const PersonCard({super.key, required this.person, this.onTap});

  final Person person;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(RlTokens.radiusMd),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              PersonAvatar(person: person, size: 52),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            person.fullName,
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ),
                        if (person.honor != null)
                          const Padding(
                            padding: EdgeInsets.only(left: 4),
                            child: Icon(
                              Icons.star,
                              size: 16,
                              color: RlTokens.honorGold,
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      person.yearsDisplay,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 6),
                    Wrap(
                      spacing: 6,
                      runSpacing: 4,
                      children: [
                        LineChip(line: person.line),
                        if (person.privacyOn)
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 3,
                            ),
                            decoration: BoxDecoration(
                              color: RlTokens.border,
                              borderRadius:
                                  BorderRadius.circular(RlTokens.radiusSm),
                            ),
                            child: const Text(
                              'Privacy ON',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: RlTokens.inkMuted,
                              ),
                            ),
                          ),
                        if (person.honor != null)
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 3,
                            ),
                            decoration: BoxDecoration(
                              color: RlTokens.goldWash,
                              borderRadius:
                                  BorderRadius.circular(RlTokens.radiusSm),
                            ),
                            child: Text(
                              person.honor!.title,
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: RlTokens.ink,
                              ),
                            ),
                          ),
                      ],
                    ),
                    if (person.roleNote != null) ...[
                      const SizedBox(height: 6),
                      Text(
                        person.roleNote!,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
