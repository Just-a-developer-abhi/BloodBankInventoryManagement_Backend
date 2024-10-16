import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: string;
  role: string;
}

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Restrict access based on roles
export const restrictTo = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (!roles.includes(req?.user?.role)) {
      console.log(req?.user?.role)
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
