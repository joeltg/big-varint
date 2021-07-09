import { encodingLength } from "./encodingLength.js"

const MSB = 0x80
const REST = 0x7fn
const MSBALL = ~REST
const INT = 1n << 31n

export function encode(
	num: bigint,
	buffer?: ArrayBuffer,
	byteOffset?: number
): Uint8Array {
	if (num < 0n) {
		throw new RangeError("value must be unsigned")
	}

	const byteLength = encodingLength(num)
	if (buffer !== undefined) {
		if (buffer.byteLength < byteLength) {
			throw new RangeError("provided buffer is too small")
		} else if (byteOffset !== undefined && buffer.byteLength < byteOffset) {
			throw new RangeError("offset is out of range")
		}
	}

	buffer = buffer || new ArrayBuffer(byteLength)
	byteOffset = byteOffset || 0
	const array = new Uint8Array(buffer, byteOffset)

	let offset = 0

	while (num >= INT) {
		array[offset++] = Number(num & 0xffn) | MSB
		num /= 128n
	}

	while (num & MSBALL) {
		array[offset++] = Number(num & 0xffn) | MSB
		num >>= 7n
	}

	array[offset] = Number(num | 0n)

	return array
}
