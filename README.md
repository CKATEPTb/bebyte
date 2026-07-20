# bebyte

Read and write unsigned big-endian integers and raw `Uint8Array` data.

```bash
npm install bebyte
```

Works in browsers, Node.js, and workers. The package is ESM-only and includes
TypeScript types.

## Usage

```ts
import bebyte from "bebyte";

const writer = bebyte.writer();
writer.i8(0xab);
writer.i16(0xcdef);
writer.i24(0x123456);
writer.i64(0x0123456789abcdefn);

const bytes = writer.toUint8Array();

const reader = bebyte.reader(bytes);
reader.i8();  // 171
reader.i16(); // 52719
reader.i24(); // 1193046
reader.i64(); // 81985529216486895n
```

## Integer widths

Every method from `i1` through `i64` is available.

`iN` stores an unsigned N-bit value in `ceil(N / 8)` complete bytes. Values are
not packed together at the bit level.

| Methods | Bytes | Reader returns |
| --- | ---: | --- |
| `i1` - `i8` | 1 | `number` |
| `i9` - `i16` | 2 | `number` |
| `i17` - `i24` | 3 | `number` |
| `i25` - `i32` | 4 | `number` |
| `i33` - `i40` | 5 | `bigint` |
| `i41` - `i48` | 6 | `bigint` |
| `i49` - `i56` | 7 | `bigint` |
| `i57` - `i64` | 8 | `bigint` |

Writer methods accept `number` or `bigint`. Use bigint for values above
`Number.MAX_SAFE_INTEGER`.

```ts
writer.i7(127);
writer.i32(4_294_967_295);
writer.i48(281_474_976_710_655n);
writer.i64(18_446_744_073_709_551_615n);
```

Out-of-range, negative, fractional, and unsafe number values throw
`RangeError`.

## Raw bytes

```ts
const writer = bebyte.writer();
writer.i16(3);
writer.write(new Uint8Array([1, 2, 3]));

const reader = bebyte.reader(writer.toUint8Array());
const length = reader.i16();
const payload = reader.read(length);
```

- `read(length)` and `readRemaining()` return copies.
- `viewBytes(length)` and `viewRemaining()` return zero-copy views.
- Truncated reads throw `RangeError` without moving the reader cursor.

## Cursor

Both processors expose `offset`:

```ts
reader.offset = 4;
writer.offset = 2;
```

Moving a writer backwards overwrites existing bytes. Moving it beyond the
current `length` creates a zero-filled gap.

Pass an expected capacity when the output size is known:

```ts
const writer = bebyte.writer(4096);
```

## TypeScript

`ByteReader` and `ByteWriter` are type-only named exports:

```ts
import bebyte, {type ByteReader, type ByteWriter} from "bebyte";

function encode(writer: ByteWriter): void {
    writer.i24(0xffffff);
}

function decode(reader: ByteReader): bigint {
    return reader.i48();
}
```

## Development

```bash
npm install
npm test
npm run build
```

## License

[MIT](LICENSE.md)
