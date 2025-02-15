import { ActivityType, Client, Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,

    execute(client: Client) {
        client.user.setActivity(`✨ ${client.user?.username} running 🚀`, { type: ActivityType.Watching });
    },
};