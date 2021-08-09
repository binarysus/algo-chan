import fetch from "node-fetch";
import { BINARYSEARCH_API } from "#constants/urls";
import type { BSUser } from "#types/BSUser";

export async function fetchUser(username: string): Promise<null | BSUser> {
  const url = BINARYSEARCH_API.replace("USERNAME", username);
  const data = await fetch(url).then(res => res.json());

  if ("user" in data) return data.user;
  return null;
}
