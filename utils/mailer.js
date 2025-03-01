const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Nodemailer transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or use any other email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,  // Your email or app password
  },
});

// Define the sendEmail function
const sendEmail = async (to, subject, text) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to,                          // Recipient email
        subject,                     // Email subject
        text,                        // Email body
      };
  
      console.log('Mail options:', mailOptions); // Add this log to verify the mail options
  
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Propagate the error
    }
  };
  

module.exports = sendEmail;
