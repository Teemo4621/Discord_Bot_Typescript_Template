import { CommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import type { Client } from 'discord.js'

import emoji from '../../components/emoji'
import { EmbedSuccess } from '../../components/embed'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check ping of bots and users')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction: CommandInteraction, client: Client) {
        await interaction.deferReply({ flags: 64 })
        await interaction.editReply({
            embeds: [EmbedSuccess(`${emoji.loading} Latency is ${Date.now() - interaction.createdTimestamp} | API Latency is ${Math.round(client.ws.ping)}ms`, "🏓 Pong")],
        })
    }
}