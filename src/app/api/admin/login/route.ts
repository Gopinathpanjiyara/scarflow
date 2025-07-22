import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { mobile, password } = await req.json();

    // Validate mobile number format
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ mobile, isActive: true });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { 
        id: admin._id,
        mobile: admin.mobile,
        name: admin.name
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Create base response
    const response = new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        name: admin.name
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Set cookie with all necessary attributes
    const cookieValue = `admin_token=${token}; Path=/; HttpOnly; Max-Age=86400; SameSite=Strict`;
    response.headers.set('Set-Cookie', cookieValue);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to login',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 