import { DiscordEvent } from "../../types/DiscordEvent";

const event: DiscordEvent = {
  name: "test",
  event: "guildMemberUpdate",
  description: "boop",
  execute(){
    console.log();
  }
};

export default event;
