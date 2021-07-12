const fetch = require("node-fetch");
const urls = require("../constants/urls.json");

async function fetchUser(username) {
  const url = urls.BINARYSEARCH_API.replace("USERNAME", username);
  const data = await fetch(url).then(res => res.json());

  if ("user" in data) return data;
  return null;
}

module.exports = fetchUser;
