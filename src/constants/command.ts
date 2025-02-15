import { Collection } from "discord.js"
import { BotCommand } from "../types/botType"

const commands = new Collection<string, BotCommand>()

export default commands