import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

async function getOrders() {
  try {
    await connectDB();
    
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();
      
    return orders;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

export default async function AdminOrders() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Orders
          </h1>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-medium">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-dark">
                        No orders found yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order: any) => (
                      <tr key={order._id} className="hover:bg-gray-light">
                        <td className="px-6 py-4 font-medium text-navy-primary">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-navy-primary">{order.customerName}</p>
                            <p className="text-sm text-gray-dark">{order.customerEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          PKR {order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'processing'
                                ? 'bg-purple-100 text-purple-800'
                                : order.status === 'shipped'
                                ? 'bg-indigo-100 text-indigo-800'
                                : order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : order.paymentStatus === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
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