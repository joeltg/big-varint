import test from "ava"

import { unsigned } from "big-varint"

const uint8 = 0n
const uint8max = 255n
const uint16 = 256n
const uint16max = 65535n
const uint32 = 65536n
const uint32max = 4294967295n
const uint64 = 4294967296n
const uint64max = 18446744073709551615n
const uint128 = 18446744073709551616n

test("uint8 length", (t) => t.is(unsigned.encodingLength(uint8), 1))
test("uint8", (t) => t.is(Buffer.from(unsigned.encode(uint8)).toString("hex"), "00"))

test("uint8 max length", (t) => t.is(unsigned.encodingLength(uint8max), 2))
test("uint8 max", (t) => t.is(Buffer.from(unsigned.encode(uint8max)).toString("hex"), "ff01"))

test("uint16 length", (t) => t.is(unsigned.encodingLength(uint16), 2))
test("uint16", (t) => t.is(Buffer.from(unsigned.encode(uint16)).toString("hex"), "8002"))

test("uint16 max length", (t) => t.is(unsigned.encodingLength(uint16max), 3))
test("uint16 max", (t) => t.is(Buffer.from(unsigned.encode(uint16max)).toString("hex"), "ffff03"))

test("uint32 length", (t) => t.is(unsigned.encodingLength(uint32), 3))
test("uint32", (t) => t.is(Buffer.from(unsigned.encode(uint32)).toString("hex"), "808004"))

test("uint32 max length", (t) => t.is(unsigned.encodingLength(uint32max), 5))
test("uint32 max", (t) => t.is(Buffer.from(unsigned.encode(uint32max)).toString("hex"), "ffffffff0f"))

test("uint64 length", (t) => t.is(unsigned.encodingLength(uint64), 5))
test("uint64", (t) => t.is(Buffer.from(unsigned.encode(uint64)).toString("hex"), "8080808010"))

test("uint64 max length", (t) => t.is(unsigned.encodingLength(uint64max), 10))
test("uint64 max", (t) => t.is(Buffer.from(unsigned.encode(uint64max)).toString("hex"), "ffffffffffffffffff01"))

test("uint128 length", (t) => t.is(unsigned.encodingLength(uint128), 10))
test("uint128", (t) => t.is(Buffer.from(unsigned.encode(uint128)).toString("hex"), "80808080808080808002"))

for (let l = 1; l < 15; l++) {
	const min = 1n << BigInt(7 * l)
	const max = min - 1n
	test(`byte ${l} max`, (t) => {
		t.is(unsigned.decode(unsigned.encode(max)), max)
		t.is(unsigned.decode.bytes, unsigned.encodingLength(max))
	})

	test(`byte ${l} max length`, (t) => t.is(unsigned.encodingLength(max), l))
	test(`byte ${l + 1} min length`, (t) => t.is(unsigned.encodingLength(min), l + 1))
	test(`byte ${l + 1} min`, (t) => {
		t.is(unsigned.decode(unsigned.encode(min)), min)
		t.is(unsigned.decode.bytes, unsigned.encodingLength(min))
	})
}

test("unsigned.decode.bytes", (t) => {
	const data = new Uint8Array([
		0, 0, 0, 0, 210, 149, 252, 241, 228, 157, 248, 185, 195, 237, 191, 200, 238, 49, 37, 37, 0, 0,
	])

	t.is(unsigned.decode(data, 4), 123456789012345678901234567890n)
	t.is(unsigned.encodingLength(123456789012345678901234567890n), 14)
	t.is(unsigned.decode.bytes, 14)
})
