import fetch from "node-fetch";
import urls from "../constants/urls";

async function fetchUser(username: string) {
  const url = urls.BINARYSEARCH_API.replace("USERNAME", username);
  const data = await fetch(url).then(res => res.json());

  if ("user" in data) return data;
  return null;
}

export default fetchUser;