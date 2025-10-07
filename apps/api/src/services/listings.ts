import { Listing, IListing } from '../models/Listing.js';
import { User } from '../models/User.js';
import { ListingsQuery } from '../utils/validators.js';

export interface PaginatedListings {
  listings: IListing[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getPublicListings(query: ListingsQuery): Promise<PaginatedListings> {
  const { q, minPrice, maxPrice, beds, neighborhood, status, page, limit } = query;

  // Build filter
  const filter: Record<string, unknown> = { status };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { address: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) {
      (filter.price as Record<string, unknown>).$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      (filter.price as Record<string, unknown>).$lte = maxPrice;
    }
  }

  if (beds !== undefined) {
    filter.beds = { $gte: beds };
  }

  if (neighborhood) {
    filter.neighborhood = neighborhood;
  }

  const skip = (page - 1) * limit;

  const [listings, total] = await Promise.all([
    Listing.find(filter)
      .populate('agentId', 'name email phone photoUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Listing.countDocuments(filter),
  ]);

  return {
    listings: listings as IListing[],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getListingById(listingId: string): Promise<IListing | null> {
  return Listing.findById(listingId).populate('agentId', 'name email phone photoUrl bio');
}

export async function getAgentListings(agentId: string): Promise<IListing[]> {
  return Listing.find({ agentId }).sort({ createdAt: -1 });
}

export async function createListing(
  agentId: string,
  data: Partial<IListing>
): Promise<IListing> {
  const listing = new Listing({
    ...data,
    agentId,
  });

  await listing.save();
  return listing;
}

export async function updateListing(
  listingId: string,
  agentId: string,
  data: Partial<IListing>
): Promise<IListing | null> {
  return Listing.findOneAndUpdate(
    { _id: listingId, agentId },
    { $set: data },
    { new: true, runValidators: true }
  );
}

export async function updateListingStatus(
  listingId: string,
  agentId: string,
  status: 'active' | 'pending' | 'sold'
): Promise<IListing | null> {
  return Listing.findOneAndUpdate(
    { _id: listingId, agentId },
    { $set: { status } },
    { new: true }
  );
}

export async function deleteListing(listingId: string, agentId: string): Promise<boolean> {
  const result = await Listing.deleteOne({ _id: listingId, agentId });
  return result.deletedCount > 0;
}

export async function getUniqueNeighborhoods(): Promise<string[]> {
  return Listing.distinct('neighborhood');
}

