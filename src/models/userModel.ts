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
    enum: ['donor', 'bb_staff', 'hospital'], // Assuming these are the roles
    required: true,
  },
}, { timestamps: true });

const User = model('Users', userSchema);
export default User;
