import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

async function getMessages() {
  try {
    await connectDB();
    
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();
      
    return messages;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Contact Messages
          </h1>

          {/* Messages Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Subject
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
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-dark">
                        No contact messages found.
                      </td>
                    </tr>
                  ) : (
                    messages.map((message: any) => (
                      <tr key={message._id} className="hover:bg-gray-light">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-navy-primary">
                              {message.name}
                            </p>
                            <p className="text-sm text-gray-dark">
                              {message.email}
                            </p>
                            <p className="text-sm text-gray-dark">
                              {message.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {message.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              message.status === 'new'
                                ? 'bg-green-100 text-green-800'
                                : message.status === 'responded'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/admin/messages/${message._id}`}
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