import { UserAdapter } from '../adapters/user-adapter.js';
import jwt from 'jsonwebtoken';

export class LoginController {
  constructor() {
    this.userAdapter = new UserAdapter();
  }

  create = async (req, res, _next) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send('Email and password required');
        return;
      }
      // Validate if user exist in our database
      const user = await this.userAdapter.getByEmail(email);

      if (user && (await user.isPasswordValid(password))) {
        // Create token
        const token = jwt.sign(
          { userId: user.id, email },
          'never-use-a-static-key-in-prod-env',
          {
            expiresIn: '2h',
          },
        );

        // save user token
        user.token = token;

        res.status(200).json(user.toJson());
      } else {
        res.status(400).send('Invalid Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export const loginController = new LoginController();
