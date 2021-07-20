import { Client, Intents } from "discord.js";
import { startCommandHandler } from "./internals/commandHandler";
import { startEventHandler } from "./internals/eventHandler";
import { token } from "../config.json";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

startEventHandler(client);
startCommandHandler(client);

client.login(token);
