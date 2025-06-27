const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const API_KEY = '586c7181891f4332fb7b1b41319061b6';
const BASE = 'https://api.speedyindex.com/v2/task/google/indexer';

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // serve frontend

const proxyRoutes = [
  { path: '/submit', url: `${BASE}/create` },
  { path: '/status', url: `${BASE}/status` },
  { path: '/report', url: `${BASE}/report` },
  { path: '/vip', url: `${BASE}/vip` },
];

proxyRoutes.forEach(r => {
  app.post(`/api${r.path}`, async (req, res) => {
    try {
      const resp = await fetch(r.url, {
        method: 'POST',
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
      const data = await resp.json();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
