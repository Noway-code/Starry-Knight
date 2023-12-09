const axios = require('axios');
require('dotenv').config();
const moment = require("moment");

const val = process.env.API_USER;
const key = process.env.API_SECRET;
const date = moment().format("YYYY-MM-DD");
//Hashing function
const authString = btoa(`${val}:${key}`);
//write
// Body Content
let starData = JSON.stringify({
    "observer": {
        "date": date,
        "latitude": 28.5966398,
        "longitude": -81.2048381
    },
    "style": "navy",
    "view": {
        "type":"area",
        "parameters":{
            "position": {
                "equatorial": {
                    "rightAscension": 14.83,
                    "declination": -15.23
                }
            },
            "zoom": 3
        }
    }
});

let moonData = JSON.stringify({
    "format": "png",
    "style": {
        "moonStyle": "default",
        "backgroundStyle": "stars",
        "backgroundColor": "red",
        "headingColor": "white",
        "textColor": "white"
    },
    "observer": {
        "latitude": 28.5966398,
        "longitude": -81.2048381,
        "date": date
    },
    "view": {
        "type": "portrait-simple",
        "orientation": "south-up"
    }
});

// Full request command
let starChart = {
    method: 'post',
    url: 'https://api.astronomyapi.com/api/v2/studio/star-chart',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic+ ${authString}`
    },
    data : starData
};

let moonPhase = {
    method: 'post',
    url: 'https://api.astronomyapi.com/api/v2/studio/moon-phase',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic+ ${authString}`
    },
    data: moonData
}

//API Call and logging
axios.request(starChart)
    .then((response) => {
        console.log('starChart: ' +JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });

axios.request(moonPhase)
    .then((response) => {
        console.log('Moon: ' + JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });