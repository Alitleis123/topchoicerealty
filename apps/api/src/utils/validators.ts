import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Listing schemas
export const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  address: z.string().min(5, 'Address is required'),
  neighborhood: z.string().min(2, 'Neighborhood is required'),
  price: z.number().positive('Price must be positive'),
  beds: z.number().int().min(0, 'Beds must be non-negative'),
  baths: z.number().min(0, 'Baths must be non-negative'),
  sqft: z.number().positive('Square footage must be positive'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000),
  imageUrls: z.array(z.string().url()).min(1, 'At least one image is required'),
  status: z.enum(['active', 'pending', 'sold']).default('active'),
});

export const updateListingSchema = createListingSchema.partial();

export const updateListingStatusSchema = z.object({
  status: z.enum(['active', 'pending', 'sold']),
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
  listingId: z.string().length(24, 'Invalid listing ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
      'Invalid phone number format'
    ),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Profile update schema
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().optional(),
  photoUrl: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type ListingsQuery = z.infer<typeof listingsQuerySchema>;
export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

