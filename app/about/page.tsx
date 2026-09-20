import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      title: 'Engineering Excellence',
      description: 'We bring technical expertise and engineering precision to every commercial kitchen equipment solution.',
    },
    {
      title: 'Quality Equipment',
      description: 'We supply commercial-grade equipment that meets the highest standards of durability and performance.',
    },
    {
      title: 'Professional Service',
      description: 'Our team provides expert installation, repair, and maintenance services with a customer-focused approach.',
    },
    {
      title: 'Reliable Support',
      description: 'We stand behind our equipment and services with comprehensive support and technical assistance.',
    },
  ];

  const services = [
    'Commercial Fryers',
    'Pizza Ovens',
    'Cold Rooms',
    'Kitchen Equipment',
    'Installation Services',
    'Repair & Maintenance',
    'Technical Solutions',
    'Custom Projects',
  ];

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-navy-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Tech Level Engineering</h1>
          <p className="text-gray-200 max-w-2xl">
            Your trusted partner for commercial kitchen equipment and engineering solutions in Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-navy-primary mb-4">
            Who We Are
          </h2>
          <p className="text-gray-dark mb-4">
            Tech Level Engineering is a professional commercial kitchen equipment and engineering company serving businesses across Pakistan. We specialize in providing high-quality commercial kitchen equipment along with expert installation, repair, and maintenance services.
          </p>
          <p className="text-gray-dark">
            Our focus is on delivering reliable equipment solutions that meet the demanding needs of restaurants, hotels, cafes, and food businesses. With engineering expertise and technical knowledge, we ensure that our clients receive equipment that performs consistently and efficiently.
          </p>
        </div>

        {/* What We Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy-primary mb-6 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm text-center"
              >
                <span className="text-navy-primary font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-navy-primary mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-navy-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-dark text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Expertise */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-navy-primary mb-6 text-center">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-navy-primary mb-3">
                Equipment Supply
              </h3>
              <p className="text-gray-dark">
                We supply a comprehensive range of commercial kitchen equipment including commercial fryers, pizza ovens, cold rooms, and various kitchen equipment for restaurants, hotels, and food businesses.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-primary mb-3">
                Installation Services
              </h3>
              <p className="text-gray-dark">
                Our professional installation services ensure that your equipment is set up correctly, safely, and optimally for maximum performance and longevity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-primary mb-3">
                Repair & Maintenance
              </h3>
              <p className="text-gray-dark">
                We provide expert repair and maintenance services to keep your commercial kitchen equipment running smoothly and efficiently, minimizing downtime.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-primary mb-3">
                Technical Solutions
              </h3>
              <p className="text-gray-dark">
                Our engineering team offers technical consultation and custom solutions for commercial kitchen setups, equipment planning, and system optimization.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-navy-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Work With Us
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Whether you need new equipment, installation services, or maintenance support, we're here to help. Contact us today to discuss your commercial kitchen equipment needs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-orange-accent text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}