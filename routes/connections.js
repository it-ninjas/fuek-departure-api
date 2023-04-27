import express from 'express';
import auth from '../utils/middleware/auth.js';
import { connectionsController } from '../controller/connections-controller.js';

const router = express.Router();

router.post('/connections', auth, connectionsController.create);
router.get('/connections', auth, connectionsController.index);
router.delete('/connections/:id', auth, connectionsController.delete);

export const connectionsRoutes = router;
