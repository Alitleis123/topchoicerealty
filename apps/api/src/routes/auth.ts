import { Router } from 'express';
import { authenticateUser, getUserById, serializeUser } from '../services/auth.js';
import { loginSchema, updateProfileSchema } from '../utils/validators.js';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { loginRateLimiter } from '../middleware/rateLimit.js';
import { User } from '../models/User.js';

const router = Router();

// Login
router.post('/login', loginRateLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id.toString();

    res.json({ user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

// Get current user
router.get('/me', async (req: AuthRequest, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await getUserById(req.session.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    res.json({ user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/profile', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const updates = updateProfileSchema.parse(req.body);

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;

