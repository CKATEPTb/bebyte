import bebyte from "@";

describe("ByteWriter", () => {
    test("writes mixed integers and bytes directly in network order", () => {
        const writer = bebyte.writer();
        writer.i8(0x12);
        writer.i16(0x3456);
        writer.i24(0x789abc);
        writer.i32(0xdef01234);
        writer.write(new Uint8Array([0x56, 0x78]));

        expect(writer.toUint8Array()).toEqual(new Uint8Array([
            0x12,
            0x34, 0x56,
            0x78, 0x9a, 0xbc,
            0xde, 0xf0, 0x12, 0x34,
            0x56, 0x78
        ]));
    });

    test("serializing repeatedly neither drains state nor exposes mutable storage", () => {
        const writer = bebyte.writer();
        writer.i16(0x1234);

        const first = writer.toUint8Array();
        first[0] = 0xff;
        expect(writer.toUint8Array()).toEqual(new Uint8Array([0x12, 0x34]));

        writer.i8(0x56);
        expect(writer.toUint8Array()).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
    });

    test("uses the cursor to overwrite without truncating later bytes", () => {
        const writer = bebyte.writer();
        writer.i32(0x01020304);
        writer.offset = 1;
        writer.i16(0xaabb);

        expect(writer.offset).toBe(3);
        expect(writer.length).toBe(4);
        expect(writer.toUint8Array()).toEqual(new Uint8Array([0x01, 0xaa, 0xbb, 0x04]));
    });

    test("moving forward creates a deterministic zero-filled gap", () => {
        const writer = bebyte.writer();
        writer.offset = 3;
        writer.i8(7);

        expect(writer.length).toBe(4);
        expect(writer.toUint8Array()).toEqual(new Uint8Array([0, 0, 0, 7]));
    });

    test("an initial capacity reserves memory without changing output", () => {
        const writer = bebyte.writer(1024);
        expect(writer.offset).toBe(0);
        expect(writer.length).toBe(0);
        expect(writer.toUint8Array()).toEqual(new Uint8Array());
        writer.i8(1);
        expect(writer.toUint8Array()).toEqual(new Uint8Array([1]));
    });

    test.each([-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
        "rejects invalid initial capacity %s",
        capacity => expect(() => bebyte.writer(capacity)).toThrow(RangeError)
    );

    test("validates manual offsets without changing existing state", () => {
        const writer = bebyte.writer();
        writer.i8(1);

        for (const value of [-1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
            expect(() => {
                writer.offset = value;
            }).toThrow(RangeError);
            expect(writer.offset).toBe(1);
            expect(writer.toUint8Array()).toEqual(new Uint8Array([1]));
        }
    });

    test("bulk-writes a multi-megabyte payload without per-byte API calls", () => {
        const payload = new Uint8Array(2 * 1024 * 1024);
        for (let index = 0; index < payload.length; index++) payload[index] = index & 0xff;

        const writer = bebyte.writer(payload.length);
        writer.write(payload.subarray(1, payload.length - 1));
        const output = writer.toUint8Array();

        expect(output.length).toBe(payload.length - 2);
        expect(output.subarray(0, 4)).toEqual(new Uint8Array([1, 2, 3, 4]));
        expect(output.subarray(-4)).toEqual(new Uint8Array([0xfb, 0xfc, 0xfd, 0xfe]));
    });

    test("writing an empty view is a no-op", () => {
        const writer = bebyte.writer();
        writer.write(new Uint8Array());
        expect(writer.offset).toBe(0);
        expect(writer.toUint8Array()).toEqual(new Uint8Array());
    });
});
