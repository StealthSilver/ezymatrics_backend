const express = require('express');
const router = express.Router();
const etlController = require('../controllers/etlController');
const reportService = require('../services/reportService');

// ETL route to fetch and store data into JSON files
router.get('/etl', etlController.fetchAndStoreData);

// Route to generate combined report (PDF + CSV)
router.get('/report/combined', reportService.generateCombinedReport);

module.exports = router;