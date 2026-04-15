import postgres from 'postgres';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }
const sql = postgres(connectionString);

async function run() {
  try {
    console.log("Reading 004-fix-rls.sql...");
    const content = fs.readFileSync('004-fix-rls.sql', 'utf8');

    console.log("Applying RLS policies to all tables...");
    await sql.unsafe(content);

    console.log("✅ RLS policies applied successfully!");
  } catch (err) {
    console.error("❌ SQL Execution Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
