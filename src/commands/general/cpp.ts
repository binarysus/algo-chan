import { MessageEmbed } from "discord.js";
import { URL } from "url";

import cpp from "#constants/cpp";
import urls from "#constants/urls";
import type { Command } from "#types/Command";
import lcsSort from "#utils/lcsSort";

const command: Command = {
  name: "cpp",
  description: "search the C++ documentation",
  options: [
    {
      name: "query",
      type: "STRING",
      description: "the search query",
      required: true
    }
  ],
  permissions: [],
  async execute(interaction) {
    const query = interaction.options.getString("query") ?? "std";
    const paths = Object.keys(cpp);

    lcsSort(query, paths);
    const matches = paths.slice(0, 6);
    const hrefs: string[] = matches.map(m => {
      const path = (cpp as { [key: string]: string })[m];
      return new URL(path, urls.CPPREFERENCE).href;
    });

    const desc = matches.map((m, i) => `[${m}](${hrefs[i]})`).join("\n");
    const embed = new MessageEmbed()
      .setTitle("Search results")
      .setDescription(desc);

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
