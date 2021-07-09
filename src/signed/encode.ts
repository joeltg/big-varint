import * as unsigned from "../unsigned/index.js"

export function encode(v: bigint, buffer?: ArrayBuffer, byteOffset?: number) {
	v = v >= 0 ? v * 2n : v * -2n - 1n
	return unsigned.encode(v, buffer, byteOffset)
}
