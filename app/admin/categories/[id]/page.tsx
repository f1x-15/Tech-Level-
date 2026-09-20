import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import CategoryForm from '@/components/admin/CategoryForm';
import { notFound } from 'next/navigation';

async function getCategory(id: string) {
  try {
    await connectDB();
    
    const category = await Category.findById(id).lean();
    
    if (!category) {
      return null;
    }
      
    return category;
  } catch (error) {
    // Return null if DB not connected
    return null;
  }
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Edit Category
          </h1>
          
          <CategoryForm category={category} />
        </div>
      </main>
    </div>
  );
}