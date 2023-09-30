const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use(cors())

// Sample tariff data from the External Tariff Provider
const tariffs = [
  {"name": "Product A", "type": 1, "baseCost": 5, "additionalKwhCost": .22},
  {"name": "Product B", "type": 2, "includedKwh": 4000, "baseCost": 800, "additionalKwhCost": .30}
  // Add more tariff data here
];

app.get('/tariffs', (req, res) => {
  res.status(200).json(tariffs);
});

// Calculate tariffs based on user input
app.post('/calculate-tariffs', (req, res) => {
    try {
      const { consumption } = req.body;
  
      if (typeof consumption !== 'number' || isNaN(consumption) || consumption < 0) {
        throw new Error('Invalid consumption value');
      }
  
      const calculatedTariffs = tariffs.map(tariff => {
        if (tariff.type === 1) {
          const annualCost = tariff.baseCost * 12 + consumption * tariff.additionalKwhCost;
          return { name: tariff.name, annualCost };
        } else if (tariff.type === 2) {
          if (consumption <= tariff.includedKwh) {
            return { name: tariff.name, annualCost: tariff.baseCost };
          } else {
            const additionalConsumption = consumption - tariff.includedKwh;
            const annualCost = tariff.baseCost + additionalConsumption * tariff.additionalKwhCost;
            return { name: tariff.name, annualCost };
          }
        }
      });
  
      res.status(200).json(calculatedTariffs);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ error: 'Invalid request data' });
    }
  });
  
  // Handle uncaught errors globally
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });