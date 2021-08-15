function lcs(xs: string, ys: string): number {
	let prev: number[] = Array(ys.length + 1).fill(0);
	for (const x of xs) {
		const curr = Array(ys.length + 1);
		curr[0] = 0;
		for (let j = 0; j < ys.length; j++) {
			curr[j + 1] = Math.max(curr[j], prev[j + 1], prev[j] + Number(x === ys[j]));
		}
		prev = curr;
	}
	return prev[ys.length];
}

export function lcsSort(str: string, arr: string[]): void {
	arr.sort((xs, ys) => {
		const x = lcs(xs, str);
		const y = lcs(ys, str);

		if (x === y) return xs.length - ys.length;
		return y - x;
	});
}
