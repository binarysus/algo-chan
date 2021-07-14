import { Client } from "discord.js";
import { options, token } from "../config.js";
import { startHandler } from "./internals/commandHandler.js";

const client = new Client(options);

startHandler(client);

client.login(token);
