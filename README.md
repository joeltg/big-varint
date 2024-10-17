# big-varint

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) [![license](https://img.shields.io/github/license/joeltg/big-varint)](https://opensource.org/licenses/MIT) [![NPM version](https://img.shields.io/npm/v/big-varint)](https://www.npmjs.com/package/big-varint) ![TypeScript types](https://img.shields.io/npm/types/big-varint)

Encode and decode arbitrarily large signed and unsigned BigInts.

This library is TypeScript-native, ESM-only, and has zero dependencies. It uses Uint8Arrays and works in the browser, Node, and [Deno](https://deno.land/). It uses the same binary encoding as Go's [encoding/binary](https://pkg.go.dev/encoding/binary) module, the [Protobuf spec](https://developers.google.com/protocol-buffers/docs/encoding), and the [varint](https://www.npmjs.com/package/varint) / [signed-varint](https://www.npmjs.com/package/signed-varint) NPM packages.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Testing](#testing)
- [Credits](#credits)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm i big-varint
```

## Usage

### Encode a Signed Varint

```ts
import { encode } from "big-varint/signed"

const i = -300n

encode(i) // Uint8Array(2) [ 215, 4 ]
```

### Decode a Signed Varint

```ts
import { decode } from "big-varint/signed"

const data = new Uint8Array([215, 4])

decode(data) // -300n
```

`decode` can also be passed an optional `offset` parameter:

```ts
import { decode } from "big-varint/signed"

const data = new Uint8Array([0, 0, 215, 4, 37, 37, 37])

decode(data, 2) // -300n

// The encoding length of the most recently decoded value
// can be accessed via the `decode.bytes` property.
decode.bytes // 2
```

### Get the Encoding Length of a Signed Varint

```ts
import { encodingLength } from "big-varint/signed"

const i = -300n

encodingLength(i) // 2
```

### Encode an Unsigned Varint

```ts
import encode from "big-varint/unsigned"

const i = 123456789012345678901234567890n

encode(i)

/*
Uint8Array(14) [
  210, 149, 252, 241,
  228, 157, 248, 185,
  195, 237, 191, 200,
  238,  49
]
*/
```

### Decode an Unsigned Varint

```ts
import { decode } from "big-varint/unsigned"

const data = new Uint8Array([210, 149, 252, 241, 228, 157, 248, 185, 195, 237, 191, 200, 238, 49])

decode(data) // 123456789012345678901234567890n
```

`decode` can also be passed an optional `offset` parameter:

```typescript
import { decode } from "big-varint/unsigned"

const data = new Uint8Array([
	0, 0, 0, 0, 210, 149, 252, 241, 228, 157, 248, 185, 195, 237, 191, 200, 238, 49, 37, 37, 0, 0,
])

decode(data, 4) // 123456789012345678901234567890n

// The encoding length of the most recently decoded value
// can be accessed via the `decode.bytes` property.
decode.bytes // 14
```

### Get the Encoding Length of an Unsigned Varint

```typescript
import { encodingLength } from "big-varint/unsigned"

const i = 123456789012345678901234567890n

encodingLength(i) // 14
```

## Testing

Tests use [AVA](https://github.com/avajs/ava) and live in the [test](./test/) directory.

```
npm run test
```

## Credits

A previous version of this library was adapted from [chrisdickinson/varint](https://github.com/chrisdickinson/varint), but has since been rewritten from scratch.

## Contributing

I don't expect to add any additional functionality to this library, but am potentially open to proposals for better interfaces. Open issues to discuss any questions before making an PRs.

## License

MIT © 2021 Joel Gustafson
