import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from 'firebase/firestore';

export async function GET() {
  try {
    const pluginsRef = collection(db, 'plugins');
    const querySnapshot = await getDocs(pluginsRef);
    const plugins = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(plugins);
  } catch (error) {
    console.error('Error fetching plugins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plugins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, longDescription, category, author, iconUrl } = body;

    const pluginsRef = collection(db, 'plugins');
    const docRef = await addDoc(pluginsRef, {
      name,
      description,
      longDescription,
      category,
      author,
      iconUrl,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      downloads: 0,
      minecraftVersions: [],
      gallery: [],
      overview: '',
      changelog: [],
      versions: [],
      createdAt: new Date(),
    });

    return NextResponse.json({
      id: docRef.id,
      name,
      description,
      longDescription,
      category,
      author,
      iconUrl,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    });
  } catch (error) {
    console.error('Error creating plugin:', error);
    return NextResponse.json(
      { error: 'Failed to create plugin' },
      { status: 500 }
    );
  }
}
