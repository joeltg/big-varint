# big-varint

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) [![license](https://img.shields.io/github/license/joeltg/big-varint)](https://opensource.org/licenses/MIT) [![NPM version](https://img.shields.io/npm/v/big-varint)](https://www.npmjs.com/package/big-varint) ![TypeScript types](https://img.shields.io/npm/types/big-varint) ![lines of code](https://img.shields.io/tokei/lines/github/joeltg/big-varint)

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

Or in Deno:

```typescript
import { signed, unsigned } from "https://cdn.skypack.dev/big-varint"

signed.encode(-2138912031n)
```

## Usage

### Encode a Signed Varint

```typescript
import { signed } from "big-varint"

const i = -300n

signed.encode(i) // Uint8Array(2) [ 215, 4 ]
```

### Decode a Signed Varint

```typescript
import { signed } from "big-varint"

const data = new Uint8Array([215, 4])

signed.decode(data) // -300n
```

`decode` can also be passed an optional `offset` parameter:

```typescript
import { signed } from "big-varint"

const data = new Uint8Array([0, 0, 215, 4, 37, 37, 37])

signed.decode(data, 2) // -300n
```

### Get the Encoding Length of a Signed Varint

```typescript
import { signed } from "big-varint"

const i = -300n

signed.encodingLength(i) // 2
```

### Encode an Unsigned Varint

```typescript
import { unsigned } from "big-varint"

const i = 123456789012345678901234567890n

unsigned.encode(i)

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

```typescript
import { unsigned } from "big-varint"

const data = new Uint8Array([
	210, 149, 252, 241, 228, 157, 248, 185, 195, 237, 191, 200, 238, 49,
])

unsigned.decode(data) // 123456789012345678901234567890n
```

`decode` can also be passed an optional `offset` parameter:

```typescript
import { unsigned } from "big-varint"

const data = new Uint8Array([
	0, 0, 0, 0, 210, 149, 252, 241, 228, 157, 248, 185, 195, 237, 191, 200, 238,
	49, 37, 37,
])

unsigned.decode(data, 4) // 123456789012345678901234567890n
```

### Get the Encoding Length of an Unsigned Varint

```typescript
import { unsigned } from "big-varint"

const i = 123456789012345678901234567890n

unsigned.encodingLength(i) // 14
```

## Testing

Tests use [AVA 4](https://github.com/avajs/ava) (currently in alpha) and live in the [test](./test/) directory.

```
npm run test
```

## Credits

A previous version of this library was adapted from [chrisdickinson/varint](https://github.com/chrisdickinson/varint), but has since been rewritten from scratch.

## Contributing

I don't expect to add any additional functionality to this library, but am potentially open to proposals for better interfaces. Open issues to discuss any questions before making an PRs.

## License

MIT © 2021 Joel Gustafson
