const Lead = require('../model/leads')
const MailTemplate = require('../model/mailTemplate')

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
            res.status(500).json({ error: "Failed to add lead", details: error.message });
        }
    }, 
      getLeads: async (req, res) => {
        try {
          const leads = await Lead.find();
        //   console.log("Leads fetched:", leads); // Log the fetched leads
          res.status(200).json(leads);
        } catch (error) {
          console.error("Error fetching leads: ", error);
          res.status(500).json({ error: "Failed to fetch leads" });
        }
      },
      

    postMailTemplate: async (req,res)=>{
        try {
            const newMailTemplate = new MailTemplate(req.body);
            const savedMailTemplate = await newMailTemplate.save();
            res.status(201).json(savedMailTemplate);
            
        } catch (error) {
            res.status(500).json({error: "Failed to add mail template", })
        }
    },
    getMailTemplate: async (req,res)=>{
        try {
            const templates = await MailTemplate.find();
            res.status(200).json(templates);
            console.log(templates);
            
        } catch (error) {
            res.status(500).json({error: "failed to fetch mail templates"});
        }
    }

}