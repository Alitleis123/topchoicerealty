import axios from 'axios';
import type { User, Listing, Inquiry, PaginatedListings, ListingsQuery } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: User }>('/auth/login', { email, password }),

  logout: () => api.post('/auth/logout'),

  me: () => api.get<{ user: User }>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    api.put<{ user: User }>('/auth/profile', data),
};

// Public listings
export const listingsApi = {
  getAll: (query: ListingsQuery) =>
    api.get<PaginatedListings>('/listings', { params: query }),

  getById: (id: string) => api.get<{ listing: Listing }>(`/listings/${id}`),

  getNeighborhoods: () => api.get<{ neighborhoods: string[] }>('/listings/neighborhoods'),
};

// Agent listings
export const agentListingsApi = {
  getAll: () => api.get<{ listings: Listing[] }>('/agent/listings'),

  create: (data: Partial<Listing>) =>
    api.post<{ listing: Listing }>('/agent/listings', data),

  update: (id: string, data: Partial<Listing>) =>
    api.put<{ listing: Listing }>(`/agent/listings/${id}`, data),

  updateStatus: (id: string, status: 'active' | 'pending' | 'sold') =>
    api.patch<{ listing: Listing }>(`/agent/listings/${id}/status`, { status }),

  delete: (id: string) => api.delete(`/agent/listings/${id}`),
};

// Inquiries
export const inquiriesApi = {
  create: (data: {
    listingId: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => api.post<{ ok: boolean; inquiry: { id: string } }>('/inquiries', data),
};

export default api;

