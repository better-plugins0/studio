
import type { Plugin } from './types';
import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

const getImage = (id: string) => {
  return placeholderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/256/256`;
};

const getGalleryImage = (id: string, hint: string) => {
  const img = placeholderImages.find(img => img.id === id);
  return {
    url: img?.imageUrl || `https://picsum.photos/seed/${id}/800/600`,
    hint: img?.imageHint || hint,
  };
};

export const plugins: Plugin[] = [
  {
    id: '1',
    name: 'BetterSeasons',
    slug: 'better-seasons',
    description: 'Dynamic seasons that change your world\'s weather, foliage, and feel.',
    longDescription: 'Experience the full immersion of changing seasons in your Minecraft world. This plugin introduces summer, autumn, winter, and spring, each with unique effects on the environment, including temperature changes, crop growth rates, and visual foliage differences.',
    iconUrl: getImage('plugin-icon-seasons'),
    downloads: 1254321,
    likes: 2400,
    lastUpdated: '2 days ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'World Management',
    gallery: [
      getGalleryImage('gallery-seasons-1', 'summer forest'),
      getGalleryImage('gallery-seasons-2', 'winter forest'),
      getGalleryImage('gallery-seasons-3', 'autumn leaves'),
    ],
    overview: "<p>BetterSeasons adds a fully configurable season cycle to your server. Watch as leaves change color in autumn, snow blankets the world in winter, and flowers bloom in spring. The plugin affects crop growth, weather patterns, and mob behavior to create a truly dynamic and immersive survival experience. It's lightweight, performance-friendly, and highly customizable to fit any server's needs.</p>",
    changelog: [
      { version: '1.2.0', changes: ['Added temperature system.', 'Fixed compatibility with custom biomes.'] },
      { version: '1.1.0', changes: ['Improved performance for large servers.', 'Added placeholder API support.'] },
      { version: '1.0.0', changes: ['Initial release.'] },
    ],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.20.6", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.20.1", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] },
    ]
  },
  {
    id: '2',
    name: 'BetterLogin',
    slug: 'better-login',
    description: 'A modern, secure, and customizable authentication system for your server.',
    longDescription: 'Protect your server from unauthorized access with a professional login system. BetterLogin requires players to register and log in with a password, preventing griefing and account theft on offline-mode servers.',
    iconUrl: getImage('plugin-icon-login'),
    downloads: 5403294,
    likes: 8100,
    lastUpdated: '1 week ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x', '1.19.x'],
    category: 'Security',
    gallery: [
      getGalleryImage('gallery-login-1', 'security interface'),
    ],
    overview: "<p>BetterLogin is an essential security plugin for any offline-mode (cracked) server. It forces players to set a password upon first join and use it to log in every time they connect. With features like session-based logins, brute-force protection, and full message customization, it's the most reliable way to secure player accounts.</p>",
    changelog: [
      { version: '2.5.0', changes: ['Added session login support.', 'UI improvements for registration.'] },
    ],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }] },
      { gameVersion: "1.20.6", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.19.4", platforms: [{ name: "Spigot", downloadUrl: "#" }] },
    ]
  },
  {
    id: '3',
    name: 'BetterEconomy',
    slug: 'better-economy',
    description: 'A complete, performant, and easy-to-use economy plugin with Vault support.',
    longDescription: 'Manage your server\'s economy with ease. BetterEconomy provides a robust set of features for creating a balanced virtual economy, including player balances, signs shops, and an easy-to-use API for other plugins.',
    iconUrl: getImage('plugin-icon-economy'),
    downloads: 8730103,
    likes: 12500,
    lastUpdated: '3 days ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'Economy',
    gallery: [],
    overview: "<p>Create a thriving server economy with BetterEconomy. This plugin is built from the ground up for performance and simplicity. It integrates seamlessly with Vault to provide economy support for hundreds of other plugins. Players can earn money, create chest shops, and participate in a server-wide economy. Administrators have access to powerful commands to manage balances and keep the economy stable.</p>",
    changelog: [
        { version: '3.0.1', changes: ['Fixed item prices in sign shops.', 'Added command to reset economy.'] },
    ],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.20.1", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }, { name: "Bukkit", downloadUrl: "#" }] },
    ]
  },
  {
    id: '4',
    name: 'BetterChat',
    slug: 'better-chat',
    description: 'Format your chat with prefixes, colors, and channels. The ultimate chat management tool.',
    longDescription: 'Take control of your server\'s chat with BetterChat. This plugin allows you to create custom chat formats, add rank prefixes, and set up different chat channels (e.g., local, global, trade).',
    iconUrl: getImage('plugin-icon-chat'),
    downloads: 3209871,
    likes: 5600,
    lastUpdated: '2 weeks ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x', '1.19.x'],
    category: 'Chat',
    gallery: [],
    overview: "<p>Tired of the default Minecraft chat? BetterChat gives you complete control over how chat looks and functions on your server. It integrates with permission plugins to show player ranks, allows for full color and formatting codes in messages, and lets you create separate channels to reduce spam. It's the definitive tool for managing server communication.</p>",
    changelog: [
      { version: '4.1.0', changes: ['Added private messaging.', 'Improved anti-spam filter.'] },
    ],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.20.6", platforms: [{ name: "Paper", downloadUrl: "#" }, { name: "Spigot", downloadUrl: "#" }] },
      { gameVersion: "1.19.2", platforms: [{ name: "Bukkit", downloadUrl: "#" }] },
    ]
  },
];

export const getPluginBySlug = (slug: string): Plugin | undefined => {
  return plugins.find((p) => p.slug === slug);
};
