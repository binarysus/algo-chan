import responses from "../../constants/responses";
import fetchUser from "../../util/fetchUser";
import profileEmbed from "../../util/profileEmbed";
export const command = {
    name: "profile",
    description: "get the binarysearch profile of a user",
    options: [
        {
            name: 'query',
            type: 'STRING',
            description: 'the username of the user to fetch',
            required: true,
        }
    ],
    permissions: [],
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isCommand()) {
                const { value } = interaction.options.get('query');
                const data = yield fetchUser(value);
                if (!data) {
                    interaction.reply(responses.PROFILE_NOT_FOUND);
                }
                else {
                    interaction.reply({ embeds: [profileEmbed(data.user)] });
                }
            }
        });
    }
};
