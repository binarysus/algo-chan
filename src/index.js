const {SapphireClient} = require("@sapphire/framework");
const {token} = require("../config.json");

const client = new SapphireClient();
client.login(token);
