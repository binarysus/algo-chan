import type { Message, MessageActionRow, MessageButton } from "discord.js";

import { buildButtons } from "#utils/buildButtons";
import type { Command } from "#types/Command";
import { questions } from "#constants/trivia";

function getButton(components: MessageActionRow[], i: number): MessageButton {
  const component = components[i % 2].components[i >> 1];
  return component as MessageButton;
}

const command: Command = {
  name: "trivia",
  description: "play the time complexity trivia",
  permissions: [],
  async execute(interaction) {
    const rng = Math.floor(Math.random() * questions.length);
    const { title, choices, answer } = questions[rng];

    const components = buildButtons(choices);
    const message = await interaction.reply({
      content: title,
      components,
      fetchReply: true
    }) as Message;

    const collector = message.createMessageComponentCollector({
      componentType: "BUTTON",
      filter: i => i.user.id == interaction.user.id,
      max: 1
    });

    collector.on("collect", async i => {
      const chosenIndex = choices.indexOf(i.customId);
      const chosenButton = getButton(components, chosenIndex);

      if (chosenButton.label == answer) {
        chosenButton.setStyle("SUCCESS");
        return;
      }

      chosenButton.setStyle("DANGER");

      const answerIndex = choices.indexOf(answer);
      const answerButton = getButton(components, answerIndex);
      answerButton.setStyle("SUCCESS");

      await i.update({ components: components });
    });
  }
};

export default command;
