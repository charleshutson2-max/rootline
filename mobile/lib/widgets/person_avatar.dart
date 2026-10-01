import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';

/// Person ring: plum (Norwood), teal (Hutson), split (both).
/// Gold honor mark overlay when [person.honor] is set.
class PersonAvatar extends StatelessWidget {
  const PersonAvatar({
    super.key,
    required this.person,
    this.size = 48,
  });

  final Person person;
  final double size;

  @override
  Widget build(BuildContext context) {
    final ring = size;
    final inner = size - RlTokens.ringWidth * 2;
    return SizedBox(
      width: ring + (person.honor != null ? 4 : 0),
      height: ring + (person.honor != null ? 4 : 0),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned(
            left: 0,
            top: 0,
            child: CustomPaint(
              size: Size(ring, ring),
              painter: _RingPainter(line: person.line),
              child: Container(
                width: ring,
                height: ring,
                alignment: Alignment.center,
                child: Container(
                  width: inner,
                  height: inner,
                  decoration: const BoxDecoration(
                    color: RlTokens.surface,
                    shape: BoxShape.circle,
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    person.initials,
                    style: TextStyle(
                      fontSize: size * 0.28,
                      fontWeight: FontWeight.w700,
                      color: person.line == LineTag.hutson
                          ? RlTokens.teal
                          : RlTokens.plum,
                    ),
                  ),
                ),
              ),
            ),
          ),
          if (person.honor != null)
            Positioned(
              right: -2,
              bottom: -2,
              child: Container(
                width: size * 0.36,
                height: size * 0.36,
                decoration: BoxDecoration(
                  color: RlTokens.honorGold,
                  shape: BoxShape.circle,
                  border: Border.all(color: RlTokens.parchment, width: 2),
                ),
                child: Icon(
                  person.honor!.category == HonorCategory.military
                      ? Icons.military_tech
                      : Icons.workspace_premium,
                  size: size * 0.2,
                  color: RlTokens.ink,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  _RingPainter({required this.line});

  final LineTag line;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - RlTokens.ringWidth / 2;
    final rect = Rect.fromCircle(center: center, radius: radius);

    if (line == LineTag.both) {
      final plumPaint = Paint()
        ..color = RlTokens.plum
        ..style = PaintingStyle.stroke
        ..strokeWidth = RlTokens.ringWidth;
      final tealPaint = Paint()
        ..color = RlTokens.teal
        ..style = PaintingStyle.stroke
        ..strokeWidth = RlTokens.ringWidth;
      canvas.drawArc(rect, -1.5708, 3.1416, false, plumPaint); // left/top Norwood
      canvas.drawArc(rect, 1.5708, 3.1416, false, tealPaint); // right/bottom Hutson
      return;
    }

    final color = line == LineTag.hutson ? RlTokens.teal : RlTokens.plum;
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = RlTokens.ringWidth;
    canvas.drawCircle(center, radius, paint);
  }

  @override
  bool shouldRepaint(covariant _RingPainter oldDelegate) =>
      oldDelegate.line != line;
}
