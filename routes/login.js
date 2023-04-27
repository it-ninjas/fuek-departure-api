import express from 'express';
import { loginController } from '../controller/login-controller.js';

const router = express.Router();

router.post('/login', loginController.create);

export const loginRoutes = router;
