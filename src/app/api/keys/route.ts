import { NextResponse } from 'next/server';
import crypto from 'crypto';

// This would typically come from your database
let apiKeys: Array<{
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}> = [];

export async function GET() {
  // In a real application, you would fetch this from your database
  return NextResponse.json(apiKeys);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate a secure API key
    const apiKey = crypto.randomBytes(32).toString('hex');
    
    const newKey = {
      id: crypto.randomUUID(),
      name,
      key: apiKey,
      createdAt: new Date().toISOString(),
    };

    apiKeys.push(newKey);

    return NextResponse.json(newKey);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
} 