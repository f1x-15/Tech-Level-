import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Link from 'next/link';

async function getProducts() {
  try {
    await connectDB();
    
    const products = await Product.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .lean();
      
    return products;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

async function getCategories() {
  try {
    await connectDB();
    
    const categories = await Category.find({ active: true })
      .sort({ name: 1 })
      .lean();
      
    return categories;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

export default async function AdminProducts() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-navy-primary">
              Products
            </h1>
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-orange-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Add Product
            </Link>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-medium">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-dark">
                        No products found. Add your first product to get started.
                      </td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                      <tr key={product._id} className="hover:bg-gray-light">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {product.images.length > 0 && (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg mr-4"
                              />
                            )}
                            <div>
                              <p className="font-medium text-navy-primary">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-dark">
                                SKU: {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {product.category?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {product.priceVisible
                            ? `PKR ${product.price.toLocaleString()}`
                            : 'Contact for Price'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : product.status === 'inactive'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.featured ? (
                            <span className="text-orange-accent">⭐</span>
                          ) : (
                            <span className="text-gray-medium">○</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/products/${product._id}`}
                              className="text-engineering-blue hover:text-orange-accent text-sm font-medium"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/admin/products/${product._id}/delete`}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}