import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    // Validate ID format
    if (!ObjectId.isValid(context.params.id)) {
      return NextResponse.json(
        { error: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    const job = await Job.findById(context.params.id);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 