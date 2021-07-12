const { MessageEmbed } = require("discord.js");
const { Command } = require("@sapphire/framework");
const fetchUser = require("../../utils/fetchUser");
const profileEmbed = require("../../utils/profileEmbed");
const responses = require("../../constants/responses.json");

module.exports = class extends Command {
  constructor(context) {
    super(context, {
      name: "profile",
      description: "show a user's binarysearch profile"
    });
  }

  async run(message, args) {
    const arg = args.nextMaybe();
    if (!arg.exists) return;

    const data = await fetchUser(arg.value);
    if (data === null) {
      message.channel.send(responses.PROFILE_NOT_FOUND);
      return;
    }

    message.channel.send(profileEmbed(data.user));
  }
}
