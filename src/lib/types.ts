export type Plugin = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  iconUrl: string;
  downloads: number;
  author: string;
  minecraftVersions: string[];
  category: 'Gameplay' | 'Admin' | 'Utility' | 'Economy';
  gallery: {
    url: string;
    hint: string;
  }[];
  overview: string;
  installation: string;
  commands: { command: string; description: string; permission: string }[];
  changelog: { version: string; changes: string[] }[];
  versions: {
    gameVersion: string;
    platforms: {
      name: 'Paper' | 'Spigot' | 'Forge' | 'Fabric';
      downloadUrl: string;
    }[];
  }[];
};
