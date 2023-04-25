import { User } from '../model/user.js';
import { DbAdapter } from './db-adapter.js';

export class UserAdapter extends DbAdapter {
  getByEmail(email) {
    return new Promise((resolve, _reject) => {
      this.db.get(
        'SELECT * FROM users WHERE email = :email',
        { ':email': email },
        (err, row) => {
          if (err) {
            return console.error(err.message);
          }

          if (row) {
            const entry = new User(
              row['id'],
              row['email'],
              row['first_name'],
              row['last_name'],
              row['encrypted_password'],
            );
            resolve(entry);
          } else {
            resolve(undefined);
          }
        },
      );
    });
  }
}
