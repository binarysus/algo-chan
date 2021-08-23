import { Client, Intents } from "discord.js";
import { LogLevel, Logger } from "#classes/Logger";
import { startButtonHandler } from "#internals/buttonHandler";
import { startCommandHandler } from "#internals/commandHandler";
import { startEventHandler } from "#internals/eventHandler";

declare module "discord.js" {
	interface Client {
		logger: Logger;
	}
}

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

client.logger = new Logger(LogLevel.ALL);

startEventHandler(client);
startCommandHandler(client);
startButtonHandler(client);

client.login(process.env.TOKEN);
