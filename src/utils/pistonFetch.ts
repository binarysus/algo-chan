import type { PistonResponse } from "#types/PistonReponse";

interface PistonBody {
	language: string;
	source: string;
}

export default async function pistonFetch(body: PistonBody) {
	const fetched: PistonResponse = await fetch("https://emkc.org/api/v1/piston/execute", {
		method: "post",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" }
	}).then((res) => res.json());
	return fetched;
}
