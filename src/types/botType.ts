import type { Client, CommandInteraction } from "discord.js";

export interface BotCommand {
    name: string;
    execute: (interaction: CommandInteraction, client: Client) => void;
}