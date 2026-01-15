import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const pluginId = formData.get('pluginId') as string;

    if (!file || !pluginId) {
      return NextResponse.json(
        { error: 'File and pluginId are required' },
        { status: 400 }
      );
    }

    // Validate file type (JAR files only)
    if (!file.name.endsWith('.jar')) {
      return NextResponse.json(
        { error: 'Only JAR files are allowed' },
        { status: 400 }
      );
    }

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Firebase Storage
    const storageRef = ref(
      storage,
      `plugins/${pluginId}/${Date.now()}-${file.name}`
    );
    await uploadBytes(storageRef, buffer);
    const downloadUrl = await getDownloadURL(storageRef);

    return NextResponse.json({
      url: downloadUrl,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
