const MSB = 0x80n
const REST = 0x7fn

export function decode(data: Uint8Array, offset = 0): bigint {
	const l = data.length
	let b: bigint
	let res = 0n,
		shift = 0n,
		counter = offset

	do {
		if (counter >= l) {
			throw new RangeError("could not decode varint")
		}
		b = BigInt(data[counter++])
		res += shift < 28n ? (b & REST) << shift : (b & REST) * (1n << shift)
		shift += 7n
	} while (b >= MSB)

	return res
}
