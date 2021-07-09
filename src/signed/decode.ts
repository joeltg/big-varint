import * as unsigned from "../unsigned/index.js"

export function decode(data: Uint8Array, offset = 0) {
	const v = unsigned.decode(data, offset)
	return v & 1n ? (v + 1n) / -2n : v / 2n
}
