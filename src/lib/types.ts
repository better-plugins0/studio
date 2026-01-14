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
  changelog: { version: string; changes: string[] }[];
  downloadUrl?: string; // Kept for backward compatibility if needed
  versions: {
    gameVersion: string;
    platforms: {
      name: 'Paper' | 'Spigot' | 'Bukkit' | 'Forge' | 'Fabric';
      downloadUrl: string;
    }[];
  }[];
};
