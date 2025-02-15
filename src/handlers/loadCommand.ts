import type { Client } from "discord.js";
import { readdirSync } from "fs";
import { commands } from "../constants";

const loadCommand = async (client: Client) => {
    let commandsArray = [];

    const commandFolder = readdirSync(`${__dirname}/../commands`);
    for (const folder of commandFolder) {
        const commandFiles = readdirSync(`${__dirname}/../commands/${folder}`).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        for (const file of commandFiles) {
            if (file.split(".").length == 2) { 
                if (file.endsWith(".ts") || file.endsWith(".js")) {
                    const commandFile = require(`${__dirname}/../commands/${folder}/${file}`);
    
                    const prop = { folder, ...commandFile };
                    commands.set(commandFile.data.name, prop);
                    commandsArray.push(commandFile.data.toJSON());
    
                    console.log("\x1b[32m[ COMMAND ]\x1b[37m", file, "\x1b[32m✔︎");
                }
            }
        }
    }

    if (client.application) {
        await client.application.commands.set(commandsArray);
        console.log("\x1b[34m[ SYNC ]\x1b[37m Successfully reloaded commands. ✅");
    }
};

export default loadCommand;
