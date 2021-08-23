<<<<<<< HEAD
import { Client, Intents, Interaction, MessageEmbed, MessageAttachment } from "discord.js";
=======
import { Client, Intents } from "discord.js";
import { LogLevel, Logger } from "#classes/Logger";
import { startButtonHandler } from "#internals/buttonHandler";
>>>>>>> 2f9925f7102c6704b7bd656d5f3a5fe7a98c81a5
import { startCommandHandler } from "#internals/commandHandler";
import { startEventHandler } from "#internals/eventHandler";
import { inspect } from "util";

declare module "discord.js" {
	interface Client {
		logger: Logger;
	}
}

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

client.logger = new Logger(LogLevel.ALL);

startEventHandler(client);
startCommandHandler(client);
startButtonHandler(client);

client.on("interaction", async(interaction: Interaction) => {
  if(interaction.isContextMenu()) {
    const api = "https://emkc.org/api/v1/piston/execute";
    interface Fetched {
     ran: boolean;
     language: string;
     version: string;
     output: string;
     stdout: string;
     stderr: string;
    }

    const message = interaction.options.getMessage("message", true);

    const code = message.content.match(/```[a-zA-Z+]*\n([\s\S]*?)```/);
    const lang = message.content.replace(/\n/g, " ").split(/ +/).slice(3);

    const body = {
      "language": lang,
      "source": code
    };

    const fetched: Fetched = await fetch(api, { method: "post", body:JSON.stringify(body), headers: { "Content-Type": "application/json" } }).then(res => res.json());
    const resultEmbed = new MessageEmbed();

    if(fetched.stderr) {
      resultEmbed.setTitle("oops, there was an error")
        .setDescription(`\`\`\`${fetched.stderr}\`\`\``);
      if(fetched.stderr.length > 4000) {
        const file = new MessageAttachment(Buffer.from(`${fetched.stderr}`), "piston.txt");
        await interaction.reply({ content: "output was too long so it has been converted to a file", ephemeral: true });
        await interaction.user.send({ files: [file] });
      }
      else{
        await interaction.reply({ embeds: [resultEmbed], ephemeral: true });
      }
    }
    else if(fetched.stdout) {
      resultEmbed.setTitle(`successfully ran ${fetched.language}`)
        .setDescription(`\`\`\`${lang}\n${fetched.stdout}\`\`\``);
      if(fetched.stdout.length > 4000) {
        const file = new MessageAttachment(Buffer.from(`${fetched.stdout}`), "piston.txt");
        await interaction.reply({ content: "output was too long to fit into an embed to it has been converted to a file", ephemeral: true });
        await interaction.user.send({ files: [file] });
      }
      else{
        await interaction.reply({ embeds: [resultEmbed] });
      }
    }
    else{
      interaction.reply(`\`\`\`${inspect(fetched)}\`\`\``);
    }

  }
});

client.login(process.env.TOKEN);
