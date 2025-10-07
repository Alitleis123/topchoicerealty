import { Router } from 'express';
import { getPublicListings, getListingById, getUniqueNeighborhoods } from '../services/listings.js';
import { listingsQuerySchema } from '../utils/validators.js';

const router = Router();

// Get all public listings with filters
router.get('/', async (req, res, next) => {
  try {
    const query = listingsQuerySchema.parse(req.query);
    const result = await getPublicListings(query);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Get unique neighborhoods for filters
router.get('/neighborhoods', async (_req, res, next) => {
  try {
    const neighborhoods = await getUniqueNeighborhoods();
    res.json({ neighborhoods });
  } catch (error) {
    next(error);
  }
});

// Get single listing by ID
router.get('/:id', async (req, res, next) => {
  try {
    const listing = await getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json({ listing });
  } catch (error) {
    next(error);
  }
});

export default router;

