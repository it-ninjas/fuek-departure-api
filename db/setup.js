import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

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
  return db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      email VARCHAR NOT NULL,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      encrypted_password VARCHAR NOT NULL
    );
  `);
}

async function createTableConnections() {
  return db.run(`
    CREATE TABLE IF NOT EXISTS connections (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "from" VARCHAR NOT NULL,
      "to" VARCHAR NOT NULL,
      user_id INTEGER NOT NULL
    );
  `);
}

async function seedUsers() {
  db.run('DELETE FROM users;');

  bcrypt.hash('pw42', 10, (_err, encryptedPassword) => {
    db.run(`
      INSERT INTO users (email, first_name, last_name, encrypted_password)
      VALUES ("alice@example.com", "Alice", "Ninja", "${encryptedPassword}");`);
  });
}

async function seedConnections() {
  db.run('DELETE FROM connections;');

  db.run(`INSERT INTO connections ("from", "to", user_id)
      VALUES ("Bern", "Brig", 1);`);
}

async function run() {
  await createDB();
  createTableUsers().then(() => {
    // needed since sometimes users table seams not present ...
    setTimeout(() => {
      seedUsers();
    }, 100);
  });

  createTableConnections().then(() => {
    // needed since sometimes users table seams not present ...
    setTimeout(() => {
      seedConnections();
    }, 100);
  });
}

run().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
