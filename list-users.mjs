import postgres from 'postgres';
const dbUrl = process.env.DATABASE_URL;
const sql = postgres(dbUrl);
async function run() {
  const users = await sql`SELECT id, email, role, raw_app_meta_data FROM auth.users`;
  console.log("Users:", users);
  process.exit(0);
}
run();
