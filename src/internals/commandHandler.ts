import { BS_GUILD_ID } from "#constants/guilds";
import { Collection } from "discord.js";
import { join } from "path";
import { loadFiles } from "#utils/loadFiles";

import type {
	ApplicationCommand,
	ApplicationCommandData,
	Client,
	GuildApplicationCommandPermissionData,
	Snowflake
} from "discord.js";
import type { ContextMenuCommand, SlashCommand } from "#types/Commands";

const plural = (x: number) => (x === 1 ? "" : "s");

function startCommandHandler(client: Client) {
	const slashCommands = new Collection<string, SlashCommand>();
	const contextCommands = new Collection<string, ContextMenuCommand>();
	let commandData: Collection<Snowflake, ApplicationCommand>;

	async function setCommands(
		slashCommands: Collection<string, SlashCommand>,
		contextCommands: Collection<string, ContextMenuCommand>
	): Promise<Collection<Snowflake, ApplicationCommand>> {
		const slashCmdArr: ApplicationCommandData[] = slashCommands.map((x) => x.data);
		const contextCmdArr: ApplicationCommandData[] = contextCommands.map((x) => x.data);
		const cmdArr = [...slashCmdArr, ...contextCmdArr];
		const guild = client.guilds.cache.get(BS_GUILD_ID);

		if (!guild) {
			console.warn("Guild could not be detected.");
			return new Collection();
		}
		if (process.argv.includes("--type-change")) {
			guild.commands.set([]);
			console.log(`Commands cleared in ${guild.name}`);
		}

		const setInfo = await guild.commands.set(cmdArr);
		if (!setInfo.size) {
			console.error("Failed to set slash commands.");
			return setInfo;
		}
		const slashCount = setInfo.reduce((x, y) => {
			return x + (y.type === "CHAT_INPUT" ? 1 : 0);
		}, 0);
		const contextCount = setInfo.size - slashCount;
		console.log(`${slashCount} slash command${plural(slashCount)} set successfully in ${guild.name}.`);
		console.log(`${contextCount} context menu item${plural(contextCount)} set successfully in ${guild.name}.`);
		return setInfo;
	}

	async function setPermissions(
		commands: Collection<string, SlashCommand>,
		commandData: Collection<Snowflake, ApplicationCommand>
	): Promise<void> {
		const permissions: GuildApplicationCommandPermissionData[] = [];
		const cmd = commandData.first();
		if (!cmd) return;
		const guild = cmd.guild;
		if (!guild) {
			console.warn("Could not get the guild for setting permissions.");
			return;
		}
		for (const [key, val] of commandData) {
			const command = commands.get(val.name);
			if (!command || !command.permissions) continue;
			const data: GuildApplicationCommandPermissionData = {
				id: key,
				permissions: command.permissions
			};
			permissions.push(data);
			const permSetInfo = await guild.commands.permissions.set({ fullPermissions: permissions });
			if (permSetInfo.size === 0) {
				console.log("No permissions have been set.");
				return;
			}
			console.log("Permissions set successfully.");
			return;
		}
	}

	client.once("ready", async () => {
		// Loading commands from /commands.
		await loadFiles<SlashCommand>(slashCommands, join(__dirname, "..", "commands"));
		await loadFiles<ContextMenuCommand>(contextCommands, join(__dirname, "..", "context-commands"));

		console.log(`${slashCommands.size} slash command${plural(slashCommands.size)} loaded.`);
		console.log(`${contextCommands.size} context menu item${plural(contextCommands.size)} loaded.`);

		if (!process.argv.includes("--no-edit")) {
			// Setting the commands as slash commands in the selected guild.
			commandData = await setCommands(slashCommands, contextCommands);

			// Configuring permissions for every command.
			await setPermissions(slashCommands, commandData);
		} else {
			console.log("No commands set.");
		}
	});
	client.on("interactionCreate", (interaction) => {
		if (interaction.isCommand()) {
			const cmd = slashCommands.get(interaction.commandName);
			if (!cmd) {
				return;
			}
			cmd.execute(interaction);
		} else if (interaction.isContextMenu()) {
			const cmd = contextCommands.get(interaction.commandName);
			if (!cmd) {
				return;
			}
			cmd.execute(interaction);
		}
	});

	return [slashCommands, contextCommands];
}

export { startCommandHandler };
