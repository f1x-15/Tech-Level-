'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: any;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    sku: product?.sku || '',
    category: product?.category?._id || '',
    shortDescription: product?.shortDescription || '',
    description: product?.description || '',
    price: product?.price || 0,
    priceVisible: product?.priceVisible ?? true,
    images: product?.images?.join(', ') || '',
    specifications: product?.specifications ? JSON.stringify(product.specifications, null, 2) : '{}',
    features: product?.features?.join(', ') || '',
    availability: product?.availability || 'in-stock',
    featured: product?.featured || false,
    status: product?.status || 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Parse specifications JSON
      let specifications = {};
      try {
        specifications = JSON.parse(formData.specifications);
      } catch (err) {
        setError('Invalid JSON format for specifications');
        setLoading(false);
        return;
      }

      // Parse features array
      const features = formData.features
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);

      // Parse images array
      const images = formData.images
        .split(',')
        .map((img: string) => img.trim())
        .filter((img: string) => img.length > 0);

      const payload = {
        ...formData,
        specifications,
        features,
        images,
        price: parseFloat(formData.price.toString()),
      };

      const url = product ? `/api/products/${product._id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save product');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-dark mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              pattern="[a-z0-9-]+"
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="product-name"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-dark mb-2">
              SKU *
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-dark mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-dark mb-2">
              Price (PKR) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-dark mb-2">
              Availability *
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            >
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="made-to-order">Made to Order</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-dark mb-2">
            Short Description *
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-dark mb-2">
            Full Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-dark mb-2">
            Images (comma-separated URLs)
          </label>
          <textarea
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent resize-none"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        <div>
          <label htmlFor="specifications" className="block text-sm font-medium text-gray-dark mb-2">
            Specifications (JSON format)
          </label>
          <textarea
            id="specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent resize-none font-mono text-sm"
            placeholder='{"Capacity": "10L", "Power": "2000W", "Dimensions": "50x30x40cm"}'
          />
        </div>

        <div>
          <label htmlFor="features" className="block text-sm font-medium text-gray-dark mb-2">
            Features (comma-separated)
          </label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent resize-none"
            placeholder="Feature 1, Feature 2, Feature 3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priceVisible"
              name="priceVisible"
              checked={formData.priceVisible}
              onChange={handleChange}
              className="w-4 h-4 text-orange-accent focus:ring-orange-accent border-gray-medium rounded"
            />
            <label htmlFor="priceVisible" className="ml-2 text-sm text-gray-dark">
              Show Price
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-orange-accent focus:ring-orange-accent border-gray-medium rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-dark">
              Featured Product
            </label>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-dark mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-medium rounded-lg font-medium hover:bg-gray-light transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}