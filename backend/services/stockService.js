const yfinance = require('yfinance');
const { Prophet } = require('prophet');

class StockService {
  async getHistoricalData(symbol, startDate, endDate) {
    try {
      const data = await yfinance.historical(symbol, {
        start: startDate,
        end: endDate,
        interval: '1d'
      });

      return {
        dates: data.map(item => item.date.toISOString().split('T')[0]),
        prices: data.map(item => item.close)
      };
    } catch (error) {
      throw new Error(`Failed to fetch historical data: ${error.message}`);
    }
  }

  async predictWithProphet(historicalData, daysToPredict = 30) {
    try {
      const prophet = new Prophet({
        yearly_seasonality: true,
        weekly_seasonality: true,
        daily_seasonality: true
      });

      // Prepare data for Prophet
      const prophetData = historicalData.dates.map((date, index) => ({
        ds: new Date(date),
        y: historicalData.prices[index]
      }));

      // Fit the model
      await prophet.fit(prophetData);

      // Make future predictions
      const future = prophet.make_future_dataframe(daysToPredict);
      const forecast = await prophet.predict(future);

      // Extract predictions
      const predictions = {
        dates: forecast.slice(-daysToPredict).map(row => 
          new Date(row.ds).toISOString().split('T')[0]
        ),
        prices: forecast.slice(-daysToPredict).map(row => row.yhat)
      };

      return predictions;
    } catch (error) {
      throw new Error(`Prediction failed: ${error.message}`);
    }
  }

  async predictWithLSTM(historicalData, daysToPredict = 30) {
    // For now, we'll use a simple moving average as a placeholder
    // In a real implementation, you would use a proper LSTM model
    const prices = historicalData.prices;
    const lastPrice = prices[prices.length - 1];
    const avgChange = prices.slice(-5).reduce((acc, price, i, arr) => {
      if (i === 0) return acc;
      return acc + (price - arr[i - 1]) / arr[i - 1];
    }, 0) / 4;

    const predictions = {
      dates: Array.from({ length: daysToPredict }, (_, i) => {
        const date = new Date(historicalData.dates[historicalData.dates.length - 1]);
        date.setDate(date.getDate() + i + 1);
        return date.toISOString().split('T')[0];
      }),
      prices: Array.from({ length: daysToPredict }, (_, i) => {
        return lastPrice * Math.pow(1 + avgChange, i + 1);
      })
    };

    return predictions;
  }
}

module.exports = new StockService(); 