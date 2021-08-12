import { MessageActionRow, MessageButton } from "discord.js";

export function buildTriviaButtons(choices: string[]): MessageActionRow[] {
	const rows = [new MessageActionRow(), new MessageActionRow()];
	for (let i = 0; i < choices.length; i++) {
		const button = new MessageButton().setCustomId(choices[i]).setLabel(choices[i]).setStyle("SECONDARY");

		rows[i % 2].addComponents(button);
	}

	return rows;
}
