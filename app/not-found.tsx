import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-dark mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}