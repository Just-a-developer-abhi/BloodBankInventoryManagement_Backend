import { NextFunction } from "express"
import Storage from "../models/Staff/storageModel"
import { allowedBloodGroups } from "../utils/utils";
import User from "../models/userModel";
import Hospital from "../models/Hospital/hospitalModel";
import Appointment from "../models/Donor/donorModel";



export const getBloodBankInventroy = (req: any, res: any, next: NextFunction) => {
     let bloodsStorage = []
     return Storage.find({}).then(e=>{
        console.log(" Inside the blood inventory", e)
        res.json(e)
    }).catch(e=>{ 
         console.log("The error is ", e)
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e) });
}


export const addBloodBankInventory = (req: any, res: any, next: NextFunction) => {
    const { bloodGroup, quantity } = req.body;
    console.log("bloodGroup", bloodGroup);
    console.log("quantity", quantity);
    
    if(!bloodGroup || !allowedBloodGroups.includes(bloodGroup)){
        throw { statusCode : 400, message : "Invalid blood group" };
    }
    Storage.findOneAndUpdate(
      { bloodGroup: bloodGroup }, 
      { 
        $inc: { quantity: quantity ?? 2 } 
      },
      { new: true, upsert: true }  
    )
    .then(updatedStorage => {
      res.json({ 
        message: "Inventory added/updated successfully", 
        bloodGroup: updatedStorage.bloodGroup, 
        quantity: updatedStorage.quantity 
      });
    })
    .catch(error => { 
      console.log("The error is ", error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
 };

 export const getDonorCollection = (req: any, res: any, next: NextFunction) => {
    return User.find({role: "donor", userDetails:{$exists:true}}).then(e=>{
       console.log(" These are the users found", e)
       res.json(e.map(user=>{
           return {
               id:user._id,
               name:user?.userDetails?.name,
               age:user?.userDetails?.age,
               bloodGroup:user?.userDetails?.bloodGroup,
               }
            }
       ))
   }).catch(e=>{ 
        console.log("The error is ", e)
       if(!e.statusCode){
           e.statusCode = 500;
       }
       next(e) });
}


 export const getDonorProfile = (req: any, res: any, next: NextFunction) => {
    const { id } = req.query;
    console.log("id", id)
    return User.findOne({_id:id}).then(e=>{
       console.log(" This is the user details", e?.userDetails)
       res.json(e?.userDetails)
   }).catch(e=>{ 
        console.log("The error is ", e)
       if(!e.statusCode){
           e.statusCode = 500;
       }
       next(e) });
}

 export const getHospitalCollection = (req: any, res: any, next: NextFunction) => {
    return Hospital.find({}).then(e=>{
        console.log(" These are the users found", e)
        res.json(e)
    }).catch(e=>{ 
         console.log("The error is ", e)
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e) });
}


//Controller to register hospitals in BB Panel
export const registerHospitals = (req: any, res: any, next: NextFunction) => {
    const {hospitalName, hospitalAddress, hospitalContact, hospitalDescription, hospitalEmail, hospitalWebsite } = req.body;
    console.log("hospitalDetails", hospitalName)
    
    if(!hospitalName){
        throw { statusCode : 400, message : "Please correct the details" };
    }
    new Hospital({
        hospitalName,
        hospitalAddress,
        hospitalEmail,
        hospitalWebsite,
        hospitalContact,
        hospitalDescription
    })
    .save()
    .then(e => {
      res.json({ 
        message: "Hospital registered successfully", 
        hospitalName: hospitalName
      });
    })
    .catch(error => { 
      console.log("The error is ", error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
 };

//API to get the appointment collection
export const getAppointmentCollection = (req : any, res: any, next: NextFunction) => {
    return Appointment.find({date : { $gt: new Date()}}).then(e=>{
        res.json(e);
        console.log("This is the appointment details", e)
    }).catch(e=>{
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
})
}

 

