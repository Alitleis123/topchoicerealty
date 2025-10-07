import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User.js';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function authenticateUser(email: string, password: string): Promise<IUser | null> {
  const user = await User.findOne({ email });
  
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    return null;
  }

  return user;
}

export async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId).select('-passwordHash');
}

export function serializeUser(user: IUser) {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    photoUrl: user.photoUrl,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
  };
}

