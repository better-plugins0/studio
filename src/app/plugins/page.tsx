'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Plugin } from '@/lib/types';
import { plugins as mockPlugins } from '@/lib/mock-data';
import { PluginFilters } from '@/components/plugin-filters';
import { PluginListItem } from '@/components/plugin-list-item';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('downloads');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadPlugins = () => {
    const stored = localStorage.getItem('plugins-data');
    if (stored) {
      setPlugins(JSON.parse(stored));
    } else {
      setPlugins(mockPlugins);
      localStorage.setItem('plugins-data', JSON.stringify(mockPlugins));
    }
  };

  useEffect(() => {
    loadPlugins();

    const handleStorageChange = () => loadPlugins();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pluginsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pluginsUpdated', handleStorageChange);
    };
  }, []);

  const allGameVersions = useMemo(() => {
    return [...new Set(plugins.flatMap(p => p.minecraftVersions || []))].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  }, [plugins]);

  const allPlatforms = useMemo(() => {
    return [...new Set(plugins.flatMap(p => p.versions?.flatMap(v => v.platforms.map(plat => plat.name)) || []))];
  }, [plugins]);

  const allCategories = useMemo(() => {
    return [...new Set(plugins.map(p => p.category))].sort();
  }, [plugins]);

  const filteredAndSortedPlugins = useMemo(() => {
    let filtered = plugins.filter(plugin => {
      const searchTermMatch =
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase());

      const platformMatch =
        selectedPlatforms.length === 0 ||
        plugin.versions?.some(v => v.platforms.some(p => selectedPlatforms.includes(p.name)));
      
      const versionMatch =
        selectedVersions.length === 0 ||
        plugin.minecraftVersions?.some(v => selectedVersions.includes(v));

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(plugin.category);

      return searchTermMatch && platformMatch && versionMatch && categoryMatch;
    });

    switch (sortOption) {
      case 'downloads':
        filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'likes':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [plugins, searchTerm, sortOption, selectedPlatforms, selectedVersions, selectedCategories]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, selectedPlatforms, selectedVersions, selectedCategories]);

  const totalPages = Math.ceil(filteredAndSortedPlugins.length / ITEMS_PER_PAGE);
  const paginatedPlugins = filteredAndSortedPlugins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersions(prev =>
      prev.includes(version) ? prev.filter(v => v !== version) : [...prev, version]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-1000">
      <header className="mb-12 space-y-4">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-white">Plugin Directory</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">Browse our curated collection of high-performance Minecraft plugins. Use the filters to find exactly what your server needs.</p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <PluginFilters 
            availablePlatforms={allPlatforms}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={handlePlatformChange}
            availableVersions={allGameVersions}
            selectedVersions={selectedVersions}
            onVersionChange={handleVersionChange}
            availableCategories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/30 p-4 rounded-xl border border-primary/10 backdrop-blur-sm">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
              <Input
                placeholder="Search by name or keyword..."
                className="pl-12 h-14 text-lg bg-background/50 border-primary/10 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground shrink-0">
                <SlidersHorizontal className="h-4 w-4" /> Sort By
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full md:w-[180px] h-14 bg-background/50 border-primary/10 font-bold">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            {paginatedPlugins.length > 0 ? (
              paginatedPlugins.map((plugin) => (
                <PluginListItem key={plugin.id} plugin={plugin} />
              ))
            ) : (
               <div className="text-center py-32 rounded-3xl border-2 border-dashed border-primary/10 bg-card/20 backdrop-blur-sm">
                <PackageSearch className="h-16 w-16 text-primary/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">No plugins found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your filters or search term to broaden your results.</p>
                <Button variant="outline" className="h-12 px-8 border-primary/30 hover:bg-primary/10 font-bold" onClick={() => {
                  setSearchTerm('');
                  setSelectedPlatforms([]);
                  setSelectedVersions([]);
                  setSelectedCategories([]);
                }}>Reset All Filters</Button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  className={cn(
                    "h-12 w-12 font-bold rounded-xl transition-all",
                    currentPage === page 
                      ? "shadow-lg shadow-primary/20" 
                      : "bg-card/40 border-primary/10 hover:border-primary/50"
                  )}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}