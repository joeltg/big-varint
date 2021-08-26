# big-varint

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) ![TypeScript types](https://img.shields.io/npm/types/big-varint) [![license](https://img.shields.io/github/license/joeltg/big-varint)](https://opensource.org/licenses/MIT) [![NPM version](https://img.shields.io/npm/v/big-varint)](https://www.npmjs.com/package/big-varint)

Encode and decode arbitrarily large signed and unsigned BigInts.

This library is TypeScript-native, ESModule-only, and has zero dependencies. It uses Uint8Arrays and works in node and the browser. It uses the same binary encoding as Go's [encoding/binary](https://pkg.go.dev/encoding/binary) module, the [Protobuf spec](https://developers.google.com/protocol-buffers/docs/encoding), and the [varint](https://www.npmjs.com/package/varint) / [signed-varint](https://www.npmjs.com/package/signed-varint) NPM packages.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Encode a Signed Varint](#encode-a-signed-varint)
  - [Decode a Signed Varint](#decode-a-signed-varint)
  - [Get the Encoding Length of a Signed Varint](#get-the-encoding-length-of-a-signed-varint)
  - [Encode an Unsigned Varint](#encode-an-unsigned-varint)
  - [Decode an Unsigned Varint](#decode-an-unsigned-varint)
  - [Get the Encoding Length of an Unsigned Varint](#get-the-encoding-length-of-an-unsigned-varint)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm i big-varint
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
  210, 149, 252, 241,
  228, 157, 248, 185,
  195, 237, 191, 200,
  238,  49
])

unsigned.decode(data) // 123456789012345678901234567890n
```

`decode` can also be passed an optional `offset` parameter:

```typescript
import { unsigned } from "big-varint"

const data = new Uint8Array([
    0,   0,   0,   0,
  210, 149, 252, 241,
  228, 157, 248, 185,
  195, 237, 191, 200,
  238,  49,  37,  37,
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

## Contributing

I don't expect to add any additional functionality to this library, but am potentially open to proposals for better interfaces. Open issues to discuss any questions before making an PRs.

## License

MIT © 2021 Joel Gustafson
