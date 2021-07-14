import { Client, Intents } from "discord.js";
import { token } from "../config.ts";
import { startHandler } from "./internals/commandHandler.js";
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
startHandler(client);
client.login(token);
