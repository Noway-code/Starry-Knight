require('dotenv').config();
const axios = require('axios');

/* The fs
module is Node's native file system module. fs is used to read the commands directory and identify our command files.
The path
module is Node's native path utility module. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
The Collection
class extends JavaScript's native Map class, and includes more extensive, useful functionality. Collection is used to store and efficiently retrieve commands for execution.

 */
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const moment = require("moment");
const schedule = require('node-schedule');
const token = process.env.DISCORD_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID;

// Create a new client instance
let userSetTime = "00:04";


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Command Handler
client.commands = new Collection();

client.cooldowns = new Collection();
const foldersPath = path.join(__dirname, 'commands');

const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

}
// Connects to event handler
const eventsPath = path.join(__dirname, 'events');

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }

}
// Log in to Discord with your client's token

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    scheduleDaily();
});

function scheduleDaily() {
    // Schedule the job to run every day at the specified time
    schedule.scheduleJob(`0 ${userSetTime.split(':')[1]} ${userSetTime.split(':')[0]} * * *`, () => {
        const dailyStars = require('./automated/dailyStars');
        dailyStars(client, channelId);
    });

}

client.login(token);
