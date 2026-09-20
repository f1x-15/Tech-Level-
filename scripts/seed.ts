import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin',
      email: 'farhanshahid973@gmail.com',
      passwordHash,
      role: 'admin',
    });
    console.log('Created admin user');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Commercial Fryers',
        slug: 'commercial-fryers',
        description: 'Deep fryers and commercial frying equipment for restaurants and food businesses.',
        active: true,
      },
      {
        name: 'Pizza Ovens',
        slug: 'pizza-ovens',
        description: 'Commercial pizza ovens and pizza cooking equipment for pizzerias and restaurants.',
        active: true,
      },
      {
        name: 'Cold Rooms',
        slug: 'cold-rooms',
        description: 'Cold storage and temperature-controlled solutions for commercial food businesses.',
        active: true,
      },
      {
        name: 'Kitchen Equipment',
        slug: 'kitchen-equipment',
        description: 'Professional kitchen equipment for restaurants, hotels, cafes and commercial food businesses.',
        active: true,
      },
    ]);
    console.log('Created categories');

    // Create sample products
    const products = await Product.create([
      {
        name: 'Commercial Gas Fryer',
        slug: 'commercial-gas-fryer',
        sku: 'CF-001',
        category: categories[0]._id,
        shortDescription: 'High-capacity commercial gas fryer for restaurants and food businesses.',
        description: 'Professional-grade gas fryer designed for high-volume commercial kitchens. Features precise temperature control, large oil capacity, and durable stainless steel construction.',
        price: 150000,
        priceVisible: true,
        images: [],
        specifications: {
          'Capacity': '10L',
          'Power': '25,000 BTU',
          'Dimensions': '60x40x50cm',
          'Material': 'Stainless Steel',
        },
        features: [
          'High-efficiency gas burner',
          'Temperature control thermostat',
          'Stainless steel tank',
          'Safety valve system',
          'Easy to clean',
        ],
        availability: 'in-stock',
        featured: true,
        status: 'active',
      },
      {
        name: 'Electric Commercial Fryer',
        slug: 'electric-commercial-fryer',
        sku: 'CF-002',
        category: categories[0]._id,
        shortDescription: 'Energy-efficient electric commercial fryer with precise temperature control.',
        description: 'Commercial electric fryer with rapid heating and consistent temperature control. Perfect for establishments where gas is not available.',
        price: 120000,
        priceVisible: true,
        images: [],
        specifications: {
          'Capacity': '8L',
          'Power': '3000W',
          'Dimensions': '50x35x45cm',
          'Material': 'Stainless Steel',
        },
        features: [
          'Rapid heating element',
          'Digital temperature display',
          'Auto shut-off timer',
          'Cool zone technology',
          'Easy drain system',
        ],
        availability: 'in-stock',
        featured: false,
        status: 'active',
      },
      {
        name: 'Commercial Pizza Oven',
        slug: 'commercial-pizza-oven',
        sku: 'PO-001',
        category: categories[1]._id,
        shortDescription: 'Professional pizza oven for pizzerias and restaurants.',
        description: 'High-performance commercial pizza oven with even heat distribution and temperature control. Perfect for consistent pizza baking results.',
        price: 250000,
        priceVisible: true,
        images: [],
        specifications: {
          'Capacity': '4 pizzas',
          'Temperature Range': '100-500°C',
          'Dimensions': '80x60x50cm',
          'Power': '5000W',
        },
        features: [
          'Even heat distribution',
          'Temperature control',
          'Stainless steel chamber',
          'Refractory stone base',
          'Timer function',
        ],
        availability: 'in-stock',
        featured: true,
        status: 'active',
      },
      {
        name: 'Double Deck Pizza Oven',
        slug: 'double-deck-pizza-oven',
        sku: 'PO-002',
        category: categories[1]._id,
        shortDescription: 'Double deck pizza oven for high-volume pizza production.',
        description: 'Professional double deck pizza oven allowing simultaneous baking of multiple pizzas. Ideal for busy pizzerias and restaurants.',
        price: 350000,
        priceVisible: true,
        images: [],
        specifications: {
          'Capacity': '8 pizzas (4 per deck)',
          'Temperature Range': '100-500°C',
          'Dimensions': '100x80x60cm',
          'Power': '8000W',
        },
        features: [
          'Independent deck control',
          'Even heat distribution',
          'Stainless steel construction',
          'Timer for each deck',
          'Energy efficient',
        ],
        availability: 'in-stock',
        featured: false,
        status: 'active',
      },
      {
        name: 'Commercial Cold Room',
        slug: 'commercial-cold-room',
        sku: 'CR-001',
        category: categories[2]._id,
        shortDescription: 'Custom cold room solution for commercial food storage.',
        description: 'Professional cold room with precise temperature control for commercial food storage. Custom sizes available for different requirements.',
        price: 500000,
        priceVisible: false,
        images: [],
        specifications: {
          'Temperature Range': '-18°C to 4°C',
          'Capacity': 'Custom',
          'Insulation': 'PUF Panel',
          'Cooling System': 'Compressor',
        },
        features: [
          'Custom sizing available',
          'Precise temperature control',
          'Energy efficient',
          'Easy access doors',
          'Low maintenance',
        ],
        availability: 'made-to-order',
        featured: true,
        status: 'active',
      },
      {
        name: 'Stainless Steel Work Table',
        slug: 'stainless-steel-work-table',
        sku: 'KE-001',
        category: categories[3]._id,
        shortDescription: 'Durable stainless steel work table for commercial kitchens.',
        description: 'Heavy-duty stainless steel work table perfect for food preparation. Features undershelf for additional storage.',
        price: 45000,
        priceVisible: true,
        images: [],
        specifications: {
          'Dimensions': '120x60x85cm',
          'Material': '304 Stainless Steel',
          'Thickness': '1.2mm',
          'Weight Capacity': '200kg',
        },
        features: [
          '304 stainless steel',
          'Adjustable undershelf',
          'Reinforced top',
          'NSF certified',
          'Easy to clean',
        ],
        availability: 'in-stock',
        featured: false,
        status: 'active',
      },
    ]);
    console.log('Created sample products');

    console.log('Seed completed successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: farhanshahid973@gmail.com');
    console.log('Password: admin123');
    console.log('\nPlease change the admin password after first login.');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();