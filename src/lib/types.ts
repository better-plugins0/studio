export type Plugin = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  iconUrl: string;
  downloads: number;
  likes: number;
  lastUpdated: string;
  author: string;
  minecraftVersions: string[];
  category: string;
  gallery: {
    url: string;
    hint: string;
  }[];
  overview: string;
  changelog: { version: string; changes: string[] }[];
  versions: {
    gameVersion: string;
    platforms: {
      name: 'Paper' | 'Spigot' | 'Bukkit';
      downloadUrl: string;
    }[];
  }[];
};
