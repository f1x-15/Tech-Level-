import { redirect } from 'next/navigation';

export default function AdminLoginPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    
    // Temporarily disable auth for testing
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-navy-primary mb-2">
              Admin Login
            </h1>
            <p className="text-gray-dark">
              Tech Level Engineering
            </p>
            <p className="text-sm text-orange-accent mt-2">
              (Authentication temporarily disabled for testing)
            </p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-orange-accent focus:border-transparent"
                placeholder="•••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-orange-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Enter Admin Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-dark hover:text-orange-accent transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}