import pistonEmbed from "#utils/pistonEmbed";
import pistonFetch from "#utils/pistonFetch";

import type { ContextMenuCommand } from "#types/Commands";
import type PistonResponse from "#types/PistonReponse";

const command: ContextMenuCommand = {
	data: {
		name: "evaluate",
		type: "MESSAGE"
	},
	async execute(interaction) {
		const message = interaction.options.getMessage("message", true);
		const result = /```(?<lang>\w+)(?<script>.+?)```/gs.exec(message.content);
		if (!result?.groups?.lang || !result.groups.script) {
			return interaction.reply({ content: "you must provide a language **and** content" });
		}

		let body;
		if (result.groups.script) {
			body = {
				language: result.groups.lang,
				source: result.groups.script
			};
		} else {
			body = {
				language: result.groups.lang,
				source: "nothing provided"
			};
		}
		const fetched: PistonResponse = await pistonFetch(body);
		interaction.reply({ embeds: [pistonEmbed(fetched, result.groups.lang)] });
	}
};

export default command;
