import ByteProcessor from "@/ByteProcessor";

/**
 * ByteReader is a utility class for sequentially reading unsigned integers and byte sequences
 * from a given Uint8Array buffer, using **Big Endian** byte order for multi-byte reads.
 *
 * Extends: ByteProcessor
 */
export default class ByteReader extends ByteProcessor {
    private readonly view: DataView<ArrayBufferLike>

    /**
     * Creates a new ByteReader for reading from the specified buffer.
     *
     * @param {Uint8Array} buffer - The byte buffer to read from.
     */
    public constructor(private readonly buffer: Uint8Array) {
        super();
        this.view = new DataView(buffer.buffer)
    }

    /**
     * Reads an unsigned 8-bit integer.
     *
     * @returns {number} An integer between 0 and 255.
     */
    public i8(): number {
        return this.view.getUint8(this.offset++)
    }

    /**
     * Reads an unsigned 16-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 65535.
     */
    public i16(): number {
        const offset = this.offset
        this.offset += 2
        return this.view.getUint16(offset, false)
    }

    /**
     * Reads an unsigned 24-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 16,777,215.
     */
    public i24(): number {
        return this.i8() << 16 | this.i8() << 8 | this.i8()
    }

    /**
     * Reads an unsigned 32-bit integer using **Big Endian** byte order.
     *
     * @returns {number} An integer between 0 and 4,294,967,295.
     */
    public i32(): number {
        const offset = this.offset
        this.offset += 4
        return this.view.getUint32(offset, false)
    }

    /**
     * Reads an unsigned 40-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 1_099_511_627_775n.
     */
    public i40(): bigint {
        return (BigInt(this.i8()) << 32n) |
            (BigInt(this.i8()) << 24n) |
            (BigInt(this.i8()) << 16n) |
            (BigInt(this.i8()) << 8n) |
            BigInt(this.i8());
    }

    /**
     * Reads an unsigned 48-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 281_474_976_710_655n.
     */
    public i48(): bigint {
        return (BigInt(this.i8()) << 40n) | this.i40();
    }

    /**
     * Reads an unsigned 56-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 72_057_594_037_927_935n.
     */
    public i56(): bigint {
        return (BigInt(this.i8()) << 48n) | this.i48();
    }

    /**
     * Reads an unsigned 64-bit integer using **Big Endian** byte order.
     *
     * @returns {bigint} A bigint between 0n and 18_446_744_073_709_551_615n.
     */
    public i64(): bigint {
        const offset = this.offset
        this.offset += 8
        return this.view.getBigUint64(offset, false)
    }

    /**
     * Reads the next `length` bytes from the current position in the buffer.
     *
     * @param {number} length - Number of bytes to read.
     * @returns {Uint8Array} A slice of the buffer containing the requested bytes.
     */
    public read(length: number): Uint8Array {
        return this.buffer.slice(this.offset, this.offset += length);
    }

    /**
     * Reads all remaining bytes from the current position to the end of the buffer.
     *
     * @returns {Uint8Array} A slice of the buffer from current position to end.
     */
    public readRemaining(): Uint8Array {
        return this.read(this.buffer.length)
    }

    /**
     * Returns the original byte buffer.
     *
     * @returns {Uint8Array} The full underlying buffer.
     */
    public toUint8Array(): Uint8Array {
        return this.buffer;
    }
}