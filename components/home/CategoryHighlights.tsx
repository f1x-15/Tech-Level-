import Link from 'next/link';

export default function CategoryHighlights() {
  const categories = [
    {
      name: 'Commercial Fryers',
      slug: 'commercial-fryers',
      description: 'Deep fryers and commercial frying equipment for restaurants and food businesses.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
    },
    {
      name: 'Pizza Ovens',
      slug: 'pizza-ovens',
      description: 'Commercial pizza ovens and pizza cooking equipment for pizzerias and restaurants.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: 'Cold Rooms',
      slug: 'cold-rooms',
      description: 'Cold storage and temperature-controlled solutions for commercial food businesses.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: 'Kitchen Equipment',
      slug: 'kitchen-equipment',
      description: 'Professional kitchen equipment for restaurants, hotels, cafes and commercial food businesses.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-primary mb-4">
            Product Categories
          </h2>
          <p className="text-gray-dark max-w-2xl mx-auto">
            Explore our comprehensive range of commercial kitchen equipment designed for professional food businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-accent transform hover:-translate-y-1"
            >
              <div className="text-orange-accent mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-navy-primary mb-2 group-hover:text-orange-accent transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-dark text-sm mb-4">
                {category.description}
              </p>
              <span className="text-engineering-blue text-sm font-medium group-hover:text-orange-accent transition-colors">
                View Products →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-gradient-to-r from-navy-primary to-navy-dark text-white rounded-xl font-medium hover:from-navy-dark hover:to-navy-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}