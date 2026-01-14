import type { Plugin } from './types';

export const plugins: Plugin[] = [
  {
    id: '1',
    name: 'BetterSeasons',
    slug: 'better-seasons',
    description: 'A dynamic seasons system that changes the world.',
    longDescription: 'Bring your Minecraft world to life with dynamic seasons. Watch as landscapes transform from lush summer greens to snowy winter wonderlands. BetterSeasons affects plant growth, weather, and mob behavior to create a truly immersive experience.',
    iconUrl: 'https://picsum.photos/seed/seasons/256/256',
    downloads: 150234,
    author: 'PluginDev',
    minecraftVersions: ['1.20.1', '1.19.4', '1.18.2'],
    category: 'Gameplay',
    gallery: [
      { url: 'https://picsum.photos/seed/summer-forest/800/600', hint: 'summer forest' },
      { url: 'https://picsum.photos/seed/winter-forest/800/600', hint: 'winter forest' },
      { url: 'https://picsum.photos/seed/autumn-forest/800/600', hint: 'autumn leaves' },
    ],
    overview: `
      <h3 class="font-headline text-xl font-bold mb-2">Immerse Your Players in a Living World</h3>
      <p>BetterSeasons is a comprehensive seasons plugin designed for Paper servers. It introduces four distinct seasons—Spring, Summer, Autumn, and Winter—each with unique effects on the environment and gameplay mechanics. From changing foliage colors to adjusted crop growth rates, this plugin adds a new layer of realism and challenge to your server.</p>
    `,
    installation: `
      <ol class="list-decimal list-inside space-y-2">
        <li>Download the latest version of the plugin.</li>
        <li>Place the .jar file into your server's /plugins folder.</li>
        <li>Restart or reload your server.</li>
        <li>(Optional) Configure the config.yml to customize season lengths and effects.</li>
      </ol>
    `,
    commands: [
      { command: '/season', description: 'Check the current season and days remaining.', permission: 'betterseasons.check' },
      { command: '/season set <season>', description: 'Force change the season.', permission: 'betterseasons.admin.set' },
    ],
    changelog: [
      { version: '1.2.0', changes: ['Added compatibility for Minecraft 1.20.1', 'Fixed a bug with snow accumulation.'] },
      { version: '1.1.0', changes: ['Introduced configurable season lengths.', 'Performance improvements.'] },
    ],
    versions: [
        { gameVersion: "1.21.11", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] },
        { gameVersion: "1.21.10", platforms: [{ name: "Paper", downloadUrl: "#" }] },
        { gameVersion: "1.20.4", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
        { gameVersion: "1.19.2", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] },
    ]
  },
  {
    id: '2',
    name: 'BetterLogin',
    slug: 'better-login',
    description: 'A secure and customizable login system for your server.',
    longDescription: 'Protect your server from unauthorized access with BetterLogin. This plugin requires players to register with a password and log in each time they join, ensuring that only legitimate users can access their accounts.',
    iconUrl: 'https://picsum.photos/seed/login/256/256',
    downloads: 210450,
    author: 'SecureCraft',
    minecraftVersions: ['1.20.x', '1.19.x'],
    category: 'Admin',
    gallery: [
      { url: 'https://picsum.photos/seed/secure-ui/800/600', hint: 'security interface' },
    ],
    overview: `
      <h3 class="font-headline text-xl font-bold mb-2">The Ultimate Security for Your Server</h3>
      <p>BetterLogin is an essential utility for any public Minecraft server. It provides a robust authentication system to prevent griefing and account theft. With extensive configuration options, you can tailor the login experience to match your server's theme and security needs.</p>
    `,
    installation: `
      <ol class="list-decimal list-inside space-y-2">
        <li>Download the plugin JAR file.</li>
        <li>Stop your server.</li>
        <li>Place the BetterLogin.jar file in your server's plugins directory.</li>
        <li>Start your server to generate the configuration files.</li>
        <li>Customize the config.yml to your liking and restart.</li>
      </ol>
    `,
    commands: [
      { command: '/login <password>', description: 'Log into your account.', permission: 'none' },
      { command: '/register <password> <confirmPassword>', description: 'Register a new account.', permission: 'none' },
      { command: '/changepassword <old> <new>', description: 'Change your account password.', permission: 'betterlogin.changepass' },
    ],
    changelog: [
      { version: '2.5.1', changes: ['Added session timeout feature.', 'Improved password hashing security.'] },
      { version: '2.4.0', changes: ['Initial release for Minecraft 1.20.'] },
    ],
    versions: [
        { gameVersion: "1.21.11", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
        { gameVersion: "1.20.4", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] },
    ]
  },
  {
    id: '3',
    name: 'BetterEconomy',
    slug: 'better-economy',
    description: 'A complete and flexible economy plugin.',
    longDescription: 'Create a thriving server economy with BetterEconomy. Features include player balances, shops, auctions, and full Vault integration. Easy to use for players and powerful for admins.',
    iconUrl: 'https://picsum.photos/seed/economy/256/256',
    downloads: 350812,
    author: 'EconoDev',
    minecraftVersions: ['1.20.1', '1.19.4'],
    category: 'Economy',
    gallery: [],
    overview: `<p>A complete economy solution.</p>`,
    installation: `<p>Drop the jar in your plugins folder.</p>`,
    commands: [{ command: '/bal', description: 'Check balance.', permission: 'bettereconomy.balance' }],
    changelog: [{ version: '3.0.0', changes: ['Full rewrite for performance.'] }],
    versions: [
      { gameVersion: "1.20.1", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] }
    ]
  },
  {
    id: '4',
    name: 'BetterChat',
    slug: 'better-chat',
    description: 'Format your chat with prefixes, suffixes, and colors.',
    longDescription: 'Take control of your server\'s chat with BetterChat. Add prefixes and suffixes based on permissions, create custom chat channels, and enable color codes for different player groups. Fully configurable and lightweight.',
    iconUrl: 'https://picsum.photos/seed/chat/256/256',
    downloads: 180321,
    author: 'PluginDev',
    minecraftVersions: ['1.20.x', '1.19.x', '1.18.x'],
    category: 'Utility',
    gallery: [],
    overview: `<p>Customize your chat experience.</p>`,
    installation: `<p>Drop the jar in your plugins folder.</p>`,
    commands: [{ command: '/channel <name>', description: 'Switch chat channel.', permission: 'betterchat.channel.switch' }],
    changelog: [{ version: '1.5.0', changes: ['Added chat filtering.'] }],
    versions: [
      { gameVersion: "1.20.4", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] }
    ]
  },
];

export const getPluginBySlug = (slug: string): Plugin | undefined => {
  return plugins.find((p) => p.slug === slug);
};
