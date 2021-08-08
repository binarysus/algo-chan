import { readdir } from "fs/promises";
import { join } from "path";
import type { Collection } from "discord.js";
import type { DiscordEvent } from "#types/DiscordEvent";
import type { Command } from "#types/Command";

async function loadFiles<T extends Command | DiscordEvent>(collection: Collection<string, T>, path: string): Promise<void> {
  const files = await readdir(path, { withFileTypes: true });
  for (const element of files) {
    if (element.isFile() && element.name.endsWith(".js")) {
      const imp: { default: T } = await import(join(path, element.name));
      collection.set(
        imp.default.name.toLowerCase(),
        imp.default
      );
    }
    else if (element.isDirectory()) {
      await loadFiles(collection, join(path, element.name));
    }
  }
}

export {
  loadFiles
};
