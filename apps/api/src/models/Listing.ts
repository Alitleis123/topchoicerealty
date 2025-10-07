import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
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
  agentId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    neighborhood: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    beds: {
      type: Number,
      required: true,
      min: 0,
    },
    baths: {
      type: Number,
      required: true,
      min: 0,
    },
    sqft: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
      validate: {
        validator: (urls: string[]) => urls.length > 0,
        message: 'At least one image is required',
      },
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'sold'],
      default: 'active',
      index: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient filtering
listingSchema.index({ status: 1, neighborhood: 1, price: 1 });

export const Listing = mongoose.model<IListing>('Listing', listingSchema);

