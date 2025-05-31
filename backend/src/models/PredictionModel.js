const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  modelType: { type: String, required: true },
  actualPrices: [{
    date: Date,
    price: Number
  }],
  predictedPrices: [{
    date: Date,
    price: Number
  }],
  accuracy: Number,
  createdAt: { type: Date, default: Date.now }
});