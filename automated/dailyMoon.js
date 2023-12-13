const {SlashCommandBuilder, MessageAttachment} = require('discord.js'), axios = require('axios'),moment = require("moment");
require('dotenv').config();
const val = process.env.API_USER;
const key = process.env.API_SECRET;
const date = moment().format("YYYY-MM-DD");
//Hashing function
const authString = btoa(`${val}:${key}`);

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

let moonPhase = {
    method: 'post',
    url: 'https://api.astronomyapi.com/api/v2/studio/moon-phase',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic+ ${authString}`
    },
    data: moonData
};

let apiCallMade = false;
// Could be improved with DRY principle cause there's 4 different API calls depending on situation
// but this functions well so im good with it.
async function fetchStarChart(client, channelId) {
    if (!apiCallMade) {
        try {
            const response = await axios.request(moonPhase);
            const channel = await client.channels.fetch(channelId);

            // Send the image directly using the 'file' option
            channel.send({ content: 'Moon Phases for UCF tonight:', files: [response.data.data.imageUrl] });

            apiCallMade = true;
        } catch (error) {
            console.error(error);
            const channel = await client.channels.fetch(channelId);
            channel.send('Error fetching moon chart: ' + error.message);
        }
    }
}
module.exports = fetchStarChart;

