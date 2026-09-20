'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import QuoteForm from '@/components/forms/QuoteForm';

interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: number;
  priceVisible: boolean;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  availability: string;
  featured: boolean;
  category: {
    name: string;
    slug: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/slug/${slug}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      setError('An error occurred while fetching the product');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getWhatsAppMessage = (productName: string) => {
    return encodeURIComponent(
      `Hello Tech Level Engineering, I am interested in your ${productName}. Please provide price and details.`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-accent mx-auto"></div>
          <p className="mt-4 text-gray-dark">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <Link
            href="/products"
            className="px-4 py-2 bg-orange-accent text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-dark hover:text-orange-accent transition-colors">
              Home
            </Link>
            <span className="text-gray-medium">/</span>
            <Link href="/products" className="text-gray-dark hover:text-orange-accent transition-colors">
              Products
            </Link>
            <span className="text-gray-medium">/</span>
            <span className="text-navy-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-light">
                  <svg
                    className="w-24 h-24 text-gray-medium"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-accent' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-sm text-engineering-blue hover:text-orange-accent transition-colors"
              >
                {product.category.name}
              </Link>
              <h1 className="text-3xl font-bold text-navy-primary mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-dark">{product.shortDescription}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-medium">SKU: {product.sku}</span>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  product.availability === 'in-stock'
                    ? 'bg-green-100 text-green-800'
                    : product.availability === 'out-of-stock'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {product.availability === 'in-stock'
                  ? 'In Stock'
                  : product.availability === 'out-of-stock'
                  ? 'Out of Stock'
                  : 'Made to Order'}
              </span>
            </div>

            {product.priceVisible ? (
              <div className="text-3xl font-bold text-navy-primary">
                {formatPrice(product.price)}
              </div>
            ) : (
              <div className="text-3xl font-bold text-orange-accent">
                Contact for Price
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 text-center px-6 py-3 bg-orange-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Get a Quote
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${getWhatsAppMessage(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:03214057902"
                className="flex-1 text-center px-6 py-3 bg-navy-primary text-white rounded-lg font-semibold hover:bg-navy-dark transition-colors"
              >
                Call Now
              </a>
            </div>

            {/* Quote Form */}
            <QuoteForm productName={product.name} productId={product._id} />

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-navy-primary mb-4">Description</h2>
              <p className="text-gray-dark whitespace-pre-line">{product.description}</p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-navy-primary mb-4">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <svg
                        className="w-5 h-5 text-orange-accent mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-navy-primary mb-4">Specifications</h2>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start border-b border-gray-light pb-2">
                      <span className="text-gray-dark font-medium">{key}</span>
                      <span className="text-gray-dark text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}