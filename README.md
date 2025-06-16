# AI Stock Price Predictor

A modern web application that uses machine learning to predict stock prices. The application features a beautiful Material-UI interface and supports multiple prediction models including Prophet and LSTM.

## Features

- 📈 Real-time stock data fetching using yfinance
- 🤖 Multiple prediction models (Prophet and LSTM)
- 📊 Interactive charts with historical data and predictions
- 🎨 Modern Material-UI interface
- 📱 Responsive design for all devices
- 🔄 Real-time updates and predictions

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Chart.js
- Axios
- date-fns

### Backend
- Node.js
- Express.js
- Prophet (Facebook's time series forecasting)
- yfinance
- CORS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Python 3.7+ (for Prophet model)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-stock
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a stock symbol (e.g., AAPL, GOOGL, MSFT)
2. Select a prediction model:
   - Prophet: Uses Facebook's Prophet model for time series forecasting
   - LSTM: Uses a simple moving average (placeholder for LSTM implementation)
3. Choose a date range for historical data
4. Click "Get Predictions" to see the chart

## API Endpoints

### Predict Stock Prices
```
POST http://localhost:5000/predict
```

Request body:
```json
{
  "symbol": "AAPL",
  "model_type": "prophet",
  "start_date": "2024-02-20",
  "end_date": "2024-03-20"
}
```

Response:
```json
{
  "historical_data": {
    "dates": ["2024-02-20", "2024-02-21", ...],
    "prices": [150.25, 151.30, ...]
  },
  "predictions": {
    "dates": ["2024-03-21", "2024-03-22", ...],
    "prices": [155.25, 156.30, ...]
  }
}
```

## Project Structure

```
ai-stock/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.js
│   │   └── ...
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── predictions.js
│   ├── services/
│   │   └── stockService.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Improvements

- [ ] Implement proper LSTM model
- [ ] Add more prediction models
- [ ] Add user authentication
- [ ] Save prediction history
- [ ] Add more technical indicators
- [ ] Implement real-time updates
- [ ] Add export functionality for predictions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Facebook Prophet for the time series forecasting model
- yfinance for stock data
- Material-UI for the beautiful components
- Chart.js for the interactive charts 