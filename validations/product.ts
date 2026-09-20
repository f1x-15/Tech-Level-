import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Product name cannot exceed 200 characters'),
  slug: z.string().min(1, 'Product slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  sku: z.string().min(1, 'Product SKU is required').max(50, 'SKU cannot exceed 50 characters'),
  category: z.string().min(1, 'Category is required'),
  shortDescription: z.string().min(1, 'Short description is required').max(200, 'Short description cannot exceed 200 characters'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  priceVisible: z.boolean().default(true),
  images: z.array(z.string()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
  features: z.array(z.string()).default([]),
  availability: z.enum(['in-stock', 'out-of-stock', 'made-to-order']).default('in-stock'),
  featured: z.boolean().default(false),
  status: z.enum(['active', 'inactive', 'draft']).default('active'),
});

export type ProductFormData = z.infer<typeof productSchema>;