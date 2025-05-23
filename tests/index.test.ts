import {Buffer, ByteReader, ByteWriter} from "@/index";

describe("iN read/write", () => {
    const testValue = (bits: number, value: number | bigint) => {
        const writer = Buffer.writer();
        const methodName = `i${bits}` as keyof ByteWriter;

        (writer[methodName] as Function).call(writer, value);
        const buffer = writer.toUint8Array();

        const reader = Buffer.reader(buffer);
        const readMethod = `i${bits}` as keyof ByteReader;
        const result = (reader[readMethod] as Function).call(reader);

        expect(result).toEqual(value);
    };

    test("i8 round-trip", () => testValue(8, 0xAB));
    test("i16 round-trip", () => testValue(16, 0xABCD));
    test("i24 round-trip", () => testValue(24, 0xABCDEF));
    test("i32 round-trip", () => testValue(32, 0xABCDEF01));
    test("i40 round-trip", () => testValue(40, 0xABCDEF0123n));
    test("i48 round-trip", () => testValue(48, 0xABCDEF012345n));
    test("i56 round-trip", () => testValue(56, 0xABCDEF01234567n));
    test("i64 round-trip", () => testValue(64, 0xABCDEF0123456789n));
});

describe("validate edge cases", () => {
    it("should throw if i8 is out of bounds", () => {
        const writer = Buffer.writer();
        expect(() => writer.i8(300)).toThrow();
    });

    it("should throw if i40 receives too large value", () => {
        const writer = Buffer.writer();
        expect(() => writer.i40(0xFFFFFFFFFFFn)).toThrow();
    });
});