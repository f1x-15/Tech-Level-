import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { notFound } from 'next/navigation';

async function getCategory(id: string) {
  await connectDB();
  
  const category = await Category.findById(id).lean();
  
  if (!category) {
    return null;
  }
    
  return category;
}

export default async function DeleteCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  async function handleDelete() {
    'use server';
    
    await connectDB();
    await Category.findByIdAndDelete(id);
    
    redirect('/admin/categories');
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Delete Category
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-navy-primary mb-2">
                {category.name}
              </h2>
              <p className="text-gray-dark">
                Slug: {category.slug}
              </p>
            </div>
            
            <p className="text-gray-dark mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            
            <div className="flex space-x-4">
              <form action={handleDelete}>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Category
                </button>
              </form>
              <a
                href="/admin/categories"
                className="px-6 py-2 border border-gray-medium rounded-lg font-medium hover:bg-gray-light transition-colors"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}