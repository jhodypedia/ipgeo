const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/lookup', async (req, res) => {
  const ip = req.body.ip;
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    if (response.data.status === 'fail') {
      return res.json({ success: false, message: response.data.message });
    }
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.json({ success: false, message: 'Gagal melacak IP', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
