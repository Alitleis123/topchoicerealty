import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import {
  getAgentListings,
  createListing,
  updateListing,
  updateListingStatus,
  deleteListing,
} from '../services/listings.js';
import {
  createListingSchema,
  updateListingSchema,
  updateListingStatusSchema,
} from '../utils/validators.js';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// Get agent's listings
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const listings = await getAgentListings(req.user!._id.toString());
    res.json({ listings });
  } catch (error) {
    next(error);
  }
});

// Create listing
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = createListingSchema.parse(req.body);
    const listing = await createListing(req.user!._id.toString(), data);

    res.status(201).json({ listing });
  } catch (error) {
    next(error);
  }
});

// Update listing
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = updateListingSchema.parse(req.body);
    const listing = await updateListing(req.params.id, req.user!._id.toString(), data);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.json({ listing });
  } catch (error) {
    next(error);
  }
});

// Update listing status
router.patch('/:id/status', async (req: AuthRequest, res, next) => {
  try {
    const { status } = updateListingStatusSchema.parse(req.body);
    const listing = await updateListingStatus(req.params.id, req.user!._id.toString(), status);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.json({ listing });
  } catch (error) {
    next(error);
  }
});

// Delete listing
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const deleted = await deleteListing(req.params.id, req.user!._id.toString());

    if (!deleted) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;

