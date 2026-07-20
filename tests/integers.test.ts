import bebyte from "@";
import {
    byteLength,
    encodeReference,
    maximum,
    NON_BYTE_ALIGNED_WIDTHS,
    readInteger,
    WIDTHS,
    writeInteger
} from "@test/fixtures";

describe("unsigned integer methods", () => {
    test.each(WIDTHS)("i%i writes exact big-endian bytes and round-trips its range", bits => {
        const max = maximum(bits);
        const values = [0n, 1n, max / 2n, max];

        for (const value of values) {
            const writer = bebyte.writer();
            writeInteger(writer, bits, bits <= 32 ? Number(value) : value);

            expect(writer.offset).toBe(byteLength(bits));
            expect(writer.toUint8Array()).toEqual(encodeReference(bits, value));

            const reader = bebyte.reader(writer.toUint8Array());
            const decoded = readInteger(reader, bits);
            expect(decoded).toBe(bits <= 32 ? Number(value) : value);
            expect(typeof decoded).toBe(bits <= 32 ? "number" : "bigint");
            expect(reader.remaining).toBe(0);
        }
    });

    test.each(WIDTHS)("i%i rejects negative and overflowing values atomically", bits => {
        for (const invalid of [-1n, maximum(bits) + 1n]) {
            const writer = bebyte.writer();
            expect(() => writeInteger(writer, bits, invalid)).toThrow(RangeError);
            expect(writer.offset).toBe(0);
            expect(writer.length).toBe(0);
            expect(writer.toUint8Array()).toEqual(new Uint8Array());
        }
    });

    test.each(WIDTHS)("i%i rejects truncated storage without consuming input", bits => {
        const reader = bebyte.reader(new Uint8Array(byteLength(bits) - 1));
        expect(() => readInteger(reader, bits)).toThrow(RangeError);
        expect(reader.offset).toBe(0);
    });

    test.each(NON_BYTE_ALIGNED_WIDTHS)("i%i rejects non-zero unused high bits", bits => {
        const firstInvalid = 1n << BigInt(bits);
        const reader = bebyte.reader(encodeReference(bits, firstInvalid));
        expect(() => readInteger(reader, bits)).toThrow(`exceeds unsigned ${bits}-bit range`);
        expect(reader.offset).toBe(0);
    });

    test("composes every width in one sequential stream", () => {
        const values = WIDTHS.map(bits => maximum(bits) / 3n);
        const writer = bebyte.writer();

        WIDTHS.forEach((bits, index) => writeInteger(writer, bits, values[index]!));
        expect(writer.length).toBe(WIDTHS.reduce((total, bits) => total + byteLength(bits), 0));

        const reader = bebyte.reader(writer.toUint8Array());
        WIDTHS.forEach((bits, index) => {
            const expected = values[index]!;
            expect(readInteger(reader, bits)).toBe(bits <= 32 ? Number(expected) : expected);
        });
        expect(reader.remaining).toBe(0);
    });

    test("matches deterministic fuzz vectors across every width", () => {
        const cases: Array<{bits: (typeof WIDTHS)[number]; value: bigint}> = [];
        const expectedParts: Uint8Array[] = [];
        const writer = bebyte.writer();
        let state = 0x9e3779b97f4a7c15n;

        for (let round = 0; round < 32; round++) {
            for (const bits of WIDTHS) {
                state ^= state << 13n;
                state ^= state >> 7n;
                state ^= state << 17n;
                state = BigInt.asUintN(64, state);
                const value = state & maximum(bits);
                cases.push({bits, value});
                expectedParts.push(encodeReference(bits, value));
                writeInteger(writer, bits, bits <= 32 ? Number(value) : value);
            }
        }

        const expectedLength = expectedParts.reduce((total, part) => total + part.length, 0);
        const expected = new Uint8Array(expectedLength);
        let offset = 0;
        for (const part of expectedParts) {
            expected.set(part, offset);
            offset += part.length;
        }
        expect(writer.toUint8Array()).toEqual(expected);

        const reader = bebyte.reader(expected);
        for (const {bits, value} of cases) {
            expect(readInteger(reader, bits)).toBe(bits <= 32 ? Number(value) : value);
        }
        expect(reader.remaining).toBe(0);
    });

    test("accepts bigint at small widths and exact numbers at large widths", () => {
        const writer = bebyte.writer();
        writer.i8(255n);
        writer.i64(Number.MAX_SAFE_INTEGER);

        const reader = bebyte.reader(writer.toUint8Array());
        expect(reader.i8()).toBe(255);
        expect(reader.i64()).toBe(BigInt(Number.MAX_SAFE_INTEGER));
    });

    test.each([NaN, Infinity, -Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1])(
        "rejects the non-exact number %s",
        value => {
            const writer = bebyte.writer();
            expect(() => writer.i64(value)).toThrow(RangeError);
            expect(writer.offset).toBe(0);
        }
    );

    test("skipValidation preserves the legacy low-storage-bits fast path", () => {
        const writer = bebyte.writer();
        writer.i1(-1, true);
        writer.i9(0xffff, true);
        writer.i64(-1n, true);

        expect(writer.toUint8Array()).toEqual(new Uint8Array([
            0xff,
            0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        ]));
    });

    test("rejects non-canonical high bits without consuming reader input", () => {
        const reader = bebyte.reader(new Uint8Array([0x80]));
        expect(() => reader.i7()).toThrow("exceeds unsigned 7-bit range");
        expect(reader.offset).toBe(0);
        expect(reader.i8()).toBe(0x80);
    });

    test("matches an independent 64-bit network-order vector", () => {
        const value = 0x0123456789abcdefn;
        const writer = bebyte.writer();
        writer.i64(value);
        expect(writer.toUint8Array()).toEqual(new Uint8Array([
            0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef
        ]));
        expect(bebyte.reader(writer.toUint8Array()).i64()).toBe(value);
    });
});
