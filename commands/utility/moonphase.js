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
    cooldown: 500,
    data: new SlashCommandBuilder()
        .setName('moonphase')
        .setDescription('Returns the moonphase for the day'),
    async execute(interaction) {
        // Acknowledge the interaction to avoid "InteractionNotReplied" error
        await interaction.deferReply();

        // Date formatting for the observer's date
        const date = new Date().toISOString();

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

        try {
            const response = await axios.request(moonPhase);
            const imageUrl = response.data.data.imageUrl;

            // Use interaction.followUp to reply and include the star chart data
            await interaction.followUp({ content: 'Moon Phase for UCF tonight:', files: [imageUrl] });
        } catch (error) {
            console.error(error);
            // Handle the error and reply with an error message
            await interaction.followUp('Error fetching star chart data.');
        }
    },
};

