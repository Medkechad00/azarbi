import postgres from 'postgres';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }
const sql = postgres(connectionString);

async function run() {
  try {
    console.log("Reading full-reset.sql...");
    const content = fs.readFileSync('full-reset.sql', 'utf8');

    console.log("Executing massive database reset. This may take a moment...");
    await sql.unsafe(content);

    console.log("✅ Database reset and seed completed successfully!");
  } catch (err) {
    console.error("❌ SQL Execution Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
