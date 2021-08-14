import { PROFILE_NOT_FOUND } from "#constants/responses";
import { buildProfileEmbed } from "#utils/profileEmbed";
import { fetchUser } from "#utils/fetchUser";

import type { SlashCommand } from "#types/Commands";

const command: SlashCommand = {
	data: {
		name: "profile",
		description: "get the binarysearch profile of a user",
		options: [
			{
				name: "user",
				type: "STRING",
				description: "the username of the user to fetch",
				required: true
			}
		]
	},
	permissions: [],
	async execute(interaction) {
		const value = interaction.options.getString("user", true);
		const data = await fetchUser(value);
		if (!data) {
			interaction.reply({ content: PROFILE_NOT_FOUND, ephemeral: true });
		} else {
			interaction.reply({ embeds: [buildProfileEmbed(data)] });
		}
	}
};

export default command;
