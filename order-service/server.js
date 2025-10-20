// user-service/server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Umed' },
    { id: 2, name: 'Jogi' }
  ]);
});

app.listen(PORT, () => {
  console.log(`User service listening on port ${PORT}`);
});