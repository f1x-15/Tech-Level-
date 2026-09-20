import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  company: z.string().max(100, 'Company name cannot exceed 100 characters').optional(),
  phone: z.string().min(1, 'Phone number is required').regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  productId: z.string().optional(),
  productName: z.string().min(1, 'Product name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message cannot exceed 1000 characters'),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;