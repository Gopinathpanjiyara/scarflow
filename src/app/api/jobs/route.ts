import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET() {
  try {
    await connectDB();
    
    const jobs = await Job.find({
      isInternship: false
    }).sort({ createdAt: -1 });
    
    const internships = await Job.find({
      isInternship: true
    }).sort({ createdAt: -1 });

    return NextResponse.json({ jobs, internships });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate required fields based on job type
    if (!data.title || !data.company || !data.location || !data.type || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate arrays
    if (!Array.isArray(data.responsibilities) || data.responsibilities.length === 0) {
      return NextResponse.json(
        { error: 'At least one responsibility is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.requirements) || data.requirements.length === 0) {
      return NextResponse.json(
        { error: 'At least one requirement is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.benefits) || data.benefits.length === 0) {
      return NextResponse.json(
        { error: 'At least one benefit is required' },
        { status: 400 }
      );
    }

    // Additional validation for internships
    if (data.isInternship && !data.duration) {
      return NextResponse.json(
        { error: 'Duration is required for internships' },
        { status: 400 }
      );
    }

    // Create and save the job
    const job = new Job(data);
    await job.save();

    return NextResponse.json({ 
      message: 'Job created successfully', 
      job 
    });
  } catch (error) {
    console.error('Error creating job:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && 'errors' in (error as any)) {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Validate the update data similar to POST
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
        { status: 400 }
      );
    }

    const job = await Job.findByIdAndUpdate(
      _id,
      { ...updateData },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Job updated successfully', 
      job 
    });
  } catch (error) {
    console.error('Error updating job:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && 'errors' in (error as any)) {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Job deleted successfully',
      id
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 