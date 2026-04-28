import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to any email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send task assignment email
export const sendTaskAssignmentEmail = async (assigneeEmail, assigneeName, taskDetails, assignerName) => {
  try {
    const transporter = createTransporter();

    const formatCategory = (category) => {
      return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };

    const emailContent = {
      from: `"Kaam Chore" <${process.env.EMAIL_USER}>`,
      to: assigneeEmail,
      subject: `🏠 New Task Assigned: ${formatCategory(taskDetails.category)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #4f46e5; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🏠 Kaam Chore</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">New Task Assignment</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Hello ${assigneeName}! 👋</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              <strong>${assignerName}</strong> has assigned you a new task:
            </p>
            
            <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4f46e5;">
              <h3 style="margin: 0 0 10px 0; color: #4f46e5; font-size: 18px;">
                ${formatCategory(taskDetails.category)}
              </h3>
              ${taskDetails.description ? `
                <p style="margin: 0; color: #666; font-size: 14px;">
                  <strong>Description:</strong> ${taskDetails.description}
                </p>
              ` : ''}
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                <strong>Points:</strong> ${taskDetails.points || 2} ⭐
              </p>
              ${taskDetails.dueDate ? `
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                  <strong>Due Date:</strong> ${new Date(taskDetails.dueDate).toLocaleDateString()}
                </p>
              ` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
                 style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                View Your Tasks
              </a>
            </div>
            
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              This is an automated message from Kaam Chore. Please complete your task on time! 🎯
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(emailContent);
    console.log(`Task assignment email sent to ${assigneeEmail}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending task assignment email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailService = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email service is configured correctly');
    return { success: true };
  } catch (error) {
    console.error('Email service configuration error:', error);
    return { success: false, error: error.message };
  }
};
