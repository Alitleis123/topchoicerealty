import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import {
  getAgentCustomers,
  searchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  linkCustomerToListing,
} from '../services/customers.js';
import {
  createCustomerSchema,
  updateCustomerSchema,
  customersQuerySchema,
} from '../utils/validators.js';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// Get agent's customers
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const query = customersQuerySchema.parse(req.query);
    
    let customers;
    if (query.q) {
      customers = await searchCustomers(req.user!._id.toString(), query.q);
    } else {
      customers = await getAgentCustomers(req.user!._id.toString());
    }

    res.json({ customers });
  } catch (error) {
    next(error);
  }
});

// Create customer
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const data = createCustomerSchema.parse(req.body);
    const customer = await createCustomer(req.user!._id.toString(), data);

    // Link to listing if provided
    if (data.listingId) {
      await linkCustomerToListing(
        data.listingId,
        customer._id.toString(),
        req.user!._id.toString()
      );
    }

    res.status(201).json({ customer });
  } catch (error) {
    next(error);
  }
});

// Update customer
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const data = updateCustomerSchema.parse(req.body);
    const customer = await updateCustomer(
      req.params.id,
      req.user!._id.toString(),
      data
    );

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found or unauthorized' });
    }

    res.json({ customer });
  } catch (error) {
    next(error);
  }
});

// Delete customer
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const deleted = await deleteCustomer(req.params.id, req.user!._id.toString());

    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found or unauthorized' });
    }

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;

