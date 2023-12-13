const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const moment = require("moment");

const val = process.env.API_USER;
const key = process.env.API_SECRET;
const date = moment().format("YYYY-MM-DD");
//Hashing function
const authString = btoa(`${val}:${key}`);

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('starchart')
        .setDescription('Returns the starchart for the day'),
    async execute(interaction) {
        // Acknowledge the interaction to avoid "InteractionNotReplied" error
        await interaction.deferReply();

        // Date formatting for the observer's date
        const date = new Date().toISOString();

        let starData = JSON.stringify({
            "observer": {
                "date": date,
                "latitude": 28.5966398,
                "longitude": -81.2048381
            },
            "style": "navy",
            "view": {
                "type": "area",
                "parameters": {
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
            data: starData
        };

        try {
            const response = await axios.request(starChart);
            const imageUrl = response.data.data.imageUrl;

            // Use interaction.followUp to reply and include the star chart data
            await interaction.followUp({ content: 'Star Chart for UCF tonight:', files: [imageUrl] });
        } catch (error) {
            console.error(error);
            // Handle the error and reply with an error message
            await interaction.followUp('Error fetching star chart data.');
        }
    },
};

