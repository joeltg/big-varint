import * as unsigned from "../unsigned/index.js"

export function encodingLength(v: bigint) {
	return unsigned.encodingLength(v >= 0 ? v * 2n : v * -2n - 1n)
}
