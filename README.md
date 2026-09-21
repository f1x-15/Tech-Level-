# Tech Level Engineering Website

A complete, production-ready Next.js website for Tech Level Engineering - a commercial kitchen equipment and engineering company based in Pakistan.

<!-- Build fix applied -->

## Features

- **Public Website**
  - Responsive homepage with hero, trust section, and category highlights
  - Product catalog with search, filtering, and pagination
  - Dynamic product detail pages with image galleries
  - Services pages for repair, maintenance, and installation
  - Cold rooms dedicated page
  - About us and contact pages
  - WhatsApp integration with floating button
  - Quote request system

- **Admin Dashboard**
  - Secure authentication with NextAuth
  - Product management (CRUD operations)
  - Category management (CRUD operations)
  - Quote request management
  - Contact message management
  - Orders overview
  - Settings page

- **Technical Features**
  - MongoDB database with Mongoose
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Zod validation
  - SEO optimization (metadata, sitemap, robots.txt)
  - Pakistani payment gateway architecture (JazzCash, Easypaisa, Bank Transfer)
  - Form validation and error handling
  - Custom 404 and error pages

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Validation**: Zod
- **Forms**: React Hook Form
- **Payment**: Custom architecture for Pakistani gateways

## Installation

### Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-level-engineering
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/tech-level-engineering
   MONGODB_DB=tech-level-engineering

   # NextAuth Configuration
   AUTH_SECRET=your-auth-secret-here-generate-with-openssl-rand-base64-32
   NEXTAUTH_URL=http://localhost:3000

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://www.techlevelengineering.store
   NEXT_PUBLIC_WHATSAPP_NUMBER=923214057902

   # Image Storage Configuration (optional)
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=

   # Payment Gateway Configuration (optional)
   JAZZCASH_MERCHANT_ID=
   JAZZCASH_PASSWORD=
   JAZZCASH_API_SECRET=

   EASYPAISA_MERCHANT_ID=
   EASYPAISA_PASSWORD=
   EASYPAISA_API_SECRET=

   BANK_NAME=
   BANK_ACCOUNT_NUMBER=
   BANK_ACCOUNT_TITLE=
   BANK_IBAN=

   # Email Configuration (optional)
   RESEND_API_KEY=
   SMTP_HOST=
   SMTP_PORT=
   SMTP_USER=
   SMTP_PASSWORD=
   EMAIL_FROM=

   # Development
   NODE_ENV=development
   ```

   Generate AUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

4. **Seed the Database**
   
   Run the seed script to create initial data:
   ```bash
   npm run seed
   ```

   This will create:
   - Admin user (email: farhanshahid973@gmail.com, password: admin123)
   - Sample categories
   - Sample products

   **Important**: Change the admin password after first login!

## Development

### Start Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

### Access Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with credentials:
   - Email: farhanshahid973@gmail.com
   - Password: admin123
3. Access dashboard at `http://localhost:3000/admin`

## Production Build

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## MongoDB Setup

### Local MongoDB

1. Install MongoDB from [mongodb.com](https://www.mongodb.com)
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tech-level-engineering
   ```

### MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add IP whitelist (0.0.0.0/0 for development)
4. Get connection string
5. Update `MONGODB_URI` in `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tech-level-engineering
   ```

## Admin Management

### Create Admin User

The seed script creates a default admin user. To create additional admins:

1. Access MongoDB directly or through MongoDB Compass
2. Add a new user to the `users` collection:
   ```json
   {
     "name": "Admin Name",
     "email": "admin@example.com",
     "passwordHash": "<hashed password>",
     "role": "admin"
   }
   ```

### Change Admin Password

1. Access MongoDB directly
2. Find the user and update `passwordHash` with a new bcrypt hash
3. Or use the admin panel to manage users (future feature)

## Image Storage

The project supports multiple image storage providers:

### Cloudinary (Recommended)

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Add credentials to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### UploadThing

1. Create account at [uploadthing.com](https://uploadthing.com)
2. Add credentials to `.env`:
   ```env
   UPLOADTHING_SECRET=your-secret
   UPLOADTHING_APP_ID=your-app-id
   ```

### Vercel Blob

1. Create storage account
2. Add credentials to `.env`:
   ```env
   BLOB_READ_WRITE_TOKEN=your-token
   ```

## Payment Gateway Configuration

### JazzCash

1. Create merchant account at [jazzcash.com](https://jazzcash.com)
2. Add credentials to `.env`:
   ```env
   JAZZCASH_MERCHANT_ID=your-merchant-id
   JAZZCASH_PASSWORD=your-password
   JAZZCASH_API_SECRET=your-api-secret
   ```

### Easypaisa

1. Create merchant account at [easypaisa.com](https://easypaisa.com)
2. Add credentials to `.env`:
   ```env
   EASYPAISA_MERCHANT_ID=your-merchant-id
   EASYPAISA_PASSWORD=your-password
   EASYPAISA_API_SECRET=your-api-secret
   ```

### Bank Transfer

Configure bank details in `.env`:
```env
BANK_NAME=Your Bank Name
BANK_ACCOUNT_NUMBER=Your Account Number
BANK_ACCOUNT_TITLE=Account Title
BANK_IBAN=Your IBAN
```

## Vercel Deployment

### Deploy to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up and create a new project

2. **Connect Repository**
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables**
   - Add all variables from `.env.example` to Vercel project settings
   - Make sure to update production values (MongoDB URI, Auth Secret, etc.)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Configure Domain**
   - Go to project settings
   - Add domain: `techlevelengineering.store`
   - Configure DNS settings as provided by Vercel
   - Add `www.techlevelengineering.store` as well

### Domain Configuration

1. **DNS Settings**
   - Go to your domain registrar
   - Add CNAME record pointing to Vercel
   - For root domain, use A records as provided by Vercel

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Your site will be accessible via HTTPS

## Project Structure

```
tech-level-engineering/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── services/          # Services page
│   ├── cold-rooms/        # Cold rooms page
│   ├── repair-maintenance/ # Repair page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # SEO robots.txt
│   ├── sitemap.ts         # SEO sitemap
│   ├── not-found.tsx      # 404 page
│   └── error.tsx          # Error page
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── forms/             # Form components
│   ├── home/              # Homepage components
│   ├── navigation/       # Navbar
│   ├── footer/            # Footer
│   └── ui/                # UI components
├── lib/                   # Utility functions
│   ├── mongodb.ts         # MongoDB connection
│   ├── auth.ts            # NextAuth configuration
│   ├── auth.config.ts     # Auth configuration
│   └── payments/          # Payment gateways
├── models/                # Mongoose models
│   ├── Product.ts
│   ├── Category.ts
│   ├── QuoteRequest.ts
│   ├── ContactMessage.ts
│   ├── User.ts
│   └── Order.ts
├── validations/           # Zod schemas
│   ├── product.ts
│   ├── category.ts
│   ├── quote.ts
│   └── contact.ts
├── scripts/               # Utility scripts
│   └── seed.ts            # Database seed script
├── types/                 # TypeScript types
│   └── next-auth.d.ts     # NextAuth types
├── public/                # Static assets
├── .env.example           # Environment variables template
├── middleware.ts          # NextAuth middleware
├── package.json
├── tsconfig.json
└── next.config.ts
```

## API Routes

### Public APIs
- `GET/POST /api/products` - Product listing and creation
- `GET/PUT/DELETE /api/products/[id]` - Single product operations
- `GET/POST /api/categories` - Category listing and creation
- `GET/PUT/DELETE /api/categories/[id]` - Single category operations
- `POST /api/quotes` - Submit quote request
- `POST /api/contact` - Submit contact message

### Admin APIs (Protected)
- Admin APIs are protected by NextAuth authentication
- All admin operations require valid session

## Database Models

### Product
- name, slug, sku, category
- shortDescription, description
- price, priceVisible
- images, specifications, features
- availability, featured, status

### Category
- name, slug, description, image
- active status

### QuoteRequest
- name, company, phone, email
- productId, productName, quantity
- message, status

### ContactMessage
- name, phone, email, subject
- message, status

### User
- name, email, passwordHash
- role (admin/staff)

### Order
- orderNumber, customer details
- items, totalAmount
- status, paymentMethod, paymentStatus

## SEO Optimization

- Dynamic metadata for all pages
- Sitemap.xml generation
- robots.txt configuration
- Open Graph tags
- Twitter cards
- Canonical URLs
- Structured data ready for implementation

## Security Features

- NextAuth authentication
- Password hashing with bcrypt
- Protected admin routes
- Server-side validation with Zod
- MongoDB query safety
- Environment variable protection
- Rate limiting ready for implementation

## Customization

### Colors and Theme

Edit `app/globals.css` to customize:
- Color palette
- Typography
- Spacing
- Animations

### Components

Components are modular and can be customized:
- `components/navigation/Navbar.tsx` - Navigation
- `components/footer/Footer.tsx` - Footer
- `components/home/` - Homepage components
- `components/forms/` - Form components

## Performance Optimization

- Server Components where appropriate
- Image optimization with Next.js Image component
- Dynamic imports for heavy components
- Database query optimization with indexes
- Caching strategies where applicable

## Troubleshooting

### MongoDB Connection Issues

1. Check MongoDB is running
2. Verify MONGODB_URI in `.env`
3. Check network connectivity
4. Ensure MongoDB user has correct permissions

### Build Errors

1. Clear Next.js cache: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run build`
4. Verify all environment variables are set

### Authentication Issues

1. Verify AUTH_SECRET is set
2. Check NEXTAUTH_URL matches your domain
3. Ensure MongoDB connection is working
4. Check user credentials in database

## Support

For support and issues:
- Email: farhanshahid973@gmail.com
- Phone/WhatsApp: 03214057902
- Website: https://www.techlevelengineering.store

## License

© Tech Level Engineering. All rights reserved.

## Credits

Built with Next.js, MongoDB, Tailwind CSS, and NextAuth.