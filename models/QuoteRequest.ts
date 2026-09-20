import mongoose, { Schema, Document } from 'mongoose';

export interface IQuoteRequest extends Document {
  name: string;
  company: string;
  phone: string;
  email: string;
  productId?: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
QuoteRequestSchema.index({ status: 1 });
QuoteRequestSchema.index({ createdAt: -1 });
QuoteRequestSchema.index({ email: 1 });

const QuoteRequest = mongoose.models.QuoteRequest || mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);

export default QuoteRequest;