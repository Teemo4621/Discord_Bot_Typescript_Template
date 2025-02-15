import type { Client } from "discord.js";
import { readdirSync } from "fs";

const loadEvent = (client: Client) => {
    const folders = readdirSync(`${__dirname}/../events`);
    for (const folder of folders) {
        const files = readdirSync(`${__dirname}/../events/${folder}`).filter(
            (file) => file.endsWith(".ts") || file.endsWith(".js")
        );

        for (const file of files) {
            if (file.split(".").length == 2) {
                if (file.endsWith(".ts") || file.endsWith(".js")) {
                    const event = require(`${__dirname}/../events/${folder}/${file}`);
                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(...args, client));
                    } else {
                        client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    console.log("\x1b[32m[ EVENT ]\x1b[37m", file, "\x1b[32m", "✔︎");
                    continue;
                }
            }
        }
    }
};

export default loadEvent;
