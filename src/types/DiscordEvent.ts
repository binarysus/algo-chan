import type { ClientEvents } from "discord.js";

type DiscordEvent = {
	[K in keyof ClientEvents]: {
		name: string;
		event: K;
		description: string;
		once: boolean;
		execute(...args: ClientEvents[K]): Promise<void>;
	};
}[keyof ClientEvents];

export { DiscordEvent };
