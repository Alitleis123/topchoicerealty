import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  agentId: mongoose.Types.ObjectId;
  listingId?: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  purchaseDate?: Date;
  purchasePrice?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    purchaseDate: {
      type: Date,
    },
    purchasePrice: {
      type: Number,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for agent's customer search
customerSchema.index({ agentId: 1, lastName: 1, firstName: 1 });
customerSchema.index({ agentId: 1, email: 1 });

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

