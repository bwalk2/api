const express = require('express');
const cors = require('cors');
const api = express();
api.use(cors());
const fetch = require('node-fetch');
const convert = require('xml-js');
const RSS_URL = 'https://news.google.com/rss?hl=en-US&amp;gl=US&amp;ceid=US:en&amp;x=1571747254.2933&gl=US&ceid=US:en';
api.listen(8081, () => {
    console.log('API running');
});

api.get('/', async (req, res) => {
    let filtered;
    let updatedList = [];
    await fetch(RSS_URL).then(res => res.text()).then(body => filtered = convert.xml2js(body, {compact: true}));
    if(req.query.searchTerm) {
        for (const item of filtered.rss.channel.item) {
            let re = new RegExp(req.query.searchTerm, 'i');
            if(item.description._text.match(re) || item.title._text.match(re)){
                updatedList.push(item);
            }
        }
        filtered.rss.channel.item = updatedList;
    }
    res.send(filtered);
});