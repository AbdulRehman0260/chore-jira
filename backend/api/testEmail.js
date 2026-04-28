import { testEmailService, sendTaskAssignmentEmail } from "../services/emailService.js";

// Test email configuration
const testEmail = async () => {
  console.log('Testing email service configuration...');
  
  // Test 1: Check if email service is configured
  const configTest = await testEmailService();
  console.log('Email service config test:', configTest);
  
  // Test 2: Send a test email
  const emailTest = await sendTaskAssignmentEmail(
    'test@example.com',
    'Test User',
    {
      category: 'WASHING_DISHES',
      description: 'Test email from chore management',
      points: 3,
      dueDate: new Date()
    },
    'Test Assigner'
  );
  
  console.log('Email send test:', emailTest);
};

testEmail().catch(console.error);
