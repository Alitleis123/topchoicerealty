import { z } from 'zod';
import { 
  sanitizedStringSchema, 
  sanitizedEmailSchema, 
  sanitizedPhoneSchema,
  validateObjectId 
} from './sanitize.js';

// Auth schemas
export const loginSchema = z.object({
  email: sanitizedEmailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters').max(128),
});

// Listing schemas
export const createListingSchema = z.object({
  title: sanitizedStringSchema.min(5).max(200),
  address: sanitizedStringSchema.min(5),
  neighborhood: sanitizedStringSchema.min(2),
  price: z.number().positive().max(1000000000), // Max $1B
  beds: z.number().int().min(0).max(20),
  baths: z.number().min(0).max(20),
  sqft: z.number().positive().max(100000), // Max 100k sqft
  description: sanitizedStringSchema.min(20).max(5000),
  imageUrls: z.array(z.string().url()).min(1).max(20),
  status: z.enum(['active', 'pending', 'sold']).default('active'),
});

export const updateListingSchema = createListingSchema.partial();

export const updateListingStatusSchema = z.object({
  status: z.enum(['active', 'pending', 'sold']),
  customerId: z.string().refine(validateObjectId, 'Invalid customer ID').optional(),
});

// Query schemas
export const listingsQuerySchema = z.object({
  q: z.string().optional(),
  minPrice: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
  maxPrice: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
  beds: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
  neighborhood: z.string().optional(),
  status: z.enum(['active', 'pending', 'sold']).default('active'),
  page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? Number(val) : 12)),
});

// Inquiry schema
export const createInquirySchema = z.object({
  listingId: z.string().refine(validateObjectId, 'Invalid listing ID'),
  name: sanitizedStringSchema.min(2).max(100),
  email: sanitizedEmailSchema,
  phone: sanitizedPhoneSchema.optional(),
  message: sanitizedStringSchema.min(10).max(2000),
});

// Customer schemas
export const createCustomerSchema = z.object({
  firstName: sanitizedStringSchema.min(2).max(50),
  lastName: sanitizedStringSchema.min(2).max(50),
  email: sanitizedEmailSchema,
  phone: sanitizedPhoneSchema,
  address: sanitizedStringSchema.max(200).optional(),
  purchaseDate: z.string().datetime().optional(),
  purchasePrice: z.number().positive().max(1000000000).optional(),
  notes: sanitizedStringSchema.max(1000).optional(),
  listingId: z.string().refine(validateObjectId, 'Invalid listing ID').optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export const customersQuerySchema = z.object({
  q: z.string().optional(),
  page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? Number(val) : 20)),
});

// Profile update schema
export const updateProfileSchema = z.object({
  name: sanitizedStringSchema.min(2).max(100).optional(),
  phone: sanitizedPhoneSchema.optional(),
  photoUrl: z.string().url().optional(),
  bio: sanitizedStringSchema.max(500).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingsQuery = z.infer<typeof listingsQuerySchema>;
export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CustomersQuery = z.infer<typeof customersQuerySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
