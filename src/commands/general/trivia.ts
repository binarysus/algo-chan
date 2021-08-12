import { buildTriviaButtons } from "#utils/buildTriviaButtons";
import { questions } from "#constants/trivia";

import type { Message, MessageActionRow, MessageButton } from "discord.js";
import type { Command } from "#types/Command";

function getButton(components: MessageActionRow[], i: number): MessageButton {
	const component = components[i % 2].components[i >> 1];
	return component as MessageButton;
}

const command: Command = {
	name: "trivia",
	description: "play the time complexity trivia",
	permissions: [],
	async execute(interaction) {
		const rng = Math.floor(Math.random() * questions.length);
		const { title, choices, answer } = questions[rng];

		const components = buildTriviaButtons(choices);
		const message = (await interaction.reply({
			content: title,
			components,
			fetchReply: true
		})) as Message;

		const collector = message.createMessageComponentCollector({
			componentType: "BUTTON",
			filter: (i) => i.user.id === interaction.user.id,
			max: 1
		});

		collector.on("collect", async (i) => {
			const chosenIndex = choices.indexOf(i.customId);
			const answerIndex = choices.indexOf(answer);

			for (let i = 0; i < choices.length; i++) {
				const button = getButton(components, i);
				button.setDisabled(true);

				if (i === answerIndex) button.setStyle("SUCCESS");
				else if (i === chosenIndex) button.setStyle("DANGER");
			}

			await i.update({ components });
		});
	}
};

export default command;
