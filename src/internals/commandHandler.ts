import { Collection } from "discord.js";
import { loadFiles } from "../utils/loadFiles";
import { join } from "path";
import { BS_GUILD_ID } from "../constants/guilds";
import type {
  ApplicationCommand,
  ApplicationCommandData,
  Client,
  GuildApplicationCommandPermissionData,
  Snowflake
} from "discord.js";
import type { Command } from "../types/Command";

function startCommandHandler(client: Client): Collection<string, Command> {

  const commands = new Collection<string, Command>();
  let commandData: Collection<Snowflake, ApplicationCommand>;

  async function setCommands(commands: Collection<string, Command>): Promise<Collection<Snowflake, ApplicationCommand>> {
    const cmdArr: ApplicationCommandData[] = commands.array(),
      guild = client.guilds.cache.get(BS_GUILD_ID);

    if (!guild) {

      console.warn("Guild could not be detected.");
      return new Collection();

    } else {

      const setInfo = await guild.commands.set(cmdArr);
      if (!setInfo.size) {

        console.error("Failed to set slash commands.");
        return setInfo;

      } else {
        const s = setInfo.size === 1 ? "" : "s";
        console.log(`${setInfo.size} slash command${s} set successfully in ${guild.name}.`);
        return setInfo;

      }

    }

  }

  async function setPermissions(commands: Collection<string, Command>, commandData: Collection<Snowflake, ApplicationCommand>): Promise<void> {
    const permissions: GuildApplicationCommandPermissionData[] = [];
    const cmd = commandData.first();
    if (!cmd) return;
    const guild = cmd.guild;
    if (!guild) {
      console.warn("Could not get the guild for setting permissions.");
      return;
    }
    for (const [key, val] of commandData) {
      const commandPermissions = commands.get(val.name)?.permissions;
      if (!commandPermissions) continue;
      const data: GuildApplicationCommandPermissionData = {
        id: key,
        permissions: commandPermissions
      };
      permissions.push(data);
      const permSetInfo = await guild.commands.permissions.set({ fullPermissions: permissions });
      if (permSetInfo.size === 0) {
        console.log("No permissions have been set");
        return;
      }
      console.log("Permissions set successfully");
      return;
    }
  }

  client.once(
    "ready",
    async() => {
      // Loading commands from /commands.
      await loadFiles<Command>(commands, join(__dirname, "..", "commands"));
      const s = commands.size === 1 ? "" : "s";
      console.log(`${commands.size} command${s} loaded.`);

      // Setting the commands as slash commands in the selected guild.
      commandData = await setCommands(commands);

      // Configuring permissions for every command.
      await setPermissions(commands, commandData);

    }
  );
  client.on(
    "interactionCreate",
    (interaction) => {

      if (!interaction.isCommand()) {

        return;

      }
      const cmd = commands.get(interaction.commandName);
      if (!cmd) {

        return;

      }
      cmd.execute(interaction);

    }
  );

  return commands;

}

export {
  startCommandHandler
};
