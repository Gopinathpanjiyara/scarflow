import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { mobile } = await req.json();

    // Validate mobile number format
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ mobile, isActive: true });

    if (!admin) {
      return NextResponse.json(
        { error: 'Mobile number not found or account is inactive. Please contact administrator.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Mobile number verified',
      name: admin.name
    });
  } catch (error) {
    console.error('Error verifying mobile:', error);
    return NextResponse.json(
      { error: 'Failed to verify mobile number' },
      { status: 500 }
    );
  }
} 