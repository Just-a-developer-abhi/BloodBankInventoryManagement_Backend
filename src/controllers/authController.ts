import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;


export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { username, password, role } = req.body;
  
      if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        password: hashedPassword,
        role
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET || 'your_jwt_secret', 
        { expiresIn: '1h' }
      );
  
      // Send success response with token
      return res.status(201).json({ message: 'User registered successfully', token });
      
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
      
    }
  };

// Login and generate JWT token
export const login = async (req: Request, res: Response, next : NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
