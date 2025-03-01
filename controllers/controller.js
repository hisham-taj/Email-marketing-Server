const Lead = require("../model/leads");
const MailTemplate = require("../model/mailTemplate");
const agenda = require("../jobs/agenda");
const sendEmail = require("../utils/mailer");

module.exports = controllers = {
  postLeads: async (req, res) => {
    try {
      const { name, email } = req.body;

      console.log("Incoming lead data:", req.body); // Log the incoming request

      // Check if required fields are provided
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const newLead = new Lead(req.body);
      const savedLead = await newLead.save();
      console.log("Lead saved:", savedLead); // Log the saved lead

      res.status(201).json(savedLead);
    } catch (error) {
      console.error("Error adding lead: ", error);
      res
        .status(500)
        .json({ error: "Failed to add lead", details: error.message });
    }
  },

  getLeads: async (req, res) => {
    try {
      const leads = await Lead.find();
      res.status(200).json(leads);
    } catch (error) {
      console.error("Error fetching leads: ", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  },

  postMailTemplate: async (req, res) => {
    try {
      const newMailTemplate = new MailTemplate(req.body);
      const savedMailTemplate = await newMailTemplate.save();
      res.status(201).json(savedMailTemplate);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to add mail template", details: error.message });
    }
  },

  getMailTemplate: async (req, res) => {
    try {
      const templates = await MailTemplate.find();
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mail templates" });
    }
  },

  sendEmail: async (req, res) => {
    try {
      const { to, subject, body, scheduleTime } = req.body;
  
      // Validate the input
      if (!to || !subject || !body) {
        return res.status(400).json({ error: "to, subject, and body are required" });
      }
  
      // If `scheduleTime` is provided, schedule the email
      if (scheduleTime) {
        console.log(`Scheduling email to ${to} at ${scheduleTime}`);
        await agenda.schedule(scheduleTime, "send email", { to, subject, body });
        return res.status(200).json({
          message: `Email scheduled to ${to} at ${scheduleTime}`,
        });
      }
  
      // If no `scheduleTime` is provided, send the email immediately
      console.log(`Sending email to ${to} immediately`);
      const emailResponse = await sendEmail(to, subject, body);
  
      res.status(200).json({
        message: "Email sent successfully!",
        emailResponse,
      });
    } catch (error) {
      console.error("Error handling email:", error);
      res.status(500).json({
        error: "Failed to handle email",
        details: error.message,
      });
    }
  }
  
};
