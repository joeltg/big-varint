export function encodingLength(value: bigint): number {
	let i = 0

	for (; value >= 0x80n; i++) {
		value >>= 7n
	}

	return i + 1
}
