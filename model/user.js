import bcrypt from 'bcrypt';

export class User {
  constructor(id, email, firstName, lastName, encryptedPassword) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.encryptedPassword = encryptedPassword;
  }

  async isPasswordValid(password) {
    return bcrypt.compare(password, this.encryptedPassword).then((result) => {
      return result;
    });
  }

  toJson() {
    return {
      token: this.token,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }
}
