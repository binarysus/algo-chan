import { DiscordEvent } from "../../types/DiscordEvent";

const event: DiscordEvent = {
  name: "a",
  event: "ready",
  description: "boop",
  once: true,
  async execute() {
    // big pogger
  }
};

export default event;
