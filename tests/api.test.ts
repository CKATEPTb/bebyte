import bebyte from "@";
import type {ByteReader, ByteWriter} from "@";
import {WIDTHS} from "@test/fixtures";

describe("public API", () => {
    test("exposes only the reader and writer factories at runtime", () => {
        expect(Object.keys(bebyte).sort()).toEqual(["reader", "writer"]);
    });

    test("creates independent processors", () => {
        const first = bebyte.writer();
        const second = bebyte.writer();
        first.i8(1);
        second.i8(2);
        expect(first.toUint8Array()).toEqual(new Uint8Array([1]));
        expect(second.toUint8Array()).toEqual(new Uint8Array([2]));
    });

    test("installs every documented integer method as a non-enumerable prototype method", () => {
        const writer = bebyte.writer();
        const reader = bebyte.reader(new Uint8Array(288));

        for (const bits of WIDTHS) {
            expect(typeof writer[`i${bits}`]).toBe("function");
            expect(typeof reader[`i${bits}`]).toBe("function");
        }
        expect(Object.keys(writer)).not.toContain("i8");
        expect(Object.keys(reader)).not.toContain("i8");
    });

    test("preserves named TypeScript reader and writer contracts", () => {
        const writer: ByteWriter = bebyte.writer();
        writer.i32(1);
        writer.i33(2n);

        const reader: ByteReader = bebyte.reader(writer.toUint8Array());
        const small: number = reader.i32();
        const large: bigint = reader.i33();
        expect([small, large]).toEqual([1, 2n]);
    });
});
