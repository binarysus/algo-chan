function lcs(xs: string, ys: string): number {
	if (xs.length < ys.length) return lcs(ys, xs);

	const dp: number[] = Array(ys.length + 1).fill(0);
	let v;
	for (const x of xs) {
		v = 0;
		for (let j = 0; j < ys.length; j++) {
			const t = Math.max(dp[j], dp[j + 1], v + Number(x === ys[j]));
			v = dp[j + 1];
			dp[j + 1] = t;
		}
	}
	return dp[ys.length];
}

export function lcsSort(str: string, arr: string[]): void {
	arr.sort((xs, ys) => {
		const x = lcs(xs, str);
		const y = lcs(ys, str);

		if (x === y) return xs.length - ys.length;
		return y - x;
	});
}
