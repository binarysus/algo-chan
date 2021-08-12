function lcs(xs: string, ys: string) {
	const dp: number[][] = [];
	for (let i = 0; i <= xs.length; i++) {
		dp[i] = [];
		for (let j = 0; j <= ys.length; j++) {
			if (i * j === 0) {
				dp[i][j] = 0;
			} else {
				dp[i][j] = xs[i - 1] === ys[j - 1] ? 1 + dp[i - 1][j - 1] : Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}

	return dp[xs.length][ys.length];
}

export function lcsSort(str: string, arr: string[]): void {
	arr.sort((xs, ys) => {
		const x = lcs(xs, str);
		const y = lcs(ys, str);

		if (x === y) return xs.length - ys.length;
		return y - x;
	});
}
