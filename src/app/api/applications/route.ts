import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const data = await req.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'resumeUrl', 'coverLetter', 'jobId'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate jobId format
    try {
      data.jobId = new ObjectId(data.jobId);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid job ID format' },
        { status: 400 }
      );
    }

    // Create new application with default status
    const application = new Application({
      ...data,
      status: 'pending'
    });

    await application.save();

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      application 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    
    // Handle Mongoose validation errors
    if (error instanceof Error && 'errors' in (error as any)) {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit application', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const applications = await Application.find()
      .populate('jobId')
      .sort({ createdAt: -1 });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const { _id, status } = data;

    if (!_id || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    const application = await Application.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    ).populate('jobId');

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Application status updated successfully', 
      application 
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 