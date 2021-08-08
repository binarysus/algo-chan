import responses from "../../constants/responses";
import type { Command } from "../../types/Command";
import fetchUser from "../../utils/fetchUser";
import profileEmbed from "../../utils/profileEmbed";
const command: Command = {
  name: "profile",
  description: "get the binarysearch profile of a user",
  options: [
    {
      name: "user",
      type: "STRING",
      description: "the username of the user to fetch",
      required: true
    }
  ],
  permissions: [],
  async execute(interaction) {
    const value = interaction.options.get("user")?.value;
    const data = await fetchUser(value as string);
    if(!data) {
      interaction.reply(responses.PROFILE_NOT_FOUND);
    }
    else {
      interaction.reply({ embeds: [profileEmbed(data)] });
    }
  }
};

export default command;
