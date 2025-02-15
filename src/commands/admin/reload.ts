import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import type { Client } from 'discord.js'
import { readdirSync } from "fs";

import emoji from '../../components/emoji'
import { EmbedSuccess } from '../../components/embed'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('reload all commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: CommandInteraction, client: Client) {
        await interaction.deferReply({ flags: 64 })

        let commandsArray = []
        
        const commandFolder = readdirSync(`${__dirname}/../`);
        for (const folder of commandFolder) {
            const commandFiles = readdirSync(`${__dirname}/../${folder}`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
            for (const file of commandFiles) {
                if (file.split(".").length == 2) {
                    if (file.endsWith(".ts") || file.endsWith(".js")) {
                        const commandFile = require(`${__dirname}/../${folder}/${file}`);
                        commandsArray.push(commandFile.data.toJSON());
                    }
                }
            }
        }

        if (client.application) {
            await client.application.commands.set(commandsArray);
            console.log("\x1b[34m[ SYNC ]\x1b[37m Successfully reloaded commands. ✅");
        }

        await interaction.editReply({
            embeds: [EmbedSuccess(`\`Reload Command Success\``)],
        })
    }
}