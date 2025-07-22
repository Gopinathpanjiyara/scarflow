import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Get file extension and create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get original file extension
    const originalName = file.name;
    const ext = originalName.substring(originalName.lastIndexOf('.'));
    
    // Create unique filename
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}${ext}`;
    
    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Write file to uploads directory
    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);
    
    // Return the URL path to the uploaded file
    const fileUrl = `/uploads/${uniqueFilename}`;
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      fileUrl 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 