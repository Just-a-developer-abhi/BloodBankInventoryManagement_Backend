import { NextFunction } from "express";
import Appointment from "../models/Donor/donorModel";


//Api to schedule Appointments
export const scheduleAppointments = (req : any, res: any, next: NextFunction) => {
    const { donorId, date, time, location } = req.body;
    console.log("donorId", donorId);
    console.log("date", date);
    console.log("time", time);

    if(!donorId || !date || !time || !location){
        throw { statusCode : 400, message : "Please correct the details" };
        }
    new Appointment({
        donorId,
        date,
        time,
        location
    })
    .save()
    .then(e => {  
        res.json({
            message: "Your Appointment has been scheduled with below details",
            location: location,
            date: date,
            time: time,
        })
}).catch(error=>{
    if(!error.statusCode){
        error.statusCode = 400;
    }
    next(error);
})
}