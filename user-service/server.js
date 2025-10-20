// order-service/server.js
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/orders', (req, res) => {
  res.json([
    { id: 101, item: 'Laptop !!!!!!', userId: 1 },
    { id: 102, item: 'Mouse diwali', userId: 2 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Order service listening on port ${PORT}`);
});