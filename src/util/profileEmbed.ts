import { MessageEmbed, User } from "discord.js";
import BsUser from "../constants/bsUser";
import emotes from "../constants/emotes";
import questions from "../constants/questions";

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Harder = "Harder"
}

function addProgressBar(difficulty: Difficulty, value: number, embed: MessageEmbed) {
  const max = questions[difficulty];
  let d = Math.floor(value * 12 / max);
  if (d == 0 && value > 0) d = 1;

  embed.addField(
    `${difficulty} (${value} / ${questions[difficulty]})`,
    emotes[difficulty].repeat(d) + emotes["None"].repeat(12 - d)
  );
}

export default function(user: BsUser) {
  const { stat } = user;

  const embed = new MessageEmbed()
    .setTitle(user.username)
    .setURL(`https://binarysearch.com/@/${user.username}`)
    .addField("Level", `${stat.grade}`, true)
    .addField("Experience", `${stat.xp}`, true);

  addProgressBar("Easy" as Difficulty, stat.numEasySolved, embed);
  addProgressBar("Medium" as Difficulty, stat.numMediumSolved, embed);
  addProgressBar("Hard" as Difficulty, stat.numHardSolved, embed);
  addProgressBar("Harder" as Difficulty, stat.numHarderSolved, embed);

  return embed;
};