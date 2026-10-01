import 'package:flutter/material.dart';
import 'screens/shell.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const RootlineApp());
}

class RootlineApp extends StatelessWidget {
  const RootlineApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ROOTLINE',
      debugShowCheckedModeBanner: false,
      theme: buildRootlineTheme(),
      home: const RootlineShell(),
    );
  }
}
