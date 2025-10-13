import { Customer, ICustomer } from '../models/Customer.js';
import { Listing } from '../models/Listing.js';

export async function getAgentCustomers(agentId: string): Promise<ICustomer[]> {
  return Customer.find({ agentId })
    .populate('listingId', 'title address price')
    .sort({ purchaseDate: -1, createdAt: -1 })
    .lean();
}

export async function searchCustomers(
  agentId: string,
  query: string
): Promise<ICustomer[]> {
  return Customer.find({
    agentId,
    $or: [
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
      { phone: { $regex: query, $options: 'i' } },
    ],
  })
    .populate('listingId', 'title address price')
    .sort({ purchaseDate: -1, createdAt: -1 })
    .limit(50);
}

export async function createCustomer(
  agentId: string,
  data: Partial<ICustomer>
): Promise<ICustomer> {
  const customer = new Customer({
    ...data,
    agentId,
  });

  await customer.save();
  return customer;
}

export async function updateCustomer(
  customerId: string,
  agentId: string,
  data: Partial<ICustomer>
): Promise<ICustomer | null> {
  return Customer.findOneAndUpdate(
    { _id: customerId, agentId },
    { $set: data },
    { new: true, runValidators: true }
  );
}

export async function deleteCustomer(
  customerId: string,
  agentId: string
): Promise<boolean> {
  const result = await Customer.deleteOne({ _id: customerId, agentId });
  return result.deletedCount > 0;
}

export async function linkCustomerToListing(
  listingId: string,
  customerId: string,
  agentId: string
): Promise<void> {
  await Listing.findOneAndUpdate(
    { _id: listingId, agentId },
    {
      $set: {
        customerId,
        soldDate: new Date(),
        status: 'sold',
      },
    }
  );
}

