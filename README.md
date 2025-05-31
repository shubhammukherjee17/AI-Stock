# AI Stock & Crypto Price Predictor

A full-stack web application that predicts stock and cryptocurrency price trends using machine learning models.

## Features

- Real-time stock and cryptocurrency price data fetching
- Multiple ML models (Prophet, LSTM, ARIMA) for price prediction
- Interactive price charts with actual vs. predicted values
- Modern, responsive UI built with React and Material-UI
- MongoDB integration for data persistence
- Python-based ML service with FastAPI

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-stock-predictor
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Install Python dependencies:
```bash
cd ml_service
pip install -r requirements.txt
cd ..
```

5. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/stock-predictor
PORT=5000
```

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start the Node.js backend:
```bash
npm run server
```

3. Start the Python ML service:
```bash
cd ml_service
uvicorn main:app --reload
```

4. Start the React frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- ML Service: http://localhost:8000

## Usage

1. Select whether you want to predict stock or cryptocurrency prices
2. Enter the symbol (e.g., AAPL for Apple stock or BTC for Bitcoin)
3. Choose a prediction model (Prophet, LSTM, or ARIMA)
4. Select the date range for historical data
5. Click "Predict" to see the forecast

## Project Structure

```
ai-stock-predictor/
├── backend/           # Node.js backend
├── frontend/          # React frontend
├── ml_service/        # Python ML service
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 