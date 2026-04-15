const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }

async function runSchema() {
  console.log('Connecting to database...');
  const sql = postgres(connectionString);

  try {
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    // We cannot execute the whole file as a single query easily if it has multiple statements, 
    // but the `postgres` driver can handle multiple statements in a single string.
    await sql.unsafe(schemaContent);
    console.log('Schema executed successfully!');
    
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await sql.end();
  }
}

runSchema();
