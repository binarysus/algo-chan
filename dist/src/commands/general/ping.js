export const command = {
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
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const eph = ((_a = interaction.options.get("ephemeral")) === null || _a === void 0 ? void 0 : _a.value) || false;
            if (typeof eph !== "boolean") {
                return;
            }
            yield interaction.reply({ content: "Pong", ephemeral: eph });
        });
    }
};
