import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';

async function getQuotes() {
  try {
    await connectDB();
    
    const quotes = await QuoteRequest.find()
      .sort({ createdAt: -1 })
      .lean();
      
    return quotes;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

export default async function AdminQuotes() {
  const quotes = await getQuotes();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Quote Requests
          </h1>

          {/* Quotes Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-medium">
                  {quotes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-dark">
                        No quote requests found.
                      </td>
                    </tr>
                  ) : (
                    quotes.map((quote: any) => (
                      <tr key={quote._id} className="hover:bg-gray-light">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-navy-primary">
                              {quote.name}
                            </p>
                            <p className="text-sm text-gray-dark">
                              {quote.email}
                            </p>
                            <p className="text-sm text-gray-dark">
                              {quote.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {quote.productName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {quote.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/admin/quotes/${quote._id}`}
                            className="text-engineering-blue hover:text-orange-accent text-sm font-medium"
                          >
                            View
                          </a>
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