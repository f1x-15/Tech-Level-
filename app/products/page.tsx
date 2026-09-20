'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  price: number;
  priceVisible: boolean;
  images: string[];
  category: {
    name: string;
    slug: string;
  };
  availability: string;
  featured: boolean;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-createdAt');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'commercial-fryers', label: 'Commercial Fryers' },
    { value: 'pizza-ovens', label: 'Pizza Ovens' },
    { value: 'cold-rooms', label: 'Cold Rooms' },
    { value: 'kitchen-equipment', label: 'Kitchen Equipment' },
  ];

  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: '-name', label: 'Name Z-A' },
    { value: 'price', label: 'Price Low to High' },
    { value: '-price', label: 'Price High to Low' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchParams.get('category')) params.set('category', searchParams.get('category')!);
      if (searchParams.get('search')) params.set('search', searchParams.get('search')!);
      if (searchParams.get('sort')) params.set('sort', searchParams.get('sort')!);
      params.set('page', searchParams.get('page') || '1');
      params.set('status', 'active');

      const response = await fetch(`/api/products?${params.toString()}`);
      const data: ProductsResponse = await response.json();

      if (response.ok) {
        setProducts(data.products);
        setPagination(data.pagination);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy) params.set('sort', sortBy);
    router.push(`/products?${params.toString()}`);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (category) params.set('category', category);
    if (sortBy) params.set('sort', sortBy);
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sort) params.set('sort', sort);
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
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
          <p className="mt-4 text-gray-dark">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-orange-accent text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-navy-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-200">
            Browse our comprehensive range of commercial kitchen equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-dark mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or description..."
                  className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-dark mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-dark mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-orange-accent text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-dark text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSortBy('-createdAt');
                router.push('/products');
              }}
              className="mt-4 px-6 py-2 bg-navy-primary text-white rounded-lg hover:bg-navy-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-light">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-medium"
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
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-orange-accent text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-navy-primary mb-2 hover:text-orange-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-dark mb-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-medium">
                        {product.category.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
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
                      <p className="text-lg font-bold text-navy-primary mb-3">
                        {formatPrice(product.price)}
                      </p>
                    ) : (
                      <p className="text-lg font-bold text-orange-accent mb-3">
                        Contact for Price
                      </p>
                    )}
                    <div className="flex space-x-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center px-3 py-2 bg-navy-primary text-white rounded-lg text-sm hover:bg-navy-dark transition-colors"
                      >
                        View Details
                      </Link>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${getWhatsAppMessage(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-white border border-gray-medium rounded-lg hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === pagination.page
                        ? 'bg-orange-accent text-white'
                        : 'bg-white border border-gray-medium hover:bg-gray-light'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-white border border-gray-medium rounded-lg hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-light flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}