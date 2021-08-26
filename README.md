# big-varint

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Encode and decode signed and unsigned BigInts

## Table of Contents

- [Install](#install)
- [Usage](#usage)
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

const data = signed.encode(i) // Uint8Array(2) [ 215, 4 ]
```

### Decode a Signed Varint

```typescript
import { signed } from "big-varint"

const data = new Uint8Array([215, 4])

const i = signed.decode(data) // -300n
```

### Encode an Unsigned Varint

```typescript
import { unsigned } from "big-varint"

const i = 123456789012345678901234567890n

const data = unsigned.encode(i)

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

## Testing

Tests use [AVA 4](https://github.com/avajs/ava) (currently in alpha) and live in the [test](./test/) directory.

```
npm run test
```

## Contributing

PRs accepted!

## License

MIT © 2021 Joel Gustafson
