import { Collection } from "discord.js";
import { loadFiles } from "../utils/loadFiles"
import type { Client, ClientEvents } from "discord.js";
import type { DiscordEvent } from "../types/DiscordEvent";

const events = new Collection<string, DiscordEvent>();

async function startEventHandler(client: Client): Promise<void> {
  await loadFiles<DiscordEvent>(events, "./events");
  const setEvents = new Set<keyof ClientEvents>(events.map<keyof ClientEvents>(x => x.event));
  setEvents.forEach(e => {
    client.on<keyof ClientEvents>(e, (...p) => {
      events.filter(ev => ev.event === e).forEach(a => {
        p = p.filter(x => Boolean(x));
        a.execute(...p);
      });
    });
});
}

export {
  startEventHandler
}
