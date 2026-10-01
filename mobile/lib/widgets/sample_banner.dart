import 'package:flutter/material.dart';
import '../theme/tokens.dart';

/// Official core banner — mirrors web SampleBanner (official mode).
class SampleBanner extends StatelessWidget {
  const SampleBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: RlTokens.plum,
      child: SafeArea(
        bottom: false,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: const BoxDecoration(
            border: Border(bottom: BorderSide(color: RlTokens.border)),
          ),
          child: Row(
            children: [
              const Icon(Icons.info_outline, size: 18, color: Colors.white70),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Official Hutson–Norwood core · Founding Steward Charlie · '
                  'equal billing Norwood plum / Hutson teal',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
