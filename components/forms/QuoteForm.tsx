'use client';

import { useState } from 'react';

interface QuoteFormProps {
  productName?: string;
  productId?: string;
}

export default function QuoteForm({ productName, productId }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    productName: productName || '',
    quantity: 1,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productId,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          productName: productName || '',
          quantity: 1,
          message: '',
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit quote request');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-navy-primary mb-6">
        Get a Quote
      </h2>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">
            Thank you for your quote request! We'll get back to you with pricing and details soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-dark mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="Company name (optional)"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-dark mb-2">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-dark mb-2">
              Product *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
              placeholder="Product name"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-dark mb-2">
              Quantity *
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-dark mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-accent to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
          >
            {loading ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      )}
    </div>
  );
}