import { User } from '../model/user.js';
import { DbAdapter } from './db-adapter.js';

export class UserAdapter extends DbAdapter {
  get(email) {
    return new Promise((resolve, _reject) => {
      this.db.all(
        `SELECT * FROM users WHERE email = ${email} LIMIT 1`,
        [],
        (err, rows) => {
          if (err) {
            return console.error(err.message);
          }
          const row = rows[0];
          const entry = new User(
            row['id'],
            row['email'],
            row['first_name'],
            row['last_name'],
            row['encrypted_password'],
          );

          resolve(entry);
        },
      );
    });
  }
}
