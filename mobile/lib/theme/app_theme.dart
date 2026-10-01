import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'tokens.dart';

ThemeData buildRootlineTheme() {
  final base = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    fontFamily: 'Georgia', // serif-leaning system; web uses Source Serif 4
  );

  return base.copyWith(
    scaffoldBackgroundColor: RlTokens.parchment,
    colorScheme: ColorScheme.light(
      primary: RlTokens.plum,
      onPrimary: RlTokens.parchment,
      secondary: RlTokens.teal,
      onSecondary: RlTokens.parchment,
      surface: RlTokens.surface,
      onSurface: RlTokens.ink,
      error: RlTokens.danger,
      outline: RlTokens.border,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: RlTokens.plum,
      foregroundColor: RlTokens.parchment,
      elevation: 0,
      centerTitle: false,
      systemOverlayStyle: SystemUiOverlayStyle.light,
      titleTextStyle: TextStyle(
        fontFamily: 'Georgia',
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: RlTokens.parchment,
      ),
    ),
    cardTheme: CardThemeData(
      color: RlTokens.surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(RlTokens.radiusMd),
        side: const BorderSide(color: RlTokens.border),
      ),
      margin: EdgeInsets.zero,
    ),
    chipTheme: ChipThemeData(
      backgroundColor: RlTokens.plumWash,
      selectedColor: RlTokens.plum,
      labelStyle: const TextStyle(color: RlTokens.ink, fontSize: 13),
      secondaryLabelStyle: const TextStyle(color: RlTokens.parchment),
      side: BorderSide.none,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(RlTokens.radiusSm),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
    ),
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: RlTokens.surface,
      indicatorColor: RlTokens.plumWash,
      elevation: 0,
      height: 64,
      labelTextStyle: WidgetStateProperty.resolveWith((states) {
        final selected = states.contains(WidgetState.selected);
        return TextStyle(
          fontSize: 12,
          fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
          color: selected ? RlTokens.plum : RlTokens.inkMuted,
        );
      }),
      iconTheme: WidgetStateProperty.resolveWith((states) {
        final selected = states.contains(WidgetState.selected);
        return IconThemeData(
          color: selected ? RlTokens.plum : RlTokens.inkMuted,
          size: 22,
        );
      }),
    ),
    textTheme: base.textTheme.apply(
      bodyColor: RlTokens.ink,
      displayColor: RlTokens.ink,
    ).copyWith(
      titleLarge: const TextStyle(
        fontFamily: 'Georgia',
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: RlTokens.ink,
      ),
      titleMedium: const TextStyle(
        fontFamily: 'Georgia',
        fontSize: 17,
        fontWeight: FontWeight.w600,
        color: RlTokens.ink,
      ),
      bodyMedium: const TextStyle(
        fontSize: 15,
        height: 1.55,
        color: RlTokens.ink,
      ),
      bodySmall: const TextStyle(
        fontSize: 13,
        height: 1.45,
        color: RlTokens.inkMuted,
      ),
      labelLarge: const TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: RlTokens.ink,
      ),
    ),
    dividerTheme: const DividerThemeData(color: RlTokens.border, thickness: 1),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: RlTokens.plum,
        foregroundColor: RlTokens.parchment,
        minimumSize: const Size(44, 44),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(RlTokens.radiusSm),
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: RlTokens.teal,
        side: const BorderSide(color: RlTokens.teal),
        minimumSize: const Size(44, 44),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(RlTokens.radiusSm),
        ),
      ),
    ),
  );
}
