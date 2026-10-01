import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';

class LineChip extends StatelessWidget {
  const LineChip({super.key, required this.line});

  final LineTag line;

  @override
  Widget build(BuildContext context) {
    late final String label;
    late final Color bg;
    late final Color fg;
    switch (line) {
      case LineTag.norwood:
        label = 'Norwood';
        bg = RlTokens.plumWash;
        fg = RlTokens.plum;
      case LineTag.hutson:
        label = 'Hutson';
        bg = RlTokens.tealWash;
        fg = RlTokens.teal;
      case LineTag.both:
        label = 'Both lines';
        bg = RlTokens.plumWash;
        fg = RlTokens.ink;
      case LineTag.alliedOther:
        label = 'Allied';
        bg = RlTokens.border;
        fg = RlTokens.inkMuted;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(RlTokens.radiusSm),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: fg,
        ),
      ),
    );
  }
}
