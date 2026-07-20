# bebyte

`bebyte` is a strict, dependency-free TypeScript library for reading and
writing unsigned big-endian integers and raw bytes. It is distributed under
the permissive [MIT License](LICENSE.md).

```bash
npm install bebyte
```

It works with standard `Uint8Array` values in browsers, Node.js, workers, and
other modern JavaScript runtimes. Both ESM and CommonJS builds are included.

## Quick start

```ts
import bebyte from "bebyte";

const writer = bebyte.writer();
writer.i8(0xab);
writer.i16(0xcdef);
writer.i24(0x123456);
writer.i64(0x0123456789abcdefn);
writer.write(new Uint8Array([0xfe, 0xff]));

const bytes = writer.toUint8Array();
// ab cd ef 12 34 56 01 23 45 67 89 ab cd ef fe ff

const reader = bebyte.reader(bytes);
reader.i8();  // 171
reader.i16(); // 52719
reader.i24(); // 1193046
reader.i64(); // 81985529216486895n
reader.readRemaining(); // Uint8Array [254, 255]
```

Every multi-byte value uses big-endian byte order, also called network byte
order. No platform-specific byte order is involved.

## Integer widths

Readers and writers provide every method from `i1` through `i64`:

```ts
const writer = bebyte.writer();
writer.i3(7);       // one byte: 07
writer.i9(0x101);   // two bytes: 01 01
writer.i31(123456); // four bytes
writer.i40(1n);     // five bytes
writer.i63(2n);     // eight bytes
```

`iN` means an **unsigned N-bit integer**. It does not mean a signed integer and
it does not pack multiple values into the same byte. Each value occupies
`ceil(N / 8)` complete bytes:

| Methods | Storage | Reader result |
| --- | ---: | --- |
| `i1` - `i8` | 1 byte | `number` |
| `i9` - `i16` | 2 bytes | `number` |
| `i17` - `i24` | 3 bytes | `number` |
| `i25` - `i32` | 4 bytes | `number` |
| `i33` - `i40` | 5 bytes | `bigint` |
| `i41` - `i48` | 6 bytes | `bigint` |
| `i49` - `i56` | 7 bytes | `bigint` |
| `i57` - `i64` | 8 bytes | `bigint` |

Writer methods accept `number` or `bigint`. A `number` must be a safe integer;
use bigint literals for values above `Number.MAX_SAFE_INTEGER`:

```ts
writer.i32(4_294_967_295);
writer.i48(281_474_976_710_655n);
writer.i64(18_446_744_073_709_551_615n);
```

Values are range-checked against the declared width. For example, `i7(128)`
throws even though one physical byte could contain it. A reader applies the
same canonical-range check to widths that do not end on a byte boundary.

## Writing

### Reserve capacity

Pass an optional capacity when the approximate output size is known. Capacity
is only a memory hint; the produced output still starts empty.

```ts
const writer = bebyte.writer(4096);
writer.write(payload);
```

Without a hint, the internal buffer grows geometrically. Raw byte arrays are
copied with one `Uint8Array#set` operation instead of one operation per byte.

### Obtain output

```ts
const first = writer.toUint8Array();
const second = writer.toUint8Array();
```

`toUint8Array()` returns a stable copy. It does not drain the writer, and
mutating the returned array cannot corrupt future output.

### Reposition the cursor

```ts
const writer = bebyte.writer();
writer.i32(0x01020304);
writer.offset = 1;
writer.i16(0xaabb);

writer.toUint8Array(); // 01 aa bb 04
writer.length;         // 4
writer.offset;         // 3
```

Moving `offset` backwards overwrites existing bytes without truncating bytes
after the cursor. Moving it beyond `length` creates a zero-filled gap.

## Reading

Creating a reader does not copy its input:

```ts
const packet = new Uint8Array([0xff, 0x12, 0x34, 0xee]);
const reader = bebyte.reader(packet.subarray(1, 3));

reader.length;    // 2
reader.remaining; // 2
reader.i16();     // 0x1234
reader.remaining; // 0
```

`Uint8Array.subarray()` views are handled correctly. The reader respects both
the view's `byteOffset` and `byteLength` and never reads adjacent backing-buffer
data.

### Copy or zero-copy

```ts
const copied = reader.read(16);
const shared = reader.viewBytes(16);

const copiedTail = reader.readRemaining();
const sharedTail = reader.viewRemaining();
```

- `read()` and `readRemaining()` return independent copies.
- `viewBytes()` and `viewRemaining()` avoid allocation, but returned arrays
  share memory with the original input.
- `reader.toUint8Array()` returns the original input view and does not move the
  cursor.

Use zero-copy methods for hot parsing paths when the source buffer remains
valid and must not be isolated from consumers.

## Error behavior

The library throws `RangeError` for:

- negative or overflowing unsigned integers;
- fractional, infinite, `NaN`, or unsafe number values;
- truncated reads;
- negative, fractional, unsafe, or out-of-range reader offsets;
- invalid read lengths or writer capacities.

Validation is atomic from the caller's perspective: a failed read or write does
not advance the cursor or add output bytes.

All integer writer methods retain the optional `skipValidation` argument for
compatibility with specialized codecs:

```ts
writer.i9(value, true);
```

This mode writes the low bits of the method's physical storage width and should
only be used after validation has already happened elsewhere. Normal
application code should omit it.

## TypeScript types

The default export is the complete runtime API. `ByteReader` and `ByteWriter`
are available as type-only named exports:

```ts
import bebyte, {type ByteReader, type ByteWriter} from "bebyte";

function encode(writer: ByteWriter): void {
    writer.i24(0xffffff);
}

function decode(reader: ByteReader): bigint {
    return reader.i48();
}
```

The width-specific return types are inferred: `i32()` returns `number`, while
`i33()` and wider methods return `bigint`.

## Performance model

- Integer writes go directly into a reusable `Uint8Array`.
- Buffer growth is geometric, avoiding a reallocation for every write.
- Raw arrays use bulk copy.
- Common one-to-four-byte reads and number writes avoid bigint allocation.
- Five-to-eight-byte values remain exact with bigint.
- Zero-copy read views are available for allocation-sensitive parsing.
- The package has no runtime dependencies and declares `sideEffects: false`.

## Development

The project uses npm, TypeScript, Vite, and Vitest.

```bash
npm install
npm test
npm run build
```

`npm test` runs strict TypeScript validation followed by the complete test
suite. `npm run build` creates ESM, CommonJS, declarations, declaration maps,
and source maps, then verifies the exact npm package contents.

## License

[MIT](LICENSE.md). You may use, modify, distribute, sublicense, and sell the
software, provided that the copyright and license notice are retained.

Authors: [CKATEPTb](https://github.com/CKATEPTb) and
[FakeIvchenko](https://github.com/FakeIvchenko).
