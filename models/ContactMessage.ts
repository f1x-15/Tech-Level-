import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
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
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['new', 'responded', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ContactMessageSchema.index({ status: 1 });
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ email: 1 });

const ContactMessage = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);

export default ContactMessage;