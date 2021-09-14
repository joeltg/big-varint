import test from "ava"

import { signed } from "../lib/index.js"

const int8 = 0n
const int8min = -128n
const int8max = 127n
const int16 = 128n
const int16min = -32768n
const int16max = 32767n
const int32 = 32768n
const int32min = -2147483648n
const int32max = 2147483647n
const int64 = 2147483648n
const int64min = -9223372036854775808n
const int64max = 9223372036854775807n
const int128 = 9223372036854775808n

test("int8 length", (t) => t.is(signed.encodingLength(int8), 1))
test("int8", (t) =>
	t.is(Buffer.from(signed.encode(int8)).toString("hex"), "00"))

test("int8 min length", (t) => t.is(signed.encodingLength(int8min), 2))
test("int8 min", (t) =>
	t.is(Buffer.from(signed.encode(int8min)).toString("hex"), "ff01"))

test("int8 max length", (t) => t.is(signed.encodingLength(int8max), 2))
test("int8 max", (t) =>
	t.is(Buffer.from(signed.encode(int8max)).toString("hex"), "fe01"))

test("int16 length", (t) => t.is(signed.encodingLength(int16), 2))
test("int16", (t) =>
	t.is(Buffer.from(signed.encode(int16)).toString("hex"), "8002"))

test("int16 min length", (t) => t.is(signed.encodingLength(int16min), 3))
test("int16 min", (t) =>
	t.is(Buffer.from(signed.encode(int16min)).toString("hex"), "ffff03"))

test("int16 max length", (t) => t.is(signed.encodingLength(int16max), 3))
test("int16 max", (t) =>
	t.is(Buffer.from(signed.encode(int16max)).toString("hex"), "feff03"))

test("int32 length", (t) => t.is(signed.encodingLength(int32), 3))
test("int32", (t) =>
	t.is(Buffer.from(signed.encode(int32)).toString("hex"), "808004"))

test("int32 min length", (t) => t.is(signed.encodingLength(int32min), 5))
test("int32 min", (t) =>
	t.is(Buffer.from(signed.encode(int32min)).toString("hex"), "ffffffff0f"))

test("int32 max length", (t) => t.is(signed.encodingLength(int32max), 5))
test("int32 max", (t) =>
	t.is(Buffer.from(signed.encode(int32max)).toString("hex"), "feffffff0f"))

test("int64 length", (t) => t.is(signed.encodingLength(int64), 5))
test("int64", (t) =>
	t.is(Buffer.from(signed.encode(int64)).toString("hex"), "8080808010"))

test("int64 min length", (t) => t.is(signed.encodingLength(int64min), 10))
test("int64 min", (t) =>
	t.is(
		Buffer.from(signed.encode(int64min)).toString("hex"),
		"ffffffffffffffffff01"
	))

test("int64 max length", (t) => t.is(signed.encodingLength(int64max), 10))
test("int64 max", (t) =>
	t.is(
		Buffer.from(signed.encode(int64max)).toString("hex"),
		"feffffffffffffffff01"
	))

test("int128 length", (t) => t.is(signed.encodingLength(int128), 10))
test("int128", (t) =>
	t.is(
		Buffer.from(signed.encode(int128)).toString("hex"),
		"80808080808080808002"
	))
