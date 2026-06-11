import { createClient } from '@supabase/supabase-js';
import postgres from 'postgres';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbUrl = process.env.DATABASE_URL;

const supabase = createClient(supabaseUrl, supabaseKey);
const sql = postgres(dbUrl);

async function run() {
  const email = "admin@azarbi.com";
  const password = "Password123!";
  
  console.log("Creating user...");
  // Use admin api to bypass signup restrictions
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: { role: 'super_admin' },
    app_metadata: { role: 'super_admin' }
  });
  
  if (error) {
    if (error.message.includes("already registered")) {
        console.log("User already exists, updating their password instead...");
        const {data: listData} = await supabase.auth.admin.listUsers();
        const user = listData.users.find(u => u.email === email);
        if (user) {
            await supabase.auth.admin.updateUserById(user.id, { password, app_metadata: { role: 'super_admin' }});
            console.log("Updated existing user successfully.");
        }
    } else {
        console.error("Error creating user:", error);
    }
  } else {
    console.log("User created successfully:", data.user?.id);
  }

  // Update Postgres role explicitly just in case
  await sql`
  UPDATE auth.users 
  SET 
    raw_app_meta_data = raw_app_meta_data || '{"role":"super_admin"}'::jsonb,
    email_confirmed_at = NOW()
  WHERE email = ${email}
  `;

  console.log(`\n\nDONE! You can login with:\nEmail: ${email}\nPassword: ${password}`);
  process.exit(0);
}
run();
