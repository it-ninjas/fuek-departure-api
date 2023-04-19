const bcrypt = require('bcryptjs');

export class User {
  constructor(id, email, firstName, lastName, encryptedPassword) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.encryptedPassword = encryptedPassword;
  }

  isPasswordValid(password) {
    return bcrypt.compare(password, this.encryptedPassword);
  }
}
