import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listingsApi } from '../lib/api';
import { ListingCard } from '../components/ListingCard';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';

export function Listings() {
  const [filters, setFilters] = useState({
    q: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    neighborhood: '',
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['listings', filters],
    queryFn: () =>
      listingsApi.getAll({
        ...filters,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        beds: filters.beds ? Number(filters.beds) : undefined,
        status: 'active',
      }),
  });

  const { data: neighborhoodsData } = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: () => listingsApi.getNeighborhoods(),
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Browse <span className="text-gold">Listings</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-gold mt-2"></div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-gold/10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-gold mr-2">🔍</span> Filter Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormInput
            label="Search"
            placeholder="Search by title or address"
            value={filters.q}
            onChange={(e) => handleFilterChange('q', e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Neighborhood
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              value={filters.neighborhood}
              onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
            >
              <option value="">All Neighborhoods</option>
              {neighborhoodsData?.data.neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Min Price"
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />

          <FormInput
            label="Max Price"
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Bedrooms
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              value={filters.beds}
              onChange={(e) => handleFilterChange('beds', e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Loading listings...</p>
          </div>
        ) : data?.data.listings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-gold/10">
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
            <h3 className="mt-4 text-lg font-bold text-gray-900">No listings found</h3>
            <p className="mt-2 text-sm text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg inline-block border-l-4 border-gold">
              📊 Showing {data?.data.listings.length} of {data?.data.pagination.total} listings
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data?.data.listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.data.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 bg-white p-4 rounded-xl shadow-lg border-2 border-gold/10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                >
                  ← Previous
                </Button>

                <span className="text-sm font-semibold text-gray-700 px-4 py-2 bg-gold/10 rounded-lg border border-gold/30">
                  Page {filters.page} of {data.data.pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page === data.data.pagination.totalPages}
                  onClick={() => handlePageChange(filters.page + 1)}
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

