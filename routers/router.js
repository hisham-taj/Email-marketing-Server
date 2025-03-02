const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router
    .post('/leads', controller.postLeads)
    .post('/templates', controller.postMailTemplate)
    .post('/sendEmail', controller.sendEmail);  

router
    .get('/leads', controller.getLeads)
    .get('/templates', controller.getMailTemplate);

module.exports = router;
