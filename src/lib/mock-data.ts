
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
    name: 'Fabric API',
    slug: 'fabric-api',
    description: 'Lightweight and modular API providing common hooks and intercompatibility measures.',
    longDescription: 'Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.',
    iconUrl: 'https://i.ibb.co/LdG3Jjf/fabric-api-logo.png',
    downloads: 132170000,
    likes: 27600,
    lastUpdated: '6 days ago',
    author: 'modmuss50',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'Library',
    gallery: [],
    overview: `<p>Core library for Fabric mods.</p>`,
    changelog: [{ version: '0.9.0', changes: ['Added new hooks for rendering.'] }],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Fabric", downloadUrl: "#" }] },
      { gameVersion: "1.20.6", platforms: [{ name: "Fabric", downloadUrl: "#" }] },
    ]
  },
  {
    id: '2',
    name: 'Sodium',
    slug: 'sodium',
    description: 'The fastest and most compatible rendering optimization mod for Minecraft.',
    longDescription: 'Sodium is a free and open-source rendering engine replacement for the Minecraft client that greatly improves frame rates, reduces micro-stutter, and fixes graphical issues in Minecraft.',
    iconUrl: 'https://i.ibb.co/2S11W3S/sodium-logo.png',
    downloads: 121390000,
    likes: 33000,
    lastUpdated: '3 weeks ago',
    author: 'jellysquid3',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'Optimization',
    gallery: [],
    overview: `<p>A rendering engine replacement for the Minecraft client that greatly improves frame rates.</p>`,
    changelog: [
      { version: '0.5.8', changes: ['Support for 1.21.', 'Many bug fixes.'] },
    ],
    versions: [
        { gameVersion: "1.21", platforms: [{ name: "Fabric", downloadUrl: "#" }, { name: "NeoForge", downloadUrl: "#" }, { name: "Quilt", downloadUrl: "#" }] },
        { gameVersion: "1.20.6", platforms: [{ name: "Fabric", downloadUrl: "#" }, { name: "NeoForge", downloadUrl: "#" }, { name: "Quilt", downloadUrl: "#" }] },
    ]
  },
    {
    id: '3',
    name: 'Cloth Config API',
    slug: 'cloth-config-api',
    description: 'Configuration Library for Minecraft Mods',
    longDescription: 'A client-side configuration screen library for Minecraft mods. Requires Fabric API.',
    iconUrl: 'https://i.ibb.co/hZ2v6yC/cloth-config.png',
    downloads: 96880000,
    likes: 13800,
    lastUpdated: '2 months ago',
    author: 'shedaniel',
    minecraftVersions: ['1.20.1', '1.19.4'],
    category: 'Library',
    gallery: [],
    overview: `<p>A config screen library.</p>`,
    changelog: [{ version: '14.0.0', changes: ['API overhaul.'] }],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Fabric", downloadUrl: "#" }, { name: "Forge", downloadUrl: "#" }, { name: "NeoForge", downloadUrl: "#" }] }
    ]
  },
  {
    id: '4',
    name: 'Iris Shaders',
    slug: 'iris-shaders',
    description: 'A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs.',
    longDescription: 'Iris is a modern shaders mod for Minecraft that is compatible with Sodium. It allows you to use your favorite shader packs while taking advantage of Sodium\'s performance benefits.',
    iconUrl: 'https://i.ibb.co/HhzVf0d/iris-logo.png',
    downloads: 93120000,
    likes: 24000,
    lastUpdated: '3 weeks ago',
    author: 'coderbot',
    minecraftVersions: ['1.21.x', '1.20.x'],
    category: 'Decoration',
    gallery: [],
    overview: `<p>A modern shader mod.</p>`,
    changelog: [{ version: '1.7.0', changes: ['Added new shader features.'] }],
    versions: [
      { gameVersion: "1.21", platforms: [{ name: "Fabric", downloadUrl: "#" }, { name: "NeoForge", downloadUrl: "#" }, { name: "Quilt", downloadUrl: "#" }] }
    ]
  },
];

export const getPluginBySlug = (slug: string): Plugin | undefined => {
  return plugins.find((p) => p.slug === slug);
};
