import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import QuoteRequest from '@/models/QuoteRequest';
import { notFound } from 'next/navigation';

async function getQuote(id: string) {
  await connectDB();
  
  const quote = await QuoteRequest.findById(id).lean();
  
  if (!quote) {
    return null;
  }
    
  return quote;
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await getQuote(id);

  if (!quote) {
    notFound();
  }

  async function updateStatus(formData: FormData) {
    'use server';
    
    await connectDB();
    const status = formData.get('status') as string;
    
    await QuoteRequest.findByIdAndUpdate(id, { status });
    
    redirect(`/admin/quotes/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Quote Request Details
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Customer Name</h3>
                <p className="text-navy-primary font-medium">{quote.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Company</h3>
                <p className="text-navy-primary">{quote.company || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Email</h3>
                <p className="text-navy-primary">{quote.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Phone</h3>
                <p className="text-navy-primary">{quote.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Product</h3>
                <p className="text-navy-primary">{quote.productName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Quantity</h3>
                <p className="text-navy-primary">{quote.quantity}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Date</h3>
                <p className="text-navy-primary">
                  {new Date(quote.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-dark mb-2">Status</h3>
                <p className="text-navy-primary">{quote.status}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-dark mb-2">Message</h3>
              <p className="text-gray-dark bg-gray-light p-4 rounded-lg">
                {quote.message}
              </p>
            </div>
            
            <div className="border-t border-gray-medium pt-6">
              <h3 className="text-lg font-semibold text-navy-primary mb-4">
                Update Status
              </h3>
              <form action={updateStatus} className="flex items-center space-x-4">
                <select
                  name="status"
                  defaultValue={quote.status}
                  className="px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
                href="/admin/quotes"
                className="text-engineering-blue hover:text-orange-accent font-medium"
              >
                ← Back to Quote Requests
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}