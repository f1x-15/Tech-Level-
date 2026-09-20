import Link from 'next/link';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923214057902';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon.ico" 
                alt="Tech Level Engineering" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-bold text-lg leading-tight">
                  Tech Level
                </span>
                <span className="text-gray-300 text-xs block">Engineering</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Commercial kitchen equipment and engineering solutions.
              Professional fryers, pizza ovens, cold rooms, and expert technical services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/cold-rooms" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  Cold Rooms
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Equipment Repair</li>
              <li className="text-gray-300 text-sm">Preventive Maintenance</li>
              <li className="text-gray-300 text-sm">Installation Services</li>
              <li className="text-gray-300 text-sm">Cold Room Solutions</li>
              <li className="text-gray-300 text-sm">Technical Troubleshooting</li>
              <li className="text-gray-300 text-sm">Custom Kitchen Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-orange-accent mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-gray-300 text-sm">Phone / WhatsApp</p>
                  <a
                    href={`tel:03214057902`}
                    className="text-white hover:text-orange-accent transition-colors font-medium"
                  >
                    03214057902
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-orange-accent mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a
                    href="mailto:farhanshahid973@gmail.com"
                    className="text-white hover:text-orange-accent transition-colors font-medium text-sm"
                  >
                    farhanshahid973@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-orange-accent mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="text-gray-300 text-sm">WhatsApp</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-accent transition-colors font-medium"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Tech Level Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}