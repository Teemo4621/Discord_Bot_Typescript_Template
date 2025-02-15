import { ShardingManager } from "discord.js";
import ConfigApp from "./config";

const manager = new ShardingManager(__dirname  + '/client/index.js', { token: ConfigApp.DISCORD_TOKEN, respawn: true })

manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
})
manager.spawn()
