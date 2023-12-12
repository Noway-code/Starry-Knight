const {SlashCommandBuilder} = require('discord.js'), axios = require('axios'),moment = require("moment");
require('dotenv').config();
const val = process.env.API_USER;
const key = process.env.API_SECRET;
const date = moment().format("YYYY-MM-DD");
//Hashing function
const authString = btoa(`${val}:${key}`);

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

let starChart = {
    method: 'post',
    url: 'https://api.astronomyapi.com/api/v2/studio/star-chart',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic+ ${authString}`
    },
    data : starData
};

let apiCallMade = false;

async function fetchStarChart(client, channelId) {
    if (!apiCallMade) {
        try {
            const response = await axios.request(starChart);
            const channel = await client.channels.fetch(channelId);
            channel.send(`Star Chart for UCF tonight: ${response.data.data.imageUrl}`);
            apiCallMade = true;
        } catch (error) {
            console.error(error);
            const channel = await client.channels.fetch(channelId);
            channel.send('Error fetching star chart: ' + error.message);
        }
    }
}

module.exports = fetchStarChart;



module.exports = fetchStarChart;