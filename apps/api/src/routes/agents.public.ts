import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

// Get all agents (public)
router.get('/', async (_req, res, next) => {
  try {
    const agents = await User.find({ role: 'agent' })
      .select('name email phone photoUrl bio')
      .sort({ name: 1 })
      .lean();

    res.json({ agents });
  } catch (error) {
    next(error);
  }
});

export default router;
