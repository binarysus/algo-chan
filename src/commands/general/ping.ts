import type { Command } from "../../types/Command";

const command: Command = {
  name: "ping",
  description: "pong",
  options: [
    {
      name: "ephemeral",
      type: "BOOLEAN",
      description: "do you want this message to be ephemeral?"
    }
  ],
  permissions: [],
  async execute(interaction) {

    const eph = interaction.options.get("ephemeral")?.value || false;
    if (typeof eph !== "boolean") {

      return;

    }
    await interaction.reply({ content: "Pong", ephemeral: eph });

  }
};

export default command;
