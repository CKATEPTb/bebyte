import ByteProcessor from "@/ByteProcessor";

type offset = number
type uint = number | bigint
type operation = 'setUint8' | 'setUint16' | 'setUint32' | 'setBigUint64'

/**
 * ByteWriter is a low-level utility for writing unsigned integers of arbitrary bit-length
 * (from 1 to 64 bits) into a buffer using **Big Endian** byte order.
 *
 * Supports incremental writes and serialization to Uint8Array.
 *
 * Inherits from ByteProcessor.
 */
export default class ByteWriter extends ByteProcessor {
    private readonly buffer: Array<[operation, uint, offset]> = []

    /**
     * Writes an unsigned 1-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i1(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 1)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 2-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i2(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 2)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 3-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i3(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 3)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 4-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i4(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 4)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 5-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i5(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 5)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 6-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i6(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 6)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 7-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i7(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 7)
        this.i8(value, true)
    }

    /**
     * Writes an unsigned 8-bit integer into the buffer using 1 byte (i8) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i8(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 8)
        this.buffer.push(['setUint8', value, this.offset])
        this.offset += 1
    }

    /**
     * Writes an unsigned 9-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i9(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 9)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 10-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i10(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 10)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 11-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i11(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 11)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 12-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i12(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 12)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 13-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i13(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 13)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 14-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i14(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 14)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 15-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i15(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 15)
        this.i16(value, true)
    }

    /**
     * Writes an unsigned 16-bit integer into the buffer using 2 byte (i16) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i16(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 16)
        this.buffer.push(['setUint16', value, this.offset])
        this.offset += 2
    }

    /**
     * Writes an unsigned 17-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i17(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 17)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 18-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i18(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 18)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 19-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i19(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 19)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 20-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i20(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 20)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 21-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i21(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 21)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 22-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i22(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 22)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 23-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i23(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 23)
        this.i24(value, true)
    }

    /**
     * Writes an unsigned 24-bit integer into the buffer using 3 byte (i24) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i24(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 24)
        this.i8((value >> 16) & 0xFF, true)
        this.i8((value >> 8) & 0xFF, true)
        this.i8(value & 0xFF, true)
    }

    /**
     * Writes an unsigned 25-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i25(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 25)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 26-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i26(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 26)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 27-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i27(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 27)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 28-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i28(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 28)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 29-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i29(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 29)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 30-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i30(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 30)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 31-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i31(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 31)
        this.i32(value, true)
    }

    /**
     * Writes an unsigned 32-bit integer into the buffer using 4 byte (i32) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i32(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 32)
        this.buffer.push(['setUint32', value, this.offset])
        this.offset += 4
    }

    /**
     * Writes an unsigned 33-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i33(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 33);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 34-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i34(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 34);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 35-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i35(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 35);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 36-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i36(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 36);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 37-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i37(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 37);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 38-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i38(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 38);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 39-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i39(value: number, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 39);
        this.i40(value, true);
    }

    /**
     * Writes an unsigned 40-bit integer into the buffer using 5 byte (i40) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i40(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 40);
        this.i8(Number((value >> 32n) & 0xFFn), true);
        this.i8(Number((value >> 24n) & 0xFFn), true);
        this.i8(Number((value >> 16n) & 0xFFn), true);
        this.i8(Number((value >> 8n) & 0xFFn), true);
        this.i8(Number(value & 0xFFn), true);
    }

    /**
     * Writes an unsigned 41-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i41(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 41);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 42-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i42(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 42);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 43-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i43(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 43);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 44-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i44(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 44);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 45-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i45(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 45);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 46-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i46(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 46);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 47-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i47(value: number | bigint, skipValidation = false) {
        if (typeof value !== "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 47);
        this.i48(value, true);
    }

    /**
     * Writes an unsigned 48-bit integer into the buffer using 6 byte (i48) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i48(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 48);
        this.i8(Number((value >> 40n) & 0xFFn));
        this.i40(value, true)
    }

    /**
     * Writes an unsigned 49-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i49(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 49);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 50-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i50(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 50);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 51-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i51(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 51);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 52-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {number | bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i52(value: number | bigint, skipValidation = false) {
        if (typeof value != "bigint") value = BigInt(value);
        skipValidation || this.validateBitLength(value, 52);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 53-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i53(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 53);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 54-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i54(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 54);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 55-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i55(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 55);
        this.i56(value, true);
    }

    /**
     * Writes an unsigned 56-bit integer into the buffer using 7 byte (i56) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i56(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 56);
        this.i8(Number((value >> 48n) & 0xFFn));
        this.i48(value, true)
    }

    /**
     * Writes an unsigned 57-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i57(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 57);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 58-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i58(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 58);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 59-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i59(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 59);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 60-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i60(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 60);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 61-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i61(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 61);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 62-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i62(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 62);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 63-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i63(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 63);
        this.i64(value, true);
    }

    /**
     * Writes an unsigned 64-bit integer into the buffer using 8 byte (i63) in **Big Endian** order
     *
     * @param {bigint} value - The unsigned integer to write.
     * @param {boolean} [skipValidation=false] - If true, skips bit-length validation.
     */
    public i64(value: bigint, skipValidation = false) {
        skipValidation || this.validateBitLength(value, 64);
        this.buffer.push(['setBigUint64', value, this.offset])
        this.offset += 8
    }

    /**
     * Writes a sequence of raw bytes to the buffer (without changing byte order).
     *
     * @param {Uint8Array} bytes - Raw bytes to write directly.
     */
    public write(bytes: Uint8Array) {
        bytes.forEach(value => this.i8(value))
    }

    /**
     * Finalizes all buffered write operations and returns a Uint8Array.
     * All multibyte values are written in **Big Endian** format.
     *
     * @returns {Uint8Array} A finalized byte array representing all written data.
     */
    public toUint8Array(): Uint8Array {
        const buffer = new Uint8Array(this.offset)
        if (this.offset == 0) return buffer
        const dataView = new DataView(buffer.buffer)
        while (this.buffer.length > 0) {
            const [operation, uint, offset] = this.buffer.shift()!;
            switch (operation) {
                case "setUint8":
                    dataView.setUint8(offset, uint as number)
                    break
                case "setUint16":
                    dataView.setUint16(offset, uint as number, false)
                    break
                case "setUint32":
                    dataView.setUint32(offset, uint as number, false)
                    break
                case "setBigUint64":
                    dataView.setBigUint64(offset, uint as bigint, false)
                    break
            }
        }
        return buffer
    }

    /**
     * Validates that a given value fits within a specified unsigned bit-length.
     *
     * @param {number} value - The value to validate.
     * @param {number} bits - Bit size (1–64) to validate against.
     * @throws {Error} If the value is out of bounds for the given bit-length.
     */
    private validateBitLength(value: number | bigint, bits: number) {
        if (typeof value != "bigint") value = BigInt(value)
        const max = (1n << BigInt(bits)) - 1n
        if (value < 0 || value > max) {
            throw new Error(`Illegal value. ${value} is out of Uint${bits}`)
        }
    }
}