'use client';

import { useState } from 'react';
import type { Plugin } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Gamepad2, Search, Wrench } from 'lucide-react';
import Link from 'next/link';

type DownloadDialogProps = {
  plugin: Plugin;
};

export function DownloadDialog({ plugin }: DownloadDialogProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredVersions = plugin.versions.filter((v) =>
    v.gameVersion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availablePlatforms =
    plugin.versions.find((v) => v.gameVersion === selectedVersion)?.platforms || [];

  const handleVersionSelect = (version: string) => {
    setSelectedVersion(version);
    setSelectedPlatform(null); // Reset platform when version changes
  };

  const getDownloadUrl = () => {
    if (!selectedVersion || !selectedPlatform) return '#';
    const versionData = plugin.versions.find((v) => v.gameVersion === selectedVersion);
    const platformData = versionData?.platforms.find((p) => p.name === selectedPlatform);
    return platformData?.downloadUrl || '#';
  };

  const isDownloadDisabled = !selectedVersion || !selectedPlatform;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="mt-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
          <Download className="mr-2 h-5 w-5" /> Download
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Download {plugin.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 p-6">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  Select game version
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search game versions..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-48">
                  <div className="space-y-1 pr-2">
                    {filteredVersions.map((v) => (
                      <Button
                        key={v.gameVersion}
                        variant={selectedVersion === v.gameVersion ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => handleVersionSelect(v.gameVersion)}
                      >
                        {v.gameVersion}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center gap-2 font-semibold">
            <Wrench className="h-5 w-5" />
            Select platform
          </div>
          <Select
            onValueChange={setSelectedPlatform}
            disabled={!selectedVersion}
            value={selectedPlatform || undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
              {availablePlatforms.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild size="lg" disabled={isDownloadDisabled}>
            <Link href={getDownloadUrl()} onClick={() => !isDownloadDisabled && setIsOpen(false)}>
              <Download className="mr-2 h-5 w-5" />
              Download
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
