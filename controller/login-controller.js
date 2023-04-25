import { UserAdapter } from '../adapters/user-adapter.js';

export class LoginController {
  constructor() {
    this.userAdapter = new UserAdapter();
  }

  create = async (req, res, next) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send('Email and password required');
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h',
          },
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      }
      res.status(400).send('Invalid Credentials');
    } catch (err) {
      console.log(err);
    }
  };
}

export const loginController = new LoginController();
