import 'package:flutter/material.dart';
import '../theme/tokens.dart';
import '../widgets/sample_banner.dart';
import 'ask_screen.dart';
import 'me_screen.dart';
import 'people_screen.dart';
import 'stories_screen.dart';
import 'steward_queue_screen.dart';
import 'tree_screen.dart';

/// Member shell: Tree | People | Stories | Ask | Me + Steward entry.
class RootlineShell extends StatefulWidget {
  const RootlineShell({super.key});

  @override
  State<RootlineShell> createState() => _RootlineShellState();
}

class _RootlineShellState extends State<RootlineShell> {
  int _index = 0;

  static const _titles = ['Tree', 'People', 'Stories', 'Ask', 'Me'];

  @override
  Widget build(BuildContext context) {
    final pages = <Widget>[
      const TreeScreen(),
      const PeopleScreen(),
      const StoriesScreen(),
      const AskScreen(),
      const MeScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text(_titles[_index]),
        actions: [
          IconButton(
            tooltip: 'Steward queue',
            icon: const Icon(Icons.inbox_outlined),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => const StewardQueueScreen(),
                ),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          const SampleBanner(),
          Expanded(child: pages[_index]),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.account_tree_outlined),
            selectedIcon: Icon(Icons.account_tree),
            label: 'Tree',
          ),
          NavigationDestination(
            icon: Icon(Icons.people_outline),
            selectedIcon: Icon(Icons.people),
            label: 'People',
          ),
          NavigationDestination(
            icon: Icon(Icons.menu_book_outlined),
            selectedIcon: Icon(Icons.menu_book),
            label: 'Stories',
          ),
          NavigationDestination(
            icon: Icon(Icons.chat_bubble_outline),
            selectedIcon: Icon(Icons.chat_bubble),
            label: 'Ask',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Me',
          ),
        ],
      ),
      backgroundColor: RlTokens.parchment,
    );
  }
}
