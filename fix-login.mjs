import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';

const dbUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!dbUrl || !supabaseUrl || !supabaseKey) { console.error('ERROR: DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars are required'); process.exit(1); }

const sql = postgres(dbUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixLogin() {
  try {
    const validEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!validEmail || !adminPassword) { throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD env vars are required'); }

    console.log(`1. Deleting broken SQL-inserted admin user (${validEmail})...`);
    await sql`DELETE FROM auth.users WHERE email = ${validEmail}`;
    
    console.log("2. Signing up new admin using official Supabase API...");
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: validEmail,
      password: adminPassword,
    });

    if (signUpError) {
      throw new Error(`SignUp failed: ${signUpError.message}`);
    }
    console.log("   -> Sign up successful! User ID:", signUpData.user.id);

    console.log("3. Automatically granting Admin privileges...");
    await sql`
      UPDATE auth.users 
      SET 
        raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb,
        email_confirmed_at = NOW()
      WHERE email = ${validEmail}
    `;

    console.log("4. Testing Login one last time to be 100% sure...");
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: validEmail,
      password: adminPassword,
    });

    if (loginError) {
      throw new Error(`Login still failed: ${loginError.message}`);
    }

    console.log(`✅ SUCCESS! Admin is fully valid and logged in with ${validEmail}.`);

  } catch (e) {
    console.error("❌ Process Failed:", e);
  } finally {
    process.exit(0);
  }
}

fixLogin();
