import { Schema, model } from "mongoose";


const HospitalSchema = new Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    hospitalAddress: {
        type: String,
        required: true,
    },
    hospitalContact: {
        type: String,
        required: false,
        unique: true,
    },
    hospitalEmail: {
        type: String,
        unique: true,
    },
    hospitalWebsite: {
        type: String,
        unique: true,
    },
    hospitalDescription : {
        type: String,
        required: false
    }
}, {timestamps: true});

const Hospital = model('Hospital', HospitalSchema);
export default Hospital;
    