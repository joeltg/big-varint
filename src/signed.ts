import * as unsigned from "./unsigned.js"

export function encodingLength(v: bigint) {
	return unsigned.encodingLength(v >= 0 ? v * 2n : v * -2n - 1n)
}

export type Encode = {
	(i: bigint, buffer?: ArrayBuffer, byteOffset?: number): Uint8Array
}

export const encode = (v: bigint, buffer?: ArrayBuffer, byteOffset = 0): Uint8Array => {
	v = v >= 0 ? v * 2n : v * -2n - 1n
	return unsigned.encode(v, buffer, byteOffset)
}

export type Decode = {
	bytes?: number
	(data: Uint8Array, offset?: number): bigint
}

export const decode: Decode = (data: Uint8Array, offset = 0) => {
	const prevUnsignedBytes = unsigned.decode.bytes
	const v = unsigned.decode(data, offset)
	decode.bytes = unsigned.decode.bytes
	unsigned.decode.bytes = prevUnsignedBytes
	return v & 1n ? (v + 1n) / -2n : v / 2n
}
