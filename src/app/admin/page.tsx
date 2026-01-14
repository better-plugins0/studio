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
import { plugins as mockPlugins, getPluginBySlug } from '@/lib/mock-data';
import type { Plugin } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const loggedIn = sessionStorage.getItem('admin-logged-in') === 'true';
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        router.push('/admin/login');
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
    // In a real app, this would be a server action
    alert('Add plugin functionality is not yet implemented.');
  };

  const handleEditPlugin = (slug: string, formData: FormData) => {
    // In a real app, this would be a server action
    const newDescription = formData.get('description') as string;
    const newIconUrl = formData.get('iconUrl') as string;
    const newDownloadUrl = formData.get('downloadUrl') as string;
    console.log({ slug, newDescription, newIconUrl, newDownloadUrl });
    alert('Edit plugin functionality is not yet implemented.');
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
                  <Label htmlFor="iconUrl" className="text-right">Logo URL</Label>
                  <Input id="iconUrl" placeholder="https://example.com/icon.png" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="downloadUrl" className="text-right">Download URL</Label>
                  <Input id="downloadUrl" placeholder="https://example.com/plugin.jar" className="col-span-3" />
                </div>
                {/* Add other fields as needed */}
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
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plugins.map((plugin) => (
                <TableRow key={plugin.id}>
                  <TableCell className="font-medium">{plugin.name}</TableCell>
                  <TableCell className="font-mono text-xs">{plugin.slug}</TableCell>
                  <TableCell className="max-w-md truncate">{plugin.description}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Plugin: {plugin.name}</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleEditPlugin(plugin.slug, formData);
                          }}
                          className="grid gap-4 py-4"
                        >
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              name="description"
                              defaultValue={plugin.description}
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
                              defaultValue={plugin.iconUrl}
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
                              defaultValue={plugin.downloadUrl || ''}
                              className="col-span-3"
                            />
                          </div>
                          <Button type="submit">Save changes</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
