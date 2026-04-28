import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

console.log('Testing with current credentials:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('Verification failed:', error);
  } else {
    console.log('Server is ready to take our messages');
    
    // Try to send a test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'Test Email from Chore Management',
      text: 'This is a test email to verify the email service is working.'
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Email send failed:', error);
      } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
      }
    });
  }
});
