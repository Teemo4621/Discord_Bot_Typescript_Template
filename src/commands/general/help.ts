import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import type { Client } from 'discord.js'
import { readdirSync } from "fs";

import emoji from '../../components/emoji'
import { EmbedSuccess } from '../../components/embed'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('see all commands')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
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

        await interaction.editReply({
            embeds: [EmbedSuccess(`${commandsArray.map(data => `\`${data.name} | ${data.description}\``).join('\n')}`)],
        })
    }
}