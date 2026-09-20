import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import QuoteRequest from '@/models/QuoteRequest';
import ContactMessage from '@/models/ContactMessage';

async function getDashboardStats() {
  try {
    await connectDB();

    const [
      totalProducts,
      totalCategories,
      totalQuotes,
      totalMessages,
      recentQuotes,
    ] = await Promise.all([
      Product.countDocuments({ status: 'active' }),
      Category.countDocuments({ active: true }),
      QuoteRequest.countDocuments(),
      ContactMessage.countDocuments(),
      QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return {
      totalProducts,
      totalCategories,
      totalQuotes,
      totalMessages,
      recentQuotes,
    };
  } catch (error) {
    // Return default stats if DB not connected
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalQuotes: 0,
      totalMessages: 0,
      recentQuotes: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-dark text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-navy-primary mt-2">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-dark text-sm">Categories</p>
                  <p className="text-3xl font-bold text-navy-primary mt-2">
                    {stats.totalCategories}
                  </p>
                </div>
                <div className="text-4xl">🏷️</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-dark text-sm">Quote Requests</p>
                  <p className="text-3xl font-bold text-navy-primary mt-2">
                    {stats.totalQuotes}
                  </p>
                </div>
                <div className="text-4xl">💬</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-dark text-sm">Contact Messages</p>
                  <p className="text-3xl font-bold text-navy-primary mt-2">
                    {stats.totalMessages}
                  </p>
                </div>
                <div className="text-4xl">✉️</div>
              </div>
            </div>
          </div>

          {/* Recent Quote Requests */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-medium">
              <h2 className="text-xl font-semibold text-navy-primary">
                Recent Quote Requests
              </h2>
            </div>
            <div className="p-6">
              {stats.recentQuotes.length === 0 ? (
                <p className="text-gray-dark text-center py-8">
                  No quote requests yet
                </p>
              ) : (
                <div className="space-y-4">
                  {stats.recentQuotes.map((quote: any) => (
                    <div
                      key={quote._id}
                      className="flex items-center justify-between p-4 bg-gray-light rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-navy-primary">
                          {quote.name}
                        </p>
                        <p className="text-sm text-gray-dark">
                          {quote.productName} - Qty: {quote.quantity}
                        </p>
                        <p className="text-xs text-gray-medium">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          quote.status === 'new'
                            ? 'bg-green-100 text-green-800'
                            : quote.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : quote.status === 'quoted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : quote.status === 'completed'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}