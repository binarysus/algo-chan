import { Formatters, MessageEmbed } from "discord.js";
import type { PistonResponse } from "#types/PistonReponse";

export default function pistonEmbed(fetched: PistonResponse) {
	const resultEmbed = new MessageEmbed();
	if (fetched.stderr) {
		resultEmbed.setTitle("oops, there was an error").setDescription(`\`\`\`${fetched.stderr.slice(1000)}\`\`\``);
		return resultEmbed;
	} else if (fetched.stdout) {
		resultEmbed
			.setTitle(`successfully ran ${fetched.language}`)
			.setDescription(`\`\`\`${fetched.language}\n${fetched.stdout.slice(0, 1000)}\`\`\``);
		return resultEmbed;
	}
	return new MessageEmbed().setDescription(Formatters.codeBlock(fetched.language, fetched.output));
}
