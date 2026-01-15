import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pluginRef = doc(db, 'plugins', id);
    const pluginDoc = await getDoc(pluginRef);

    if (!pluginDoc.exists()) {
      return NextResponse.json(
        { error: 'Plugin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: pluginDoc.id,
      ...pluginDoc.data(),
    });
  } catch (error) {
    console.error('Error fetching plugin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plugin' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, longDescription, category, author, iconUrl } = body;

    const pluginRef = doc(db, 'plugins', id);
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (longDescription !== undefined) updateData.longDescription = longDescription;
    if (category !== undefined) updateData.category = category;
    if (author !== undefined) updateData.author = author;
    if (iconUrl !== undefined) updateData.iconUrl = iconUrl;
    if (name !== undefined) updateData.slug = name.toLowerCase().replace(/\s+/g, '-');

    await updateDoc(pluginRef, updateData);

    return NextResponse.json({
      id,
      ...updateData,
    });
  } catch (error) {
    console.error('Error updating plugin:', error);
    return NextResponse.json(
      { error: 'Failed to update plugin' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pluginRef = doc(db, 'plugins', id);
    
    await deleteDoc(pluginRef);

    return NextResponse.json({
      message: 'Plugin deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting plugin:', error);
    return NextResponse.json(
      { error: 'Failed to delete plugin' },
      { status: 500 }
    );
  }
}
