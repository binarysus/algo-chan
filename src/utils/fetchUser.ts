import { BINARYSEARCH_API } from "#constants/urls";
import type { BSUser } from "#types/BSUser";
import fetch from "node-fetch";

export async function fetchUser(username: string): Promise<null | BSUser> {
	const url = BINARYSEARCH_API.replace("USERNAME", encodeURIComponent(username));
	const data = await fetch(url)
		.then((res) => res.json())
		.catch(console.error);

	return data?.user ?? null;
}
