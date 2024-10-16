import { Schema, model } from "mongoose";


const AppointmentSchema = new Schema({
    donorId : {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time : {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Appointment = model('Appoitment', AppointmentSchema);
export default Appointment;