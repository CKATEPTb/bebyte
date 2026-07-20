import bebyte from "@";

describe("ByteReader", () => {
    test("honors Uint8Array byteOffset and byteLength", () => {
        const backing = new Uint8Array([0xee, 0xee, 0x12, 0x34, 0xdd]);
        const input = backing.subarray(2, 4);
        const reader = bebyte.reader(input);

        expect(reader.length).toBe(2);
        expect(reader.toUint8Array()).toBe(input);
        expect(reader.i16()).toBe(0x1234);
        expect(reader.remaining).toBe(0);
    });

    test("copies read results but offers an explicit zero-copy view", () => {
        const input = new Uint8Array([1, 2, 3, 4]);
        const reader = bebyte.reader(input);
        const copy = reader.read(2);
        const view = reader.viewBytes(2);

        copy[0] = 9;
        view[0] = 8;
        expect(input).toEqual(new Uint8Array([1, 2, 8, 4]));
        expect(copy).toEqual(new Uint8Array([9, 2]));
    });

    test("readRemaining advances exactly to the end", () => {
        const reader = bebyte.reader(new Uint8Array([1, 2, 3, 4]));
        expect(reader.i8()).toBe(1);
        expect(reader.readRemaining()).toEqual(new Uint8Array([2, 3, 4]));
        expect(reader.offset).toBe(4);
        expect(reader.remaining).toBe(0);
        expect(reader.readRemaining()).toEqual(new Uint8Array());
    });

    test("viewRemaining is zero-copy and consumes the remaining range", () => {
        const input = new Uint8Array([1, 2, 3]);
        const reader = bebyte.reader(input);
        reader.offset = 1;
        const remaining = reader.viewRemaining();
        remaining[0] = 9;

        expect(input).toEqual(new Uint8Array([1, 9, 3]));
        expect(reader.offset).toBe(3);
    });

    test("truncated reads fail before moving the cursor", () => {
        const reader = bebyte.reader(new Uint8Array(7));
        expect(() => reader.i64()).toThrow("only 7 byte(s) remain");
        expect(reader.offset).toBe(0);
        expect(() => reader.read(8)).toThrow("only 7 byte(s) remain");
        expect(reader.offset).toBe(0);
    });

    test.each([-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
        "rejects invalid read length %s atomically",
        length => {
            const reader = bebyte.reader(new Uint8Array([1]));
            expect(() => reader.read(length)).toThrow(RangeError);
            expect(reader.offset).toBe(0);
        }
    );

    test("validates manual offsets and permits the exact end position", () => {
        const reader = bebyte.reader(new Uint8Array([1, 2]));
        reader.offset = 2;
        expect(reader.remaining).toBe(0);

        for (const value of [-1, 1.5, 3, Number.MAX_SAFE_INTEGER + 1]) {
            expect(() => {
                reader.offset = value;
            }).toThrow(RangeError);
            expect(reader.offset).toBe(2);
        }
    });

    test("zero-length reads are valid and do not move the cursor", () => {
        const reader = bebyte.reader(new Uint8Array([1]));
        expect(reader.read(0)).toEqual(new Uint8Array());
        expect(reader.viewBytes(0)).toEqual(new Uint8Array());
        expect(reader.offset).toBe(0);
    });
});
