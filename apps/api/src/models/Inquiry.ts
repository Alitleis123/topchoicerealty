import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  listingId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  message: string;
  emailStatus: 'queued' | 'sent' | 'failed';
  createdAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
      index: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
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
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    emailStatus: {
      type: String,
      enum: ['queued', 'sent', 'failed'],
      default: 'queued',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', inquirySchema);

