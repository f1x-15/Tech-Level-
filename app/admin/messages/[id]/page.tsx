import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { notFound } from 'next/navigation';

async function getMessage(id: string) {
  await connectDB();
  
  const message = await ContactMessage.findById(id).lean();
  
  if (!message) {
    return null;
  }
    
  return message;
}

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await getMessage(id);

  if (!message) {
    notFound();
  }

  async function updateStatus(formData: FormData) {
    'use server';
    
    await connectDB();
    const status = formData.get('status') as string;
    
    await ContactMessage.findByIdAndUpdate(id, { status });
    
    redirect(`/admin/messages/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Contact Message Details
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Name</h3>
                <p className="text-navy-primary font-medium">{message.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Email</h3>
                <p className="text-navy-primary">{message.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Phone</h3>
                <p className="text-navy-primary">{message.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Subject</h3>
                <p className="text-navy-primary">{message.subject}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Date</h3>
                <p className="text-navy-primary">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Status</h3>
                <p className="text-navy-primary">{message.status}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-dark mb-2">Message</h3>
              <p className="text-gray-dark bg-gray-light p-4 rounded-lg">
                {message.message}
              </p>
            </div>
            
            <div className="border-t border-gray-medium pt-6">
              <h3 className="text-lg font-semibold text-navy-primary mb-4">
                Update Status
              </h3>
              <form action={updateStatus} className="flex items-center space-x-4">
                <select
                  name="status"
                  defaultValue={message.status}
                  className="px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Update Status
                </button>
              </form>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-medium">
              <a
                href="/admin/messages"
                className="text-engineering-blue hover:text-orange-accent font-medium"
              >
                ← Back to Contact Messages
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}