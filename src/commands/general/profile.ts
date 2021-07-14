import responses from "../../constants/responses";
import type { Command } from "../../types/Command";
import fetchUser from "../../util/fetchUser";
import profileEmbed from "../../util/profileEmbed"; 
export const command: Command = {
  name: "profile",
  description: "get the binarysearch profile of a user",
  options: [
    {
    	name: 'query',
        type: 'STRING',
        description: 'the username of the user to fetch',
        required: true,
    }
  ],
  permissions: [],
  async execute(interaction) {
    if(interaction.isCommand()) {
      const { value } = interaction.options.get('query')!;
      const data = await fetchUser(value as string);
      if(!data) {
        interaction.reply(responses.PROFILE_NOT_FOUND)
      }
      else {
        interaction.reply({ embeds: [profileEmbed(data.user)] })
      }
    }
  }
};
