import { Link } from 'react-router-dom';
import { Listing } from '../lib/types';
import { formatPrice, getStatusBadgeColor } from '../lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-gold/10"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={listing.imageUrls[0]}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm ${getStatusBadgeColor(
            listing.status
          )}`}
        >
          {listing.status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {listing.title}
        </h3>
        <p className="text-gray-600 text-sm mb-1">{listing.address}</p>
        <p className="text-xs text-gray-500 mb-3">{listing.neighborhood}</p>
        <p className="text-2xl font-bold text-gold mb-4">{formatPrice(listing.price)}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-700 border-t border-gray-100 pt-3">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gold"
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
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gold"
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
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gold"
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
            <span className="font-semibold">{listing.sqft.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

