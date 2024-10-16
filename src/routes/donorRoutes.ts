import express from 'express';
import { scheduleAppointments } from '../controllers/donorController';

const isAuth = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/donor-profile', isAuth.verifyToken, isAuth.restrictTo(['donor']), (req : any, res: any) => {
    res.status(200).json({ message: 'Donor actions available' });
  });


  //Api to Schedule Appointments
  router.post('/schedule-appointment', isAuth.verifyToken, isAuth.restrictTo(['donor']), scheduleAppointments);


export default router;