import express from 'express';
import { addBloodBankInventory, getAppointmentCollection, getBloodBankInventroy, getDonorCollection, getDonorProfile, getHospitalCollection, registerHospitals } from '../controllers/staffController';

const isAuth = require('../middleware/authMiddleware');
const router = express.Router();

//API related to Blood Bank Inventory *********************
//API to get All donor Collection
router.get('/blood-inventory', isAuth.verifyToken, isAuth.restrictTo(['staff', 'hospital']), getBloodBankInventroy);

//API to add blood to inventory
router.post('/add-blood-to-inventory', isAuth.verifyToken, isAuth.restrictTo(['staff', 'hospital']), addBloodBankInventory);
  

//API related to Donors *****************************
//API to get All donor Collection
router.get('/donor-collection', isAuth.verifyToken, isAuth.restrictTo(['staff']), getDonorCollection);
  

router.get('/donor-profile', isAuth.verifyToken, isAuth.restrictTo(['staff']), getDonorProfile);


//API related to hospital *****************************
//API to get All Hospital Collection
router.get('/hospital-collection', isAuth.verifyToken, isAuth.restrictTo(['staff']), getHospitalCollection);

//API to register Hospital to Panel
router.post('/add-hospital-to-panel', isAuth.verifyToken, isAuth.restrictTo(['staff']), registerHospitals);
  
router.get('/blood-request', isAuth.verifyToken, isAuth.restrictTo(['staff']), (req :any, res: any) => {
    res.status(200).json({ message: 'Blood Bank Staff actions available' });
  });
  

router.get('/appointments', isAuth.verifyToken, isAuth.restrictTo(['staff']), getAppointmentCollection);
  
export default router;