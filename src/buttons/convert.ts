import { MessageEmbed } from "discord.js";

import type { ButtonHandlerObject } from "#types/ButtonHandlerObject";

const button: ButtonHandlerObject = {
	data: {
		name: "convert",
		description: "convert the message to non-ephemeral",
		match: /deleteButton/g
	},
	async execute(interaction) {
		const [embed] = interaction.message.embeds;
		if (!(embed instanceof MessageEmbed)) return;
		interaction.reply({ embeds: [embed] });
	}
};

export default button;
