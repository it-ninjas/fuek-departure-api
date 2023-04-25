import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

export class DbAdapter {
  get db() {
    return (this.dbc ||= this.dbConnect());
  }

  get dbFilePath() {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    let dbFilePath = path.join(dirname, '../db/app.db');
    if (process.env.ENV === 'test') {
      dbFilePath = path.join(dirname, '../db/app.test.db');
    }
    return dbFilePath;
  }

  dbConnect() {
    console.log(this.dbFilePath);
    let db = new sqlite3.Database(this.dbFilePath, (err) => {
      if (err) {
        console.log('Getting error ' + err);
        exit(1);
      }
    });

    return db;
  }
}
