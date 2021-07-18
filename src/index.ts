import { Client, Intents } from "discord.js";
import { startHandler } from "./internals/commandHandler.js";
import { token } from "../config.json";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

startHandler(client);
client.login(token);
