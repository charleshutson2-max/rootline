import 'package:flutter/material.dart';
import '../data/sample.dart';
import '../theme/tokens.dart';
import '../widgets/person_avatar.dart';
import 'steward_queue_screen.dart';

class MeScreen extends StatelessWidget {
  const MeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        Text('Me', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 4),
        Text(
          'Living Member profile · SAMPLE',
          style: Theme.of(context).textTheme.bodySmall,
        ),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const PersonAvatar(person: charlie, size: 64),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        charlie.fullName,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        charlie.roleNote ?? '',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: RlTokens.tealWash,
                          borderRadius:
                              BorderRadius.circular(RlTokens.radiusSm),
                        ),
                        child: const Text(
                          'Privacy ON',
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            color: RlTokens.teal,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        Card(
          child: Column(
            children: [
              SwitchListTile(
                title: const Text('Hide street address'),
                subtitle: const Text('SAMPLE · always on for Charlie'),
                value: true,
                onChanged: null,
                activeThumbColor: RlTokens.teal,
              ),
              const Divider(height: 1),
              SwitchListTile(
                title: const Text('Hide social links'),
                subtitle: const Text('SAMPLE · privacy ON'),
                value: true,
                onChanged: null,
                activeThumbColor: RlTokens.teal,
              ),
              const Divider(height: 1),
              SwitchListTile(
                title: const Text('Elder large type'),
                subtitle: const Text('Stub — wire to MediaQuery later'),
                value: false,
                onChanged: null,
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        Text('Steward desk', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        Card(
          child: ListTile(
            leading: const Icon(Icons.inbox_outlined, color: RlTokens.plum),
            title: const Text('Approval queue'),
            subtitle: const Text('Steward entry · SAMPLE stubs'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => const StewardQueueScreen(),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Other Steward routes (claims, merges, exports, roles, public) '
          'live in the Next.js web app — see ../web.',
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }
}
