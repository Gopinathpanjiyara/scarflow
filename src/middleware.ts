import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export const config = {
  matcher: ['/admindsh/dashboard/:path*']
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // If there's no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/admindsh', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the token
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    const loginUrl = new URL('/admindsh', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin_token');
    return response;
  }
} 