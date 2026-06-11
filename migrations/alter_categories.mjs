import postgres from 'postgres';
const dbUrl = process.env.DATABASE_URL;
const sql = postgres(dbUrl);
async function run() {
  try {
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT`;
    console.log("Column image_url added to categories table");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    process.exit(0);
  }
}
run();
