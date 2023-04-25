import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let db;

function dbFilePath() {
  let dbFilePath = path.join(dirname, 'app.db');
  if (process.env.ENV === 'test') {
    dbFilePath = path.join(dirname, 'app.test.db');
  }
  return dbFilePath;
}

async function createDB() {
  db = new sqlite3.Database(dbFilePath(), (err) => {
    if (err) {
      console.log('Getting error ' + err);
      exit(1);
    }
  });
}

async function createTableUsers() {
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      email VARCHAR NOT NULL,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      encrypted_password VARCHAR NOT NULL
    );
  `);
}

async function run() {
  await createDB();
  await createTableUsers();
}

run().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
