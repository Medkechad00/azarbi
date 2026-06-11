import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL);
const rows = await sql`SELECT id, name, slug, image_url FROM categories ORDER BY name`;
console.log(JSON.stringify(rows, null, 2));
process.exit(0);
