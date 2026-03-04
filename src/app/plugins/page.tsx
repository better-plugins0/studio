'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Plugin } from '@/lib/types';
import { plugins as mockPlugins } from '@/lib/mock-data';
import { PluginFilters } from '@/components/plugin-filters';
import { PluginListItem } from '@/components/plugin-list-item';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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

    // Listen for storage changes from the admin panel
    const handleStorageChange = () => loadPlugins();
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
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

      return searchTermMatch && platformMatch && versionMatch;
    });

    switch (sortOption) {
      case 'downloads':
        filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [plugins, searchTerm, sortOption, selectedPlatforms, selectedVersions]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, selectedPlatforms, selectedVersions]);

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

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <PluginFilters 
            availablePlatforms={allPlatforms}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={handlePlatformChange}
            availableVersions={allGameVersions}
            selectedVersions={selectedVersions}
            onVersionChange={handleVersionChange}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plugins..."
                className="pl-9 h-11 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {paginatedPlugins.length > 0 ? (
              paginatedPlugins.map((plugin) => (
                <PluginListItem key={plugin.id} plugin={plugin} />
              ))
            ) : (
               <div className="text-center py-12">
                <p className="text-muted-foreground">No plugins found.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
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
