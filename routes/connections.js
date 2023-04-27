import express from 'express';
import auth from '../utils/middleware/auth.js';
import { connectionsController } from '../controller/connections-controller.js';

const router = express.Router();

router.post('/connections', auth, connectionsController.create);

export const connectionsRoutes = router;
