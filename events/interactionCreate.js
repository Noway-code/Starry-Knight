const { Events, Collection} = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const { cooldowns } = interaction.client;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const remainingCooldown = Math.round((expirationTime - now)/1000);

                // Reply with the cooldown message
                const reply = await interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. Please wait ${remainingCooldown} seconds.`, ephemeral: true,});

                // Schedule the removal of the cooldown timestamp after the cooldown period
                setTimeout(() => {
                    timestamps.delete(interaction.user.id);
                    reply.delete().catch(console.error); // Delete the cooldown message
                }, cooldownAmount);

                return;
            }
        }

// If no cooldown or cooldown has expired, continue with the command execution

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
