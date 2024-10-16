import express from 'express';
import { register, login } from '../controllers/authController';
import { verifyToken, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

const authController = require('../controllers/authController');
const isAuth = require('../middleware/authMiddleware');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Protected route - accessible to all logged-in users
router.get('/dashboard', isAuth.verifyToken, (req : any, res: any) => {
  res.status(200).json({ message: `Welcome ${req.user.username}` });
});


export default router;
