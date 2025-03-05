import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// In a real application, you would validate against your actual API key service
// This is just a mock implementation for demonstration purposes
// const VALID_API_KEY = 'your-secret-api-key-123'; // Replace with your actual API key validation logic

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    // Query the api_keys table in Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { valid: false, error: 'Error validating API key' },
        { status: 500 }
      );
    }

    // If we found a matching API key, it's valid
    const isValid = !!data;

    return NextResponse.json({ 
      valid: isValid,
      userData: isValid ? { id: data.user_id } : null 
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}