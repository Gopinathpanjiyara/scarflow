import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Clear the auth token and last activity cookies
  response.cookies.delete('admin_token');
  response.cookies.delete('last_activity');
  
  return response;
} 