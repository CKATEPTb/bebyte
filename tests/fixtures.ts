import type {
    BitWidth,
    IntegerReaderMethods,
    IntegerWriterMethods,
    UnsignedInteger
} from "@/integer/types";

/** Every public integer width in ascending order. */
export const WIDTHS = Array.from({length: 64}, (_, index) => index + 1) as BitWidth[];

/** Widths whose physical storage contains unused high bits. */
export const NON_BYTE_ALIGNED_WIDTHS = WIDTHS.filter(bits => bits % 8 !== 0);

/** Number of whole bytes used to store a width. */
export const byteLength = (bits: BitWidth): number => Math.ceil(bits / 8);

/** Largest unsigned value accepted by a width. */
export const maximum = (bits: BitWidth): bigint => (1n << BigInt(bits)) - 1n;

/** Independent reference encoder used to verify library output. */
export function encodeReference(bits: BitWidth, value: bigint): Uint8Array {
    const result = new Uint8Array(byteLength(bits));
    let remaining = BigInt.asUintN(result.length * 8, value);
    for (let index = result.length - 1; index >= 0; index--) {
        result[index] = Number(remaining & 0xffn);
        remaining >>= 8n;
    }
    return result;
}

/** Invokes a statically declared width-specific writer method. */
export function writeInteger(
    writer: IntegerWriterMethods,
    bits: BitWidth,
    value: UnsignedInteger,
    skipValidation = false
): void {
    writer[`i${bits}`](value, skipValidation);
}

/** Invokes a statically declared width-specific reader method. */
export function readInteger(reader: IntegerReaderMethods, bits: BitWidth): number | bigint {
    return reader[`i${bits}`]();
}
