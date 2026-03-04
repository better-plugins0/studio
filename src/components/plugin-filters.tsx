'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, Layers, Zap } from "lucide-react";
import { Button } from "./ui/button";

type PluginFiltersProps = {
  availablePlatforms: string[];
  selectedPlatforms: string[];
  onPlatformChange: (platform: string) => void;
  availableVersions: string[];
  selectedVersions: string[];
  onVersionChange: (version: string) => void;
  availableCategories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
};

export function PluginFilters({
  availablePlatforms,
  selectedPlatforms,
  onPlatformChange,
  availableVersions,
  selectedVersions,
  onVersionChange,
  availableCategories,
  selectedCategories,
  onCategoryChange
}: PluginFiltersProps) {
    const [versionSearch, setVersionSearch] = useState('');
    const [showAllVersions, setShowAllVersions] = useState(false);

    const filteredVersions = availableVersions.filter(v => v.toLowerCase().includes(versionSearch.toLowerCase()));
    const versionsToShow = showAllVersions ? filteredVersions : filteredVersions.slice(0, 5);

    return (
        <aside className="space-y-6">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-headline font-bold text-lg uppercase tracking-wider">Filters</h3>
            </div>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-4 border-b border-primary/5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Categories
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-3">
                        {availableCategories.map(category => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={() => onCategoryChange(category)}
                                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                                <Label htmlFor={`category-${category}`} className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">{category}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-4 border-b border-primary/5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Game Version
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Filter versions..."
                        className="pl-9 h-8 text-xs bg-background/50 border-primary/10"
                        value={versionSearch}
                        onChange={(e) => setVersionSearch(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                        {versionsToShow.map(version => (
                            <div key={version} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`version-${version}`}
                                    checked={selectedVersions.includes(version)}
                                    onCheckedChange={() => onVersionChange(version)}
                                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                                <Label htmlFor={`version-${version}`} className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">{version}</Label>
                            </div>
                        ))}
                         {!showAllVersions && availableVersions.length > 5 && (
                             <Button variant="link" className="p-0 h-auto text-primary text-xs" onClick={() => setShowAllVersions(true)}>Show all {availableVersions.length}</Button>
                         )}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-4 border-b border-primary/5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Platform
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-3">
                        {availablePlatforms.map(platform => (
                             <div key={platform} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={platform.toLowerCase()} 
                                    checked={selectedPlatforms.includes(platform)}
                                    onCheckedChange={() => onPlatformChange(platform)}
                                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                                <Label htmlFor={platform.toLowerCase()} className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">{platform}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </aside>
    )
}
