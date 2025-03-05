import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('Supabase URL:', supabaseUrl); // Debugging
console.log('Supabase Key exists:', !!supabaseAnonKey); // Debugging - don't log the actual key

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Missing environment variables: ${!supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : ''}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 