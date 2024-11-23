// const express = require('express');
// const router = express.Router();
// const Agenda = require('agenda');
// const nodemailer = require('nodemailer');

// // MongoDB URI for Agenda
// const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

// // Define the email-sending job
// agenda.define('send email', async (job) => {
//   const { to, subject, body } = job.attrs.data;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // Or your email provider
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text: body,
//   };

//   await transporter.sendMail(mailOptions);
// });

// // API endpoint to schedule emails
// router.post('/schedule', async (req, res) => {
//   const { to, subject, body, sendAt } = req.body;

//   try {
//     await agenda.start();
//     await agenda.schedule(sendAt, 'send email', { to, subject, body });
//     res.status(200).send({ message: 'Email scheduled successfully' });
//   } catch (err) {
//     console.error('Error scheduling email:', err);
//     res.status(500).send({ error: 'Failed to schedule email' });
//   }
// });

// module.exports = router;
