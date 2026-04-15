import postgres from 'postgres';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }
const sql = postgres(connectionString);

async function run() {
  try {
    console.log("Reading 003-seed-testdata.sql...");
    const content = fs.readFileSync('003-seed-testdata.sql', 'utf8');

    console.log("Seeding comprehensive test data...");
    await sql.unsafe(content);

    console.log("✅ Seed data applied successfully!");
  } catch (err) {
    console.error("❌ SQL Execution Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
