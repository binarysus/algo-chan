import type { ApplicationCommandData, ApplicationCommandPermissionData, CommandInteraction } from "discord.js";
interface Command extends ApplicationCommandData {
	nsfw?: boolean;
	ownerOnly?: boolean;
	permissions?: ApplicationCommandPermissionData[];
	execute(interaction: CommandInteraction): Promise<void>;
}

export { Command };
