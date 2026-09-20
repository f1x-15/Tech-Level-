import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  phone: z.string().min(1, 'Phone number is required').regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject cannot exceed 200 characters'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message cannot exceed 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;