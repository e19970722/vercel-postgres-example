import { db } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const client = await db.connect({
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });
 
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`;
    const names = ['Fiona', 'Lucy'];
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const pets = await client.sql`SELECT * FROM Pets;`;
  return response.status(200).json({ pets: pets.rows });
}