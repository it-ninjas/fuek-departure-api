import { Connection } from '../model/connection.js';
import { DbAdapter } from './db-adapter.js';

export class ConnectionAdapter extends DbAdapter {
  all(userId) {
    return new Promise((resolve, _reject) => {
      let entries = [];
      this.db.all(
        `SELECT * FROM connections WHERE user_id = :userId`,
        { ':userId': userId },
        [],
        (err, rows) => {
          if (err) {
            return console.error(err.message);
          }
          rows.forEach((row) => {
            let entry = new Connection(row['id'], row['from'], row['to']);
            entries.push(entry);
          });

          resolve(entries);
        },
      );
    });
  }

  create(connection, userId) {
    return new Promise((resolve, _reject) => {
      let entry = {};
      this.db.run(
        `INSERT INTO connections ("from", "to", user_id)
          VALUES (:from, :to, :userId);`,
        { ':from': connection.from, ':to': connection.to, ':userId': userId },
        (err, row) => {
          if (err) {
            return console.error(err.message);
          }
          // TODO: get id from newly generated entry
          entry = new Connection(connection.from, connection.to);
        },
      );

      resolve(entry);
    });
  }

  //update(id, userId, connection) {
  //return new Promise((resolve, _reject) => {
  //this.db.run(
  //`UPDATE connections SET "from" = ":from", "to" = ":to",
  //WHERE id = :id AND userId = :user_id;`,
  //{
  //':id': id,
  //':from': connection.from,
  //':to': connection.to,
  //':user_id': userId,
  //},
  //);

  //resolve();
  //});
  //}

  delete(id, userId) {
    id = Number(id);
    return new Promise((resolve, _reject) => {
      this.db.run(`DELETE FROM connections WHERE id = ${id};`, (err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      resolve();
    });
  }
}
