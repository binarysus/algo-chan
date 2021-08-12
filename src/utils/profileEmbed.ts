import { MessageEmbed } from "discord.js";
import { zero_width_space } from "#constants/unicodes";
import { difficultyEmotes } from "#constants/emotes";
import { questions } from "#constants/questions";
import type { BSUser } from "#types/BSUser";

enum Difficulty {
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
	Harder = "Harder"
}

function addProgressBar(difficulty: Difficulty, value: number, embed: MessageEmbed) {
	const max = questions[difficulty];
	let d = Math.floor((value * 12) / max);
	if (d === 0 && value > 0) d = 1;

	embed.addField(
		`${difficulty} (${value} / ${questions[difficulty]})`,
		zero_width_space + difficultyEmotes[difficulty].repeat(d) + difficultyEmotes["None"].repeat(12 - d)
	);
}

export function buildProfileEmbed(user: BSUser): MessageEmbed {
	const { stat } = user;

	const embed = new MessageEmbed()
		.setTitle(user.username)
		.setURL(`https://binarysearch.com/@/${user.username}`)
		.addField("Level", `${stat.grade}`, true)
		.addField("Experience", `${stat.xp}`, true);

	addProgressBar(Difficulty.Easy, stat.numEasySolved, embed);
	addProgressBar(Difficulty.Medium, stat.numMediumSolved, embed);
	addProgressBar(Difficulty.Hard, stat.numHardSolved, embed);
	addProgressBar(Difficulty.Harder, stat.numHarderSolved, embed);

	return embed;
}
