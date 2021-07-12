const fetch = require("node-fetch");

const BS_API_URL = "https://binarysearch.com/api/users/USERNAME/profile";

async function fetchUser(username) {
  const url = BS_API_URL.replace("USERNAME", username);
  const data = await fetch(url).then(res => res.json());

  if ("user" in data) return data;
  return null;
}

module.exports = fetchUser;
