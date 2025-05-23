/**
 * ByteProcessor is an abstract base class that provides a shared interface
 * for working with byte-oriented data structures. It manages a read/write
 * cursor (`offset`) and requires subclasses to implement a method that exports
 * the current byte data as a Uint8Array.
 */
declare abstract class ByteProcessor {
    protected _offset: number;
    /**
     * The current byte offset used for reading from or writing to a buffer.
     * Can be used to control the read/write position manually.
     */
    get offset(): number;
    /**
     * Sets the current byte offset (cursor) to a new position.
     *
     * @param {number} value - The new offset position.
     */
    set offset(value: number);
    /**
     * Converts the internal state or buffer content into a Uint8Array.
     *
     * @returns {Uint8Array} A byte array representing the internal data.
     */
    abstract toUint8Array(): Uint8Array;
}

/**
 * ByteWriter is a low-level utility for writing unsigned integers of arbitrary bit-length
 * (from 1 to 64 bits) into a buffer using **Big Endian** byte order.
 *
 * Supports incremental writes and serialization to Uint8Array.
 *
 * Inherits from ByteProcessor.
 */
declare class ByteWriter extends ByteProcessor {
    private readonly buffer;
    /**
     * Writes an unsigned 1-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i1(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 2-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i2(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 3-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i3(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 4-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i4(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 5-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i5(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 6-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i6(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 7-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i7(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 8-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i8(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 9-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i9(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 10-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i10(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 11-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i11(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 12-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i12(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 13-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i13(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 14-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i14(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 15-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i15(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 16-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i16(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 17-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i17(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 18-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i18(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 19-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i19(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 20-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i20(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 21-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i21(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 22-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i22(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 23-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i23(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 24-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i24(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 25-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i25(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 26-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i26(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 27-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i27(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 28-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i28(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 29-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i29(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 30-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i30(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 31-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i31(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 32-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i32(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 33-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i33(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 34-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i34(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 35-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i35(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 36-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i36(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 37-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i37(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 38-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i38(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 39-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i39(value: number, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 40-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i40(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 41-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i41(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 42-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i42(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 43-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i43(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 44-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i44(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 45-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i45(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 46-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i46(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 47-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i47(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 48-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i48(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 49-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i49(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 50-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i50(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 51-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i51(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 52-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i52(value: number | bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 53-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i53(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 54-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i54(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 55-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i55(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 56-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i56(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 57-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i57(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 58-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i58(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 59-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i59(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 60-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i60(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 61-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i61(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 62-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i62(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 63-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i63(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes an unsigned 64-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    i64(value: bigint, skipValidation?: boolean): void;
    /**
     * Writes a sequence of raw bytes to the buffer (without changing byte order).
     *
     * @param {Uint8Array} bytes - Raw bytes to write directly.
     */
    write(bytes: Uint8Array): void;
    /**
     * Finalizes all buffered write operations and returns a Uint8Array.
     * All multibyte values are written in **Big Endian** format.
     *
     * @returns {Uint8Array} A finalized byte array representing all written data.
     */
    toUint8Array(): Uint8Array;
    /**
     * Validates that a given value fits within a specified unsigned bit-length.
     *
     * @param {number} value - The value to validate.
     * @param {number} bits - Bit size (1–64) to validate against.
     * @throws {Error} If the value is out of bounds for the given bit-length.
     */
    private validateBitLength;
}

/**
 * ByteReader is a utility class for sequentially reading unsigned integers and byte sequences
 * from a given Uint8Array buffer, using **Big Endian** byte order for multi-byte reads.
 *
 * Extends: ByteProcessor
 */
declare class ByteReader extends ByteProcessor {
    private readonly buffer;
    private readonly view;
    /**
     * Creates a new ByteReader for reading from the specified buffer.
     *
     * @param {Uint8Array} buffer - The byte buffer to read from.
     */
    constructor(buffer: Uint8Array);
    /**
     * Reads an unsigned 8-bit integer.
     *
     * @returns {number} An integer between 0 and 255.
     */
    i8(): number;
    /**
     * Reads an unsigned 16-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 65535.
     */
    i16(): number;
    /**
     * Reads an unsigned 24-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 16,777,215.
     */
    i24(): number;
    /**
     * Reads an unsigned 32-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 4,294,967,295.
     */
    i32(): number;
    /**
     * Reads an unsigned 40-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 1_099_511_627_775n.
     */
    i40(): bigint;
    /**
     * Reads an unsigned 48-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 281_474_976_710_655n.
     */
    i48(): bigint;
    /**
     * Reads an unsigned 56-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 72_057_594_037_927_935n.
     */
    i56(): bigint;
    /**
     * Reads an unsigned 64-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 18_446_744_073_709_551_615n.
     */
    i64(): bigint;
    /**
     * Reads the next `length` bytes from the current position in the buffer.
     *
     * @param {number} length - Number of bytes to read.
     * @returns {Uint8Array} A slice of the buffer containing the requested bytes.
     */
    read(length: number): Uint8Array;
    /**
     * Reads all remaining bytes from the current position to the end of the buffer.
     *
     * @returns {Uint8Array} A slice of the buffer from current position to end.
     */
    readRemaining(): Uint8Array;
    /**
     * Returns the original byte buffer.
     *
     * @returns {Uint8Array} The full underlying buffer.
     */
    toUint8Array(): Uint8Array;
}

declare const Buffer: {
    writer: () => ByteWriter;
    reader: (buffer: Uint8Array) => ByteReader;
};

export { Buffer, ByteReader, ByteWriter };
