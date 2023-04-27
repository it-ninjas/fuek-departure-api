import { Connection } from '../model/connection.js';
import { DbAdapter } from './db-adapter.js';

export class ConnectionAdapter extends DbAdapter {
  all(userId) {
    return new Promise((resolve, _reject) => {
      let entries = [];
      this.db.all(
        `SELECT * FROM tasks WHERE userId = :userId`,
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
      this.db.run(`
              INSERT INTO connections ("from", "to", userId)
              VALUES ("${connection.from}", ${connection.to},
              ${userId});`);

      resolve();
    });
  }

  update(id, userId, connection) {
    return new Promise((resolve, _reject) => {
      this.db.run(
        `UPDATE connections SET "from" = ":from", "to" = ":to",
              WHERE id = :id AND userId = :userId;`,
        {
          ':id': id,
          ':from': connection.from,
          ':to': connection.to,
          ':userId': userId,
        },
      );

      resolve();
    });
  }

  destroy(id, userId) {
    return new Promise((resolve, _reject) => {
      this.db.run(`
                DELETE FROM connections WHERE id = ${id};
            `);

      resolve();
    });
  }
}
