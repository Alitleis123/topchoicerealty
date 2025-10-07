import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { agentListingsApi } from '../lib/api';
import { createListingSchema, CreateListingInput } from '../lib/schemas';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { formatPrice, formatDate, getStatusBadgeColor } from '../lib/utils';
import { useAuth } from '../lib/auth';
import type { Listing } from '../lib/types';
import profileImage from '../assets/topchoicerealtypfp.jpg';

export function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['agent-listings'],
    queryFn: () => agentListingsApi.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: agentListingsApi.create,
    onSuccess: () => {
      toast.success('Listing created successfully!');
      queryClient.invalidateQueries({ queryKey: ['agent-listings'] });
      setIsCreating(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create listing');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Listing> }) =>
      agentListingsApi.update(id, data),
    onSuccess: () => {
      toast.success('Listing updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['agent-listings'] });
      setEditingId(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update listing');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'pending' | 'sold' }) =>
      agentListingsApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated!');
      queryClient.invalidateQueries({ queryKey: ['agent-listings'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: agentListingsApi.delete,
    onSuccess: () => {
      toast.success('Listing deleted!');
      queryClient.invalidateQueries({ queryKey: ['agent-listings'] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
  });

  const onSubmit = (data: CreateListingInput) => {
    // Split image URLs by newline
    const imageUrls = typeof data.imageUrls === 'string' 
      ? (data.imageUrls as any).split('\n').filter((url: string) => url.trim())
      : data.imageUrls;

    const listingData = { ...data, imageUrls };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: listingData });
    } else {
      createMutation.mutate(listingData);
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingId(listing._id);
    setIsCreating(true);
    Object.entries(listing).forEach(([key, value]) => {
      if (key === 'imageUrls') {
        setValue(key as any, (value as string[]).join('\n') as any);
      } else {
        setValue(key as any, value);
      }
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    reset();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header with Profile */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-gold/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={profileImage}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-gold shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard <span className="text-gold">🏠</span>
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} size="lg">
                ➕ Create New Listing
              </Button>
            )}
          </div>
        </div>

        {isCreating && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-gold/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {editingId ? '✏️ Edit Listing' : '➕ Create New Listing'}
            </h2>
            <div className="w-20 h-1 bg-gradient-gold mb-6"></div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Title"
                {...register('title')}
                error={errors.title?.message}
              />

              <FormInput
                label="Address"
                {...register('address')}
                error={errors.address?.message}
              />

              <FormInput
                label="Neighborhood"
                {...register('neighborhood')}
                error={errors.neighborhood?.message}
              />

              <FormInput
                label="Price"
                type="number"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
              />

              <FormInput
                label="Beds"
                type="number"
                {...register('beds', { valueAsNumber: true })}
                error={errors.beds?.message}
              />

              <FormInput
                label="Baths"
                type="number"
                step="0.5"
                {...register('baths', { valueAsNumber: true })}
                error={errors.baths?.message}
              />

              <FormInput
                label="Square Feet"
                type="number"
                {...register('sqft', { valueAsNumber: true })}
                error={errors.sqft?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <FormTextarea
              label="Description"
              rows={4}
              {...register('description')}
              error={errors.description?.message}
            />

            <FormTextarea
              label="Image URLs (one per line)"
              rows={3}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              {...register('imageUrls' as any)}
              error={errors.imageUrls?.message as any}
            />

              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={createMutation.isPending || updateMutation.isPending}
                >
                  {editingId ? '💾 Update' : '✨ Create'} Listing
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={handleCancelEdit}>
                  ✕ Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {data?.data.listings.length === 0 ? (
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-gray-900">No listings yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get started by creating your first listing
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gold/20">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gold/10 to-gold/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    🏠 Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    💰 Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📊 Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    📅 Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ⚙️ Actions
                  </th>
                </tr>
              </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.data.listings.map((listing) => (
                <tr key={listing._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={listing.imageUrls[0]}
                        alt={listing.title}
                        className="w-20 h-20 rounded-lg object-cover border-2 border-gold/20 shadow-md"
                      />
                      <div className="ml-4">
                        <div className="font-semibold text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-600">{listing.address}</div>
                        <div className="text-xs text-gray-500">{listing.neighborhood}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gold">
                      {formatPrice(listing.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={listing.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({
                          id: listing._id,
                          status: e.target.value as any,
                        })
                      }
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase cursor-pointer ${getStatusBadgeColor(
                        listing.status
                      )}`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(listing.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(listing)}
                      className="text-gold hover:text-gold-dark mr-4 font-semibold transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

