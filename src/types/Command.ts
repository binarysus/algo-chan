import { ApplicationCommandData, ApplicationCommandPermissionData, CommandInteraction } from "discord.js";
interface Command extends ApplicationCommandData {
  nsfw?: boolean;
  ownerOnly?: boolean;
  permissions?: ApplicationCommandPermissionData[];
  execute(interaction: CommandInteraction): void
}

export { Command };
