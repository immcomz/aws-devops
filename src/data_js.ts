import { Client } from 'pg';
async function insertPatients(): Promise<void> {
  const client = new Client({
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: ''
  });
  await client.connect();
  for (let i = 0; i < 100; i++) {
    const name = `Patient${i}`;
    const age = 20 + i;
    await client.query(
      'INSERT INTO patients (name, age) VALUES ($1, $2)',
      [name, age]
    );
  }
  await client.end();
}
insertPatients().catch(console.error);