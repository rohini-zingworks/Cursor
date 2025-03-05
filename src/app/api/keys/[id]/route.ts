import { NextResponse } from 'next/server';

// Import the apiKeys array from a shared location
// In a real application, this would be your database connection
declare var apiKeys: Array<{
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}>;

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // In a real application, you would delete from your database
    // For now, we'll just filter the array
    apiKeys = apiKeys.filter(key => key.id !== id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
} 