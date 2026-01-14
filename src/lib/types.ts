export type Plugin = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  iconUrl: string;
  downloadUrl?: string; // Optional download URL for the JAR file
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
};
