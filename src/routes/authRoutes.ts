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

// Blood Bank Staff only
router.get('/staff-actions', isAuth.verifyToken, isAuth.restrictTo(['BB Staff']), (req :any, res: any) => {
  res.status(200).json({ message: 'Blood Bank Staff actions available' });
});

// Hospital only
router.get('/hospital-actions', isAuth.verifyToken, isAuth.restrictTo(['Hospital']), (req : any, res: any) => {
  res.status(200).json({ message: 'Hospital actions available' });
});

// Donor only
router.get('/donor-actions', isAuth.verifyToken, isAuth.restrictTo(['Donor']), (req : any, res: any) => {
  res.status(200).json({ message: 'Donor actions available' });
});

export default router;
