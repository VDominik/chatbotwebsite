// src/app/api/save-plan/route.js
import { createClient } from '@supabase/supabase-js';

// Use your Supabase URL and a service key (ensure these are correctly set in your environment)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    const { email, plan } = await request.json();

    // Log the incoming data (for debugging purposes)
    console.log('Received data for save-plan:', { email, plan });

    // Insert a record into the "subscriptions" table.
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ email, plan }]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error('Error in save-plan route:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}