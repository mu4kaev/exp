const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.YOUTUBE_API_KEY;

app.get('/search', async (req, res) => {
  const query = req.query.q || 'public speaking';

  try {
    const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 5,
        key: API_KEY
      }
    });

    res.json(ytRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`YouTube proxy running on port ${port}`));
