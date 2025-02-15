import { EmbedBuilder } from "discord.js";

export const EmbedSuccess = (message: string, title?: string) =>
    new EmbedBuilder()
        .setColor("Green")
        .setTitle(title || "✅ Success")
        .setDescription(message)
        .setTimestamp();

export const EmbedError = (message: string) =>
    new EmbedBuilder()
        .setColor("Red")
        .setTitle("❌ Error")
        .setDescription(message)
        .setTimestamp();

export const EmbedInfo = (message: string) =>
    new EmbedBuilder()
        .setColor("Blue")
        .setTitle("❓ Info")
        .setDescription(message)
        .setTimestamp();
