import { Collection } from "discord.js";
import { loadFiles } from "../utils/loadFiles";
import { join } from "path";
import type { Client, ClientEvents } from "discord.js";
import type { DiscordEvent } from "../types/DiscordEvent";

const events = new Collection<string, DiscordEvent>();

async function startEventHandler(client: Client): Promise<void> {
  await loadFiles<DiscordEvent>(events, join(__dirname, "..", "events"));

  const setEventsOn = new Set<keyof ClientEvents>(events.filter(x => !x.once).map(x => x.event));
  const setEventsOnce = new Set<keyof ClientEvents>(events.filter(x => x.once).map(x => x.event));

  for (const e of setEventsOn) {
    client.on<keyof ClientEvents>(e, (...p) => {

      events.filter(ev => ev.event === e).forEach(a => {
        // @ts-expect-error types being weird
        a.execute(...p);
      });
    });
  }

  for (const e of setEventsOnce) {
    client.once<keyof ClientEvents>(e, (...p) => {

      events.filter(ev => ev.event === e).forEach(a => {
        // @ts-expect-error types being weird 2: electric boogaloo
        a.execute(...p);
      });
    });
  }
}

export {
  startEventHandler
};
