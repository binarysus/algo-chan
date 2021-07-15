import { ApplicationCommand, Collection, GuildApplicationCommandPermissionData, Snowflake } from "discord.js";
import { readdir } from "fs/promises";
import { guildID } from "../constants";
import type { ApplicationCommandData, Client } from "discord.js";
import type { Command } from "../types/Command";

function startHandler(client: Client): void {

  const commands = new Collection<string, Command>();
  let commandData: Collection<Snowflake, ApplicationCommand>;

  async function loadCommands(commands: Collection<string, Command>, path = "./commands"): Promise<void> {
    const files = await readdir(path, { withFileTypes: true });
    for (const element of files) {
      if (element.isFile() && element.name.endsWith(".js")) {
        const { command } = await import(`.${path}/${element.name}`);
        commands.set(
          command.name.toLowerCase(),
          command
        );
      }
      else if (element.isDirectory()) {
        await loadCommands(commands, `${path}/${element.name}`);
      }
    }
  }

  async function setCommands(commands: Collection<string, Command>): Promise<Collection<Snowflake, ApplicationCommand>> {
    const cmdArr: ApplicationCommandData[] = commands.array(),
      guild = client.guilds.cache.get(guildID);

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
      await loadCommands(commands);
      const s = commands.size === 1 ? "" : "s";
      console.log(`${commands.size} commands${s} loaded.`);

      // Setting the commands as slash commands in the selected guild.
      commandData = await setCommands(commands);

      // Configuring permissions for every command.
      await setPermissions(commands, commandData);
      console.log("The bot is ready");

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
}

export {
  startHandler
};
