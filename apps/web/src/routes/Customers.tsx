import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { customersApi } from '../lib/api';
import { z } from 'zod';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { formatPrice, formatDate } from '../lib/utils';
import type { Customer, Listing } from '../lib/types';

const customerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().optional(),
  purchaseDate: z.string().optional(),
  purchasePrice: z.number().optional(),
  notes: z.string().optional(),
});

type CustomerForm = z.infer<typeof customerSchema>;

export function Customers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['customers', searchQuery],
    queryFn: () => customersApi.getAll({ q: searchQuery || undefined }),
  });

  const createMutation = useMutation({
    mutationFn: customersApi.create,
    onSuccess: () => {
      toast.success('Customer added successfully!');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setIsCreating(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) =>
      customersApi.update(id, data),
    onSuccess: () => {
      toast.success('Customer updated!');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setEditingId(null);
      setIsCreating(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: customersApi.delete,
    onSuccess: () => {
      toast.success('Customer deleted!');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = (data: CustomerForm) => {
    const customerData = {
      ...data,
      purchaseDate: data.purchaseDate || undefined,
      purchasePrice: data.purchasePrice || undefined,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: customerData });
    } else {
      createMutation.mutate(customerData);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer._id);
    setIsCreating(true);
    setValue('firstName', customer.firstName);
    setValue('lastName', customer.lastName);
    setValue('email', customer.email);
    setValue('phone', customer.phone);
    setValue('address', customer.address || '');
    setValue('purchaseDate', customer.purchaseDate?.split('T')[0] || '');
    setValue('purchasePrice', customer.purchasePrice || undefined);
    setValue('notes', customer.notes || '');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Customer <span className="text-gold">Database</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-gold mt-2"></div>
          <p className="text-gray-600 mt-2">Track and manage your past clients</p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-gold/10">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <FormInput
                label="🔍 Search Customers"
                placeholder="Search by name, email, or phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} size="lg">
                ➕ Add Customer
              </Button>
            )}
          </div>
        </div>

        {/* Add/Edit Form */}
        {isCreating && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-gold/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editingId ? '✏️ Edit Customer' : '➕ Add New Customer'}
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mb-6"></div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <FormInput
                  label="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
                <FormInput
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <FormInput
                  label="Phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
                <FormInput
                  label="Purchase Date"
                  type="date"
                  {...register('purchaseDate')}
                  error={errors.purchaseDate?.message}
                />
                <FormInput
                  label="Purchase Price"
                  type="number"
                  {...register('purchasePrice', { valueAsNumber: true })}
                  error={errors.purchasePrice?.message}
                />
              </div>

              <FormInput
                label="Address"
                {...register('address')}
                error={errors.address?.message}
              />

              <FormTextarea
                label="Notes"
                rows={3}
                {...register('notes')}
                error={errors.notes?.message}
                placeholder="Any special notes about this customer..."
              />

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={createMutation.isPending || updateMutation.isPending}
                >
                  {editingId ? '💾 Update' : '✨ Add'} Customer
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={handleCancel}>
                  ✕ Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Customer List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Loading customers...</p>
          </div>
        ) : data?.data.customers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl border-2 border-gold/20">
            <svg
              className="mx-auto h-16 w-16 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-gray-900">No customers yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              {searchQuery
                ? 'No customers match your search'
                : 'Add customers as you close deals'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gold/20">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gold/10 to-gold/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      👤 Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📧 Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🏠 Property
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      💰 Purchase
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ⚙️ Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.data.customers.map((customer) => {
                    const listing = customer.listingId as Listing | undefined;
                    return (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          {customer.address && (
                            <div className="text-sm text-gray-500">{customer.address}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <a
                              href={`mailto:${customer.email}`}
                              className="text-gold hover:text-gold-dark"
                            >
                              {customer.email}
                            </a>
                          </div>
                          <div className="text-sm text-gray-600">{customer.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          {listing && typeof listing === 'object' ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{listing.title}</div>
                              <div className="text-gray-500">{listing.address}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">No property linked</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {customer.purchasePrice && (
                            <div className="font-bold text-gold">
                              {formatPrice(customer.purchasePrice)}
                            </div>
                          )}
                          {customer.purchaseDate && (
                            <div className="text-sm text-gray-600">
                              {formatDate(customer.purchaseDate)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-gold hover:text-gold-dark font-semibold transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(customer._id)}
                            className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {data && data.data.customers.length > 0 && (
              <div className="bg-gold/5 px-6 py-4 border-t border-gold/20">
                <p className="text-sm text-gray-600">
                  📊 Total Customers: <span className="font-bold text-gold">{data.data.customers.length}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

