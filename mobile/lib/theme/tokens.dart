import 'package:flutter/material.dart';

/// ROOTLINE design tokens — mirror of design-tokens.css / web app.
/// Honor gold is for medals / Honor Roll only — never general chrome.
abstract final class RlTokens {
  // Brand core
  static const Color parchment = Color(0xFFF6F1EA);
  static const Color ink = Color(0xFF16121F);
  static const Color plum = Color(0xFF3D2A5C); // NORWOOD
  static const Color wisteria = Color(0xFFC9B6E4);
  static const Color teal = Color(0xFF0E6E68); // HUTSON
  static const Color seaGlass = Color(0xFF7EC8C3);
  static const Color honorGold = Color(0xFFC6A15B); // Honor ONLY

  // Supporting
  static const Color inkMuted = Color(0xFF5C5668);
  static const Color inkSubtle = Color(0xFF8A8496);
  static const Color surface = Color(0xFFFFFBF7);
  static const Color border = Color(0xFFE4DCD0);
  static const Color danger = Color(0xFF8B2E2E);
  static const Color success = Color(0xFF2F5D4A);

  // Washes (approx. color-mix)
  static const Color plumWash = Color(0xFFE9DFEF);
  static const Color tealWash = Color(0xFFD5EBE9);
  static const Color goldWash = Color(0xFFF3EBD9);

  static const double radiusSm = 8;
  static const double radiusMd = 12;
  static const double tapMin = 44;
  static const double ringWidth = 2.5;
}
