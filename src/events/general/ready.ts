import type { DiscordEvent } from "#types/DiscordEvent";

const event: DiscordEvent = {
	name: "a",
	event: "ready",
	description: "boop",
	once: true,
	async execute() {
		console.log("bot is ready");
	}
};

export default event;
