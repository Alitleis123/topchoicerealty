export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
  bio?: string;
  role: 'agent' | 'admin';
  createdAt: string;
}

export interface Listing {
  _id: string;
  title: string;
  address: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  imageUrls: string[];
  status: 'active' | 'pending' | 'sold';
  agentId: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  _id: string;
  listingId: string;
  agentId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  emailStatus: 'queued' | 'sent' | 'failed';
  createdAt: string;
}

export interface PaginatedListings {
  listings: Listing[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ListingsQuery {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  neighborhood?: string;
  status?: 'active' | 'pending' | 'sold';
  page?: number;
  limit?: number;
}

