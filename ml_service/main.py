from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from prophet import Prophet
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
import joblib
import os
from datetime import datetime, timedelta

app = FastAPI()

class PredictionRequest(BaseModel):
    symbol: str
    start_date: str
    end_date: str
    model_type: str  # 'lstm', 'prophet', or 'arima'
    data_type: str  # 'stock' or 'crypto'

class PredictionResponse(BaseModel):
    dates: List[str]
    actual_prices: List[float]
    predicted_prices: List[float]
    confidence_intervals: Optional[List[dict]]

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # Load historical data (this would come from MongoDB in production)
        # For now, we'll use dummy data
        dates = pd.date_range(start=request.start_date, end=request.end_date)
        actual_prices = np.random.normal(100, 10, len(dates))  # Dummy data
        
        if request.model_type == 'prophet':
            # Prepare data for Prophet
            df = pd.DataFrame({
                'ds': dates,
                'y': actual_prices
            })
            
            # Train Prophet model
            model = Prophet()
            model.fit(df)
            
            # Make predictions
            future = model.make_future_dataframe(periods=30)
            forecast = model.predict(future)
            
            return PredictionResponse(
                dates=dates.strftime('%Y-%m-%d').tolist(),
                actual_prices=actual_prices.tolist(),
                predicted_prices=forecast['yhat'].tail(30).tolist(),
                confidence_intervals=[{
                    'lower': lower,
                    'upper': upper
                } for lower, upper in zip(
                    forecast['yhat_lower'].tail(30),
                    forecast['yhat_upper'].tail(30)
                )]
            )
            
        elif request.model_type == 'lstm':
            # Prepare data for LSTM
            # This is a simplified version - in production, you'd want more sophisticated preprocessing
            data = actual_prices.reshape(-1, 1)
            
            # Create and train LSTM model
            model = Sequential([
                LSTM(50, return_sequences=True, input_shape=(30, 1)),
                Dropout(0.2),
                LSTM(50, return_sequences=False),
                Dropout(0.2),
                Dense(1)
            ])
            
            model.compile(optimizer='adam', loss='mse')
            
            # Make predictions (simplified)
            predictions = np.random.normal(100, 5, 30)  # Dummy predictions
            
            return PredictionResponse(
                dates=dates.strftime('%Y-%m-%d').tolist(),
                actual_prices=actual_prices.tolist(),
                predicted_prices=predictions.tolist(),
                confidence_intervals=None
            )
            
        else:
            raise HTTPException(status_code=400, detail="Unsupported model type")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 