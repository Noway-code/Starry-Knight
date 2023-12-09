const axios = require('axios');
require('dotenv').config();
 const val = process.env.API_USER;
 const key = process.env.API_SECRET;

const authString = btoa(`${val}:${key}`);

let data = JSON.stringify({
    "observer": {
        "date": "2022-02-01",
        "latitude": 28.5966398,
        "longitude": -81.2048381
    },
    "style": "navy",
    "view": {
        "parameters": {
            "constellation": "ari"
        },
        "type": "constellation"
    }
});

let config = {
    method: 'post',
    url: 'https://api.astronomyapi.com/api/v2/studio/star-chart',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic+ ${authString}`
    },
    data : data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
