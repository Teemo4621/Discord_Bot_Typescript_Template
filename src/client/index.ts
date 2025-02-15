import { Client, Partials, GatewayIntentBits } from "discord.js";
import express from "express";

import { commands } from "../constants";
import { loadCommands, loadEvent } from "../handlers";
import ConfigApp from "../config";
import { EmbedError } from "../components/embed";
import api from "../api";

const { User, Message, GuildMember, ThreadMember, Channel, Reaction } =
  Partials;
const {
  Guilds,
  GuildMembers,
  GuildVoiceStates,
  GuildMessages,
  GuildMessageReactions,
  DirectMessages,
  MessageContent,
} = GatewayIntentBits;

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildVoiceStates,
    GuildMessages,
    GuildMessageReactions,
    DirectMessages,
    MessageContent,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction],
})

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res
    .status(200)
    .json({ message: "welcome to botshop api", status: "success" });
});

app.use(`/api/v${ConfigApp.API_VERSION}`, api)

client.login(ConfigApp.DISCORD_TOKEN).then(async () => {
  console.log(`Bot ${client.user?.username} is ready! 🚀`);

  const envFile = `.env.${process.env.NODE_ENV || "development"}`;
  console.log(`Loaded environment ${envFile} 📂`);

  // if (client.application) {
  //   commands.clear();
  //   client.application.commands.set([]);
  //   const guild = await client.guilds.fetch("757769542494847017");
  //   guild.commands.set([]);
  //   console.log("\x1b[33m[ RESET ]\x1b[37m Cleared all commands. 🧹");
  // }

  loadCommands(client);
  loadEvent(client);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = commands.get(interaction.commandName);
    if (!command) {
      interaction.reply({ embeds: [EmbedError("⚠️ Command not found")] });
    } else {
      command.execute(interaction, client);
    }
  }
});

app.listen(ConfigApp.PORT, () => {
  console.log(`Server is running at :${ConfigApp.PORT} ✨`);
});

export { client, commands };
