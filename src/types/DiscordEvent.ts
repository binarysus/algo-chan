import { ClientEvents} from "discord.js";

type DiscordEvent = {
  [K in keyof ClientEvents]: {
    event: K;
    name: string;
    description: string;
    execute(...args: ClientEvents[K]): void;
  }
}[keyof ClientEvents]

export {
  DiscordEvent
}
