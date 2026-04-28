import dotenv from 'dotenv';
dotenv.config();

import { sendTaskAssignmentEmail } from "../services/emailService.js";

console.log('Testing actual email content that will be sent...');

const testEmail = async () => {
  const result = await sendTaskAssignmentEmail(
    'test@example.com',
    'Test User',
    {
      category: 'WASHING_DISHES',
      description: 'Test email content',
      points: 3,
      dueDate: new Date()
    },
    'Test Assigner'
  );
  
  console.log('Email result:', result);
};

testEmail().catch(console.error);
