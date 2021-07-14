import { Collection } from "discord.js";
import { readdir } from "fs/promises";
import { guildID } from "../constants/guildID.js";
function startHandler(client) {
    const commands = new Collection();
    let commandData;
    function loadCommands(commands, path = "./commands") {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield readdir(path, { withFileTypes: true });
            for (const element of files) {
                if (element.isFile() && element.name.endsWith(".js")) {
                    const { command } = yield import(`.${path}/${element.name}`);
                    commands.set(command.name.toLowerCase(), command);
                }
                else if (element.isDirectory()) {
                    yield loadCommands(commands, `${path}/${element.name}`);
                }
            }
        });
    }
    function setCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmdArr = commands.array(), guild = client.guilds.cache.get(guildID);
            if (!guild) {
                console.warn("Guild could not be detected.");
                return new Collection();
            }
            else {
                const setInfo = yield guild.commands.set(cmdArr);
                if (!setInfo.size) {
                    console.error("Failed to set slash commands.");
                    return setInfo;
                }
                else {
                    const s = setInfo.size === 1 ? "" : "s";
                    console.log(`${setInfo.size} slash command${s} set successfully in ${guild.name}.`);
                    return setInfo;
                }
            }
        });
    }
    function setPermissions(commands, commandData) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissions = [];
            const cmd = commandData.first();
            if (!cmd)
                return;
            const guild = cmd.guild;
            if (!guild) {
                console.warn("Could not get the guild for setting permissions.");
                return;
            }
            for (const [key, val] of commandData) {
                const commandPermissions = commands.get(val.name).permissions;
                if (!commandPermissions)
                    continue;
                const data = {
                    id: key,
                    permissions: commandPermissions
                };
                permissions.push(data);
                const permSetInfo = yield guild.commands.permissions.set({ fullPermissions: permissions });
                if (permSetInfo.size === 0) {
                    console.log("No permissions have been set");
                    return;
                }
                console.log("Permissions set successfully");
                return;
            }
        });
    }
    client.once("ready", () => __awaiter(this, void 0, void 0, function* () {
        // Loading commands from /commands.
        yield loadCommands(commands);
        const s = commands.size === 1 ? "" : "s";
        console.log(`${commands.size} commands${s} loaded.`);
        // Setting the commands as slash commands in the selected guild.
        commandData = yield setCommands(commands);
        // Configuring permissions for every command.
        yield setPermissions(commands, commandData);
        console.log("The bot is ready");
    }));
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        const cmd = commands.get(interaction.commandName);
        if (!cmd) {
            return;
        }
        cmd.execute(interaction);
    });
    client.on("messageCreate", (message) => {
        if (message.content === "test") {
            setCommands(commands);
        }
    });
}
export { startHandler };
