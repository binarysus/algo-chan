import {ClientOptions, Intents} from "discord.js";
const flags = Intents.FLAGS,
    options: ClientOptions = {
        "allowedMentions": {},
        "intents": [
            flags.GUILDS,
            flags.GUILD_EMOJIS,
            flags.GUILD_INVITES,
            flags.GUILD_MEMBERS,
            flags.GUILD_MESSAGES
        ]
    };
const token = "ODM3MjcyNjM3NjQxNzE5ODUw.YIqI6A.L8SB5y1QzMvAlE19BJjjDRzlNLY";

export {
  options,
  token
};
