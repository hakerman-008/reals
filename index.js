const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/reels', async (req, res) => {
    const hashtag = req.query.hashtag;
    if (!hashtag) {
        return res.status(400).json({ error: 'Hashtag parameter is required' });
    }

    const options = {
        method: 'GET',
        url: 'https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag',
        params: { hashtag },
        headers: {
            'X-RapidAPI-Key': '0820ec24afmsh10d1bef860c3651p10e3f6jsn715a93754ace',
            'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const reels = response.data.data.items.filter(item => item.media_type === 2); 
        const videoURLs = reels.map(item => item.video_versions[item.video_versions.length - 1].url); 
        res.json({ videoURLs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
