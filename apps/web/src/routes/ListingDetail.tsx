import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { listingsApi, inquiriesApi } from '../lib/api';
import { createInquirySchema, CreateInquiryInput } from '../lib/schemas';
import { ImageCarousel } from '../components/ImageCarousel';
import { AgentCard } from '../components/AgentCard';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { Button } from '../components/Button';
import { formatPrice, formatNumber } from '../lib/utils';
import type { User } from '../lib/types';

export function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [showContactForm, setShowContactForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingsApi.getById(id!),
    enabled: !!id,
  });

  const listing = data?.data.listing;
  const agent = listing?.agentId as User | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateInquiryInput>({
    resolver: zodResolver(createInquirySchema),
    defaultValues: {
      listingId: id,
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: inquiriesApi.create,
    onSuccess: () => {
      toast.success('Inquiry sent successfully! The agent will contact you soon.');
      reset();
      setShowContactForm(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to send inquiry');
    },
  });

  const onSubmit = (data: CreateInquiryInput) => {
    inquiryMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageCarousel images={listing.imageUrls} alt={listing.title} />

          <div className="mt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <p className="text-gray-600">{listing.address}</p>
                <p className="text-sm text-gray-500">{listing.neighborhood}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">
                  {formatPrice(listing.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 py-4 border-y border-gray-200">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
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
                <span className="font-semibold">{listing.beds}</span>
                <span className="ml-1 text-gray-600">Beds</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="font-semibold">{listing.baths}</span>
                <span className="ml-1 text-gray-600">Baths</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                <span className="font-semibold">{formatNumber(listing.sqft)}</span>
                <span className="ml-1 text-gray-600">sqft</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {agent && <AgentCard agent={agent} />}

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border-2 border-gold/20">
              {!showContactForm ? (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    💬 Interested in this property?
                  </h3>
                  <Button className="w-full" size="lg" onClick={() => setShowContactForm(true)}>
                    📧 Contact Agent
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📝 Send a Message
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput
                      label="Name"
                      {...register('name')}
                      error={errors.name?.message}
                    />

                    <FormInput
                      label="Email"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                    />

                    <FormInput
                      label="Phone (optional)"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />

                    <FormTextarea
                      label="Message"
                      rows={4}
                      {...register('message')}
                      error={errors.message?.message}
                    />

                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        className="flex-1"
                        isLoading={inquiryMutation.isPending}
                      >
                        Send
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

