import type { ContextMenuCommand } from "#types/Commands";

const command: ContextMenuCommand = {
	data: {
		name: "Ping",
		type: "MESSAGE"
	},
	async execute(interaction) {
		interaction.reply({ content: "Pong!!!", ephemeral: true });
	}
};

export default command;
