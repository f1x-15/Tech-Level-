import 'dotenv/config';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const password = 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);
  
  console.log('Admin User Details:');
  console.log('Email: farhanshahid973@gmail.com');
  console.log('Password: admin123');
  console.log('Password Hash:', passwordHash);
  console.log('\n');
  console.log('Insert this into MongoDB users collection:');
  console.log(JSON.stringify({
    name: 'Admin',
    email: 'farhanshahid973@gmail.com',
    passwordHash: passwordHash,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, null, 2));
}

createAdmin();