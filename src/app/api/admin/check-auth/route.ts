import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('admin_token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify token
    verify(token, JWT_SECRET);

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 