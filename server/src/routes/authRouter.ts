import {Router} from 'express';
import {authController} from '../controllers/authController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = Router();
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);


export default router;