import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) { console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars are required'); process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL || 'admin@azarbi.com',
    password: process.env.ADMIN_PASSWORD
  });
  
  if (error) {
    console.error("Login Failed:", error.message);
  } else {
    console.log("Login Success! User:", data.user.email);
    console.log("Session:", !!data.session);
  }
}

testLogin();
