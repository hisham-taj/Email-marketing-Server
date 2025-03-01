const Agenda = require('agenda');
const sendEmail = require('../utils/mailer'); // Use Nodemailer from utils folder
require('dotenv').config();

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'agendaJobs' },
  processEvery: '1 minute',
});

// Define the job
agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;
  console.log(`Sending email to ${to}`);
  await sendEmail(to, subject, body); // Call the mailer utility
});

(async () => {
  await agenda.start();
  console.log('Agenda started!');
})();

module.exports = agenda;
