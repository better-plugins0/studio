'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { plugins as mockPlugins } from '@/lib/mock-data';
import type { Plugin } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlugin, setEditingPlugin] = useState<Plugin | null>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const loggedIn = sessionStorage.getItem('admin-logged-in') === 'true';
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        router.push('/admin/login');
      } else {
        const storedPlugins = sessionStorage.getItem('plugins');
        if (storedPlugins) {
          setPlugins(JSON.parse(storedPlugins));
        } else {
          setPlugins(mockPlugins);
        }
      }
    } catch (e) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('admin-logged-in');
    } catch (e) {
      console.error('Failed to logout');
    }
    router.push('/admin/login');
  };

  const handleAddPlugin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Add plugin functionality is not yet implemented.');
  };

  const handleEditPluginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPlugin) return;

    const formData = new FormData(e.currentTarget);
    const updatedPlugins = plugins.map(p => {
      if (p.id === editingPlugin.id) {
        const newPlugin = JSON.parse(JSON.stringify(p)); // Deep copy
        newPlugin.name = formData.get('name') as string;
        newPlugin.description = formData.get('description') as string;
        newPlugin.longDescription = formData.get('longDescription') as string;
        newPlugin.iconUrl = formData.get('iconUrl') as string;

        const downloadUrl = formData.get('downloadUrl') as string;
        if (newPlugin.versions.length > 0 && newPlugin.versions[0].platforms.length > 0) {
            newPlugin.versions[0].platforms[0].downloadUrl = downloadUrl;
        }
        return newPlugin;
      }
      return p;
    });

    setPlugins(updatedPlugins);
    try {
      sessionStorage.setItem('plugins', JSON.stringify(updatedPlugins));
      toast({
        title: "Plugin Updated",
        description: `"${formData.get('name')}" has been updated for this session.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Saving",
        description: "Could not save plugin changes to session storage.",
      });
    }
    setIsEditDialogOpen(false);
    setEditingPlugin(null);
  };
  
  const openEditDialog = (plugin: Plugin) => {
    setEditingPlugin(plugin);
    setIsEditDialogOpen(true);
  };

  if (!isMounted || !isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Admin Dashboard
        </h1>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Welcome, epic_boat. Manage your plugins below.
      </p>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-3xl font-bold tracking-tight">
            Manage Plugins
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Plugin</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Plugin</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPlugin} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="longDescription" className="text-right">Long Description</Label>
                  <Textarea id="longDescription" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="iconUrl" className="text-right">Logo URL</Label>
                  <Input id="iconUrl" placeholder="https://example.com/icon.png" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="downloadUrl" className="text-right">Download URL</Label>
                  <Input id="downloadUrl" placeholder="https://example.com/plugin.jar" className="col-span-3" />
                </div>
                <Button type="submit">Add Plugin</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-6 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin Name</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell className="font-medium">{plugin.name}</TableCell>
                  <TableCell>{plugin.downloads.toLocaleString()}</TableCell>
                  <TableCell className="max-w-md truncate">{plugin.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" onClick={() => openEditDialog(plugin)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Plugin: {editingPlugin?.name}</DialogTitle>
              </DialogHeader>
              {editingPlugin && (
                <form
                  onSubmit={handleEditPluginSubmit}
                  className="grid gap-4 py-4"
                >
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingPlugin.name}
                        className="col-span-3"
                      />
                    </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={editingPlugin.description}
                      className="col-span-3"
                    />
                  </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="longDescription" className="text-right">
                      Long Description
                    </Label>
                    <Textarea
                      id="longDescription"
                      name="longDescription"
                      defaultValue={editingPlugin.longDescription}
                      className="col-span-3"
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="iconUrl" className="text-right">
                      Logo URL
                    </Label>
                    <Input
                      id="iconUrl"
                      name="iconUrl"
                      defaultValue={editingPlugin.iconUrl}
                      className="col-span-3"
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="downloadUrl" className="text-right">
                      Download URL
                    </Label>
                    <Input
                      id="downloadUrl"
                      name="downloadUrl"
                      defaultValue={editingPlugin.versions[0]?.platforms[0]?.downloadUrl || ''}
                      className="col-span-3"
                    />
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
    </div>
  );
}
