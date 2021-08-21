import { join } from "path";
import { readdir } from "fs/promises";

import type { ContextMenuCommand, SlashCommand } from "#types/Commands";
import type { ButtonHandlerObject } from "#types/ButtonHandlerObject";
import type { Collection } from "discord.js";
import type { DiscordEvent } from "#types/DiscordEvent";

type handledTypes = SlashCommand | ContextMenuCommand | DiscordEvent | ButtonHandlerObject;

async function loadFiles<T extends handledTypes>(collection: Collection<string, T>, path: string): Promise<void> {
	const files = await readdir(path, { withFileTypes: true });
	for (const element of files) {
		if (element.isFile() && element.name.endsWith(".js")) {
			const imp: { default: T } = await import(join(path, element.name));
			collection.set(imp.default.data.name, imp.default);
		} else if (element.isDirectory()) {
			await loadFiles(collection, join(path, element.name));
		}
	}
}

export { loadFiles };
