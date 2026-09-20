import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name cannot exceed 100 characters'),
  slug: z.string().min(1, 'Category slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Category description is required').max(500, 'Description cannot exceed 500 characters'),
  image: z.string().default(''),
  active: z.boolean().default(true),
});

export type CategoryFormData = z.infer<typeof categorySchema>;