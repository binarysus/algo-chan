import { MessageEmbed } from "discord.js";
import emotes from "../constants/emotes";
import questions from "../constants/questions";
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "Easy";
    Difficulty["Medium"] = "Medium";
    Difficulty["Hard"] = "Hard";
    Difficulty["Harder"] = "Harder";
})(Difficulty || (Difficulty = {}));
function addProgressBar(difficulty, value, embed) {
    const max = questions[difficulty];
    let d = Math.floor(value * 12 / max);
    if (d == 0 && value > 0)
        d = 1;
    embed.addField(`${difficulty} (${value} / ${questions[difficulty]})`, emotes[difficulty].repeat(d) + emotes["None"].repeat(12 - d));
}
export default function (user) {
    const { stat } = user;
    const embed = new MessageEmbed()
        .setTitle(user.username)
        .setURL(`https://binarysearch.com/@/${user.username}`)
        .addField("Level", `${stat.grade}`, true)
        .addField("Experience", `${stat.xp}`, true);
    addProgressBar("Easy", stat.numEasySolved, embed);
    addProgressBar("Medium", stat.numMediumSolved, embed);
    addProgressBar("Hard", stat.numHardSolved, embed);
    addProgressBar("Harder", stat.numHarderSolved, embed);
    return embed;
}
;
