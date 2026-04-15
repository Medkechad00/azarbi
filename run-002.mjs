import postgres from 'postgres';
import fs from 'fs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }
const sql = postgres(connectionString);

async function run() {
  try {
    console.log("Reading 002-enhancements.sql...");
    const content = fs.readFileSync('002-enhancements.sql', 'utf8');

    console.log("Executing enhancements...");
    await sql.unsafe(content);

    console.log("✅ Enhancements applied successfully!");
  } catch (err) {
    console.error("❌ SQL Execution Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
