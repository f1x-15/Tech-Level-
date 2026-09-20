import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Link from 'next/link';

async function getCategories() {
  try {
    await connectDB();
    
    const categories = await Category.find()
      .sort({ name: 1 })
      .lean();
      
    return categories;
  } catch (error) {
    // Return empty array if DB not connected
    return [];
  }
}

export default async function AdminCategories() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-navy-primary">
              Categories
            </h1>
            <Link
              href="/admin/categories/new"
              className="px-4 py-2 bg-orange-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Add Category
            </Link>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-primary text-grey-dark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Description
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
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-dark">
                        No categories found. Add your first category to get started.
                      </td>
                    </tr>
                  ) : (
                    categories.map((category: any) => (
                      <tr key={category._id} className="hover:bg-gray-light">
                        <td className="px-6 py-4 font-medium text-navy-primary">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark">
                          {category.slug}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-dark max-w-xs truncate">
                          {category.description}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              category.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {category.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/categories/${category._id}`}
                              className="text-engineering-blue hover:text-orange-accent text-sm font-medium"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/admin/categories/${category._id}/delete`}
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