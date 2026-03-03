import type { Plugin } from './types';

export const plugins: Plugin[] = [
  {
    id: '1',
    name: 'BetterSeasons',
    slug: 'better-seasons',
    description: 'Dynamic seasons that change your world\'s weather, foliage, and feel.',
    longDescription: 'Experience the full immersion of changing seasons in your Minecraft world. This plugin introduces summer, autumn, winter, and spring, each with unique effects on the environment, including temperature changes, crop growth rates, and visual foliage differences.',
    iconUrl: 'https://i.ibb.co/6yv6Wf7/seasons.png',
    downloads: 1254321,
    likes: 2400,
    lastUpdated: '2 days ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'World Management',
    gallery: [],
    overview: "<p>BetterSeasons adds a fully configurable season cycle to your server. Watch as leaves change color in autumn, snow blankets the world in winter, and flowers bloom in spring.</p>",
    changelog: [
      { version: '1.2.0', changes: ['Added temperature system.'] },
    ],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }] },
    ]
  },
  {
    id: '2',
    name: 'BetterLogin',
    slug: 'better-login',
    description: 'A modern, secure, and customizable authentication system for your server.',
    longDescription: 'Protect your server from unauthorized access with a professional login system.',
    iconUrl: 'https://i.ibb.co/VvZVj1j/login.png',
    downloads: 5403294,
    likes: 8100,
    lastUpdated: '1 week ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'Security',
    gallery: [],
    overview: "<p>BetterLogin is an essential security plugin for any offline-mode server.</p>",
    changelog: [],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }] },
    ]
  },
  {
    id: '3',
    name: 'BetterEconomy',
    slug: 'better-economy',
    description: 'A complete, performant, and easy-to-use economy plugin with Vault support.',
    longDescription: 'Manage your server\'s economy with ease.',
    iconUrl: 'https://i.ibb.co/8DVF0z6/economy.png',
    downloads: 8730103,
    likes: 12500,
    lastUpdated: '3 days ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x'],
    category: 'Economy',
    gallery: [],
    overview: "<p>Create a thriving server economy with BetterEconomy.</p>",
    changelog: [],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }] },
    ]
  },
  {
    id: '4',
    name: 'BetterChat',
    slug: 'better-chat',
    description: 'Format your chat with prefixes, colors, and channels.',
    longDescription: 'Take control of your server\'s chat with BetterChat.',
    iconUrl: 'https://i.ibb.co/3MJ0yCP/chat.png',
    downloads: 3209871,
    likes: 5600,
    lastUpdated: '2 weeks ago',
    author: 'epic_boat',
    minecraftVersions: ['1.21.x'],
    category: 'Chat',
    gallery: [],
    overview: "<p>Tired of the default Minecraft chat? BetterChat gives you complete control.</p>",
    changelog: [],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Paper", downloadUrl: "#" }] },
    ]
  },
];