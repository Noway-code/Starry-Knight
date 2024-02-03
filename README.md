# UCF Astronomy Discord Bot

### 🛠️ This project is on temporary hiatus, check out my [github](https://github.com/Noway-code/) to see what i'm working on now.
- This project was fun so I do still want to return later on and add more functionality.

## Overview

The unofficial UCF Astronomy Discord Bot is a simple Discord bot built with Discord.js that provides daily updates on constellations and the moon phase above the University of Central Florida (UCF) campus. Users can easily request star charts and moon phases by using convenient slash commands.

## Features

- Daily updates on constellations and moon phases above UCF campus
- Slash commands for requesting star charts and moon phases
- Easy setup with Astrology API integration

## Setup

1. **Create an Account on Astrology API:**
    - Go to the [Astrology API](https://astronomyapi.com/) website.
    - Create an account and log in.

2. **Create an Application:**
    - After logging in, create a new application on the Astrology API platform.
    - Once your application is created, obtain the API User and API Secret keys.

3. **Create a Discord Bot:**
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Create a new application.
   - Go to the `Bot` tab and create a new bot.
   - Copy the bot token and save it for later.

4. **Set Up .env File:**
   - Create a new file named `.env` in the root directory of your project.
   - Add the following lines to the `.env` file:

     ```env
     API_USER=your_api_user_key
     API_SECRET=your_api_secret_key
     DISCORD_TOKEN=generated_discord_bot_token
     CLIENT_ID=oauth2_client_id
     GUILD_ID=discord_server_id
     DISCORD_CHANNEL_ID=your_channel_id
     ```

5. **Install Dependencies:**
    - Run `npm install` to install the required dependencies.

6. **Run the Bot:**
    - Start the bot by running `node bot.js` or your preferred start script.

7. **Invite the Bot to Your Discord Server:**
    - Generate an OAuth2 URL with the `bot` scope and invite the bot to your server.

## Usage

- Once the bot is added to your server, you can use slash commands to get daily updates and request star charts and moon phases.

   ```plaintext
   /moonphase
   /starchart
   /settings
   ```

## Contributions

Contributions to the UCF Astronomy Discord Bot are welcome! Feel free to open issues or pull requests.
