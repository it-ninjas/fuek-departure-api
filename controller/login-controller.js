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

      console.log(req.body);

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
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h',
          },
        );

        // save user token
        user.token = token;

        res.status(200).json(user);
      } else {
        res.status(400).send('Invalid Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export const loginController = new LoginController();
