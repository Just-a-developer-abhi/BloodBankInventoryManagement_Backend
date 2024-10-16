import { Schema, model } from "mongoose";

interface IStorage {
    bloodGroup: string;
    quantity: number;
    id: string;
}

const storageSchema = new Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    id: {
        type: String,
        required: true,
        default: new Date().toISOString(),
    },

}, { timestamps: true });

const Storage = model('Storage', storageSchema);
export default Storage;
