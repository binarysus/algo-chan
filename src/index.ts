import { Client, Intents } from "discord.js";
import { startHandler } from "./internals/commandHandler.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

startHandler(client);
client.login(process.env.TOKEN);
