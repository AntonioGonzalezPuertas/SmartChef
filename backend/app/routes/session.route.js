const sessionController = require('../controllers/session.controller');
const express = require('express');
const router = express.Router();

router.post('/', sessionController.findByEmail);

router.post('/online', sessionController.findOnline);

router.post('/offline', sessionController.findOffline);

module.exports = router;