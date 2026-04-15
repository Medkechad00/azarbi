const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) { console.error('ERROR: DATABASE_URL env var is required'); process.exit(1); }

async function runSeed() {
  console.log('Connecting to database...');
  const sql = postgres(connectionString);

  try {
    const seedPath = path.join(__dirname, '..', 'seed.sql');
    const seedContent = fs.readFileSync(seedPath, 'utf8');

    console.log('Executing seed...');
    await sql.unsafe(seedContent);
    console.log('Seed executed successfully!');
    
  } catch (err) {
    console.error('Error executing seed:', err);
  } finally {
    await sql.end();
  }
}

runSeed();
