import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import CategoryForm from '@/components/admin/CategoryForm';

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

export default async function NewCategoryPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Add New Category
          </h1>
          
          <CategoryForm />
        </div>
      </main>
    </div>
  );
}