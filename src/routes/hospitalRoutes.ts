import express from 'express';

const isAuth = require('../middleware/authMiddleware');
const router = express.Router();

// Hospital only
router.post('/request-blood', isAuth.verifyToken, isAuth.restrictTo(['hospital']), (req : any, res: any) => {
    res.status(200).json({ message: 'Hospital actions available' });
  });
  

export default router;