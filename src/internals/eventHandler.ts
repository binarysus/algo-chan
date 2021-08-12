import { Collection } from "discord.js";
import { loadFiles } from "#utils/loadFiles";
import { join } from "path";
import type { Client, ClientEvents } from "discord.js";
import type { DiscordEvent } from "#types/DiscordEvent";

async function startEventHandler(client: Client): Promise<Collection<string, DiscordEvent>> {
	const events = new Collection<string, DiscordEvent>();
	await loadFiles<DiscordEvent>(events, join(__dirname, "..", "events"));

	const onEvents = new Collection<keyof ClientEvents, DiscordEvent[]>();
	const onceEvents = new Collection<keyof ClientEvents, DiscordEvent[]>();

	for (const [, eventFile] of events) {
		if (eventFile.once) {
			const vals = onceEvents.get(eventFile.event);
			if (!vals) {
				onceEvents.set(eventFile.event, [eventFile]);
			} else {
				vals.push(eventFile);
			}
		} else {
			const vals = onEvents.get(eventFile.event);
			if (!vals) {
				onEvents.set(eventFile.event, [eventFile]);
			} else {
				vals.push(eventFile);
			}
		}
	}

	for (const [event, val] of onEvents) {
		client.on(event, (...params) => {
			for (const dEvent of val) {
				// @ts-expect-error Types being weird
				dEvent.execute(...params);
			}
		});
	}

	for (const [event, val] of onceEvents) {
		client.once(event, (...params) => {
			for (const dEvent of val) {
				// @ts-expect-error Types being weird 2: Electric boogaloo
				dEvent.execute(...params);
			}
		});
	}
	return events;
}

export { startEventHandler };
