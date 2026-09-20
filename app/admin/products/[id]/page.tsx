import AdminSidebar from '@/components/admin/AdminSidebar';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  await connectDB();
  
  const product = await Product.findById(id).populate('category').lean();
  
  if (!product) {
    return null;
  }
    
  return product;
}

async function getCategories() {
  await connectDB();
  
  const categories = await Category.find({ active: true })
    .sort({ name: 1 })
    .lean();
    
  return categories;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const categories = await getCategories();

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminSidebar />
      
      <main className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-primary mb-8">
            Edit Product
          </h1>
          
          <ProductForm categories={categories} product={product} />
        </div>
      </main>
    </div>
  );
}