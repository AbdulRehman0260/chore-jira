import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

console.log('Environment Variables Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT SET');

if (process.env.EMAIL_USER) {
  console.log('EMAIL_USER value:', process.env.EMAIL_USER);
}

if (process.env.EMAIL_PASS) {
  console.log('EMAIL_PASS length:', process.env.EMAIL_PASS.length);
}
