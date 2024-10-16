import { Schema, model, Document } from 'mongoose';

// Define User Schema
interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['donor', 'staff', 'hospital'], // Assuming these are the roles
    required: true,
  },
  userDetails :{
    type: {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
      contact :{
        type: String,
      },
      address :{
        type: String,
      },
    },
    required: false,
  }
}, { timestamps: true });

const User = model('Users', userSchema);
export default User;
