const express = require('express');
const router = express.Router();
const stockService = require('../services/stockService');

router.post('/predict', async (req, res) => {
  try {
    const { symbol, model_type, start_date, end_date } = req.body;

    if (!symbol || !model_type || !start_date || !end_date) {
      return res.status(400).json({
        message: 'Missing required parameters'
      });
    }

    // Get historical data
    const historicalData = await stockService.getHistoricalData(
      symbol,
      start_date,
      end_date
    );

    // Make predictions based on the selected model
    let predictions;
    if (model_type === 'prophet') {
      predictions = await stockService.predictWithProphet(historicalData);
    } else if (model_type === 'lstm') {
      predictions = await stockService.predictWithLSTM(historicalData);
    } else {
      return res.status(400).json({
        message: 'Invalid model type'
      });
    }

    res.json({
      historical_data: historicalData,
      predictions
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      message: error.message || 'Failed to generate predictions'
    });
  }
});

module.exports = router; 