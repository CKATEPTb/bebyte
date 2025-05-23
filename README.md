The **bebyte** is a lightweight TypeScript library for reading and writing unsigned integers from **1 to 64 bits** in **Big Endian** format.

## Features

- Supports unsigned integers of arbitrary bit width: `i1` through `i64`
- Big Endian byte order (network order)
- Seamless encoding and decoding using `Uint8Array`
- Type-safe and optimized for binary protocols

## Installation

To install the package using **npm**:

```bash
npm install CKATEPTb/bebyte#production
```

To install the package using **pnpm**:

```bash
pnpm install CKATEPTb/bebyte#production
```

To install the package using **yarn**:

```bash
yarn install CKATEPTb/bebyte#production
```

## Usage
```typescript
import {Buffer} from "bebyte";

const writer = Buffer.writer()
writer.i8(0xAB)
writer.i16(0xABCD)
writer.i24(0xABCDEF)
writer.i32(0xABCDEF01)
writer.i40(0xABCDEF0123n)
writer.i48(0xABCDEF012345n)
writer.i54(0xABCDEF01234567n)
writer.i64(0xABCDEF0123456789n)
const array = writer.toUint8Array()

const reader = Buffer.reader(array)
reader.i8()
reader.i16()
reader.i24()
reader.i32()
reader.i40()
reader.i48()
reader.i56()
reader.i64()
```

## Contributing

### 1. Clone the repository:

```bash
git clone https://github.com/CKATEPTb/bebyte.git
```

### 2. Install dependencies::

```bash
pnpm install
```

### 3. Run the build::

```bash
pnpm run build
```

## License

### This project is licensed under the LGPL-3.0-only License.

See the LICENSE.md file for details.

## Author

### [CKATEPTb](https://github.com/CKATEPTb), [FakeIvchenko](https://github.com/FakeIvchenko)

Feel free to open issues and submit pull requests to improve the library!