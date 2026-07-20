import ByteProcessor from "@/core/ByteProcessor";
import type {
    BitWidth,
    IntegerWriterMethods,
    UnsignedInteger
} from "@/integer/types";

const MIN_CAPACITY = 16;

/**
 * Growable big-endian writer for unsigned one-to-64-bit integers and raw bytes.
 *
 * Values are written directly into a geometrically growing byte array. This
 * keeps both repeated integer writes and large payload writes linear in the
 * produced byte count.
 */
class ByteWriter extends ByteProcessor {
    private bytes: Uint8Array<ArrayBuffer>;
    private view: DataView<ArrayBuffer>;
    private lengthValue = 0;

    /**
     * Creates a writer.
     *
     * @param initialCapacity Optional allocation hint. The output is empty
     * regardless of the reserved capacity.
     */
    public constructor(initialCapacity = 0) {
        super();
        this.assertOffset(initialCapacity);
        this.bytes = new Uint8Array(initialCapacity);
        this.view = new DataView(this.bytes.buffer);
    }

    /** Number of bytes currently present in the output. */
    public get length(): number {
        return this.lengthValue;
    }

    /** Current zero-based write position. */
    public override get offset(): number {
        return this._offset;
    }

    /**
     * Moves the write cursor. Moving beyond the current output appends a
     * zero-filled gap; moving backwards allows existing bytes to be replaced.
     */
    public override set offset(value: number) {
        this.assertOffset(value);
        if (value > this.lengthValue) {
            this.ensureCapacity(value);
            this.bytes.fill(0, this.lengthValue, value);
            this.lengthValue = value;
        }
        this._offset = value;
    }

    /** Appends or overwrites raw bytes with one bulk copy. */
    public write(value: Uint8Array): void {
        const end = this.endOffset(value.byteLength);
        this.ensureCapacity(end);
        this.bytes.set(value, this._offset);
        this.commit(end);
    }

    /**
     * Returns a stable copy containing exactly the current output.
     * Calling this method does not drain or reset the writer.
     */
    public override toUint8Array(): Uint8Array {
        return this.bytes.slice(0, this.lengthValue);
    }

    /** Writes one integer using the minimum whole-byte width. */
    private writeInteger(bits: BitWidth, value: UnsignedInteger, skipValidation: boolean): void {
        const byteLength = Math.ceil(bits / 8);
        const end = this.endOffset(byteLength);
        this.ensureCapacity(end);

        if (byteLength <= 4) {
            this.writeNumber(this._offset, byteLength, this.numberValue(bits, byteLength, value, skipValidation));
        } else {
            this.writeBigInt(this._offset, byteLength, this.bigIntValue(bits, byteLength, value, skipValidation));
        }

        this.commit(end);
    }

    /** Writes a normalized one-to-four-byte number. */
    private writeNumber(offset: number, byteLength: number, value: number): void {
        switch (byteLength) {
            case 1:
                this.view.setUint8(offset, value);
                return;
            case 2:
                this.view.setUint16(offset, value, false);
                return;
            case 3:
                this.view.setUint8(offset, Math.floor(value / 0x10000));
                this.view.setUint16(offset + 1, value, false);
                return;
            case 4:
                this.view.setUint32(offset, value, false);
                return;
            default:
                throw new RangeError(`Unsupported number byte length: ${byteLength}`);
        }
    }

    /** Writes a normalized five-to-eight-byte bigint. */
    private writeBigInt(offset: number, byteLength: number, value: bigint): void {
        if (byteLength === 8) {
            this.view.setBigUint64(offset, value, false);
            return;
        }

        for (let index = offset + byteLength - 1; index >= offset; index--) {
            this.bytes[index] = Number(value & 0xffn);
            value >>= 8n;
        }
    }

    /** Validates and normalizes a value stored in no more than four bytes. */
    private numberValue(
        bits: BitWidth,
        byteLength: number,
        value: UnsignedInteger,
        skipValidation: boolean
    ): number {
        if (typeof value === "number") {
            if (!Number.isSafeInteger(value)) {
                throw new RangeError(`Number values must be safe integers; received ${value}`);
            }

            const maximum = 2 ** bits - 1;
            if (!skipValidation && (value < 0 || value > maximum)) {
                throw new RangeError(`Value must be an unsigned ${bits}-bit integer; received ${value}`);
            }

            if (!skipValidation) return value;
            const modulus = 2 ** (byteLength * 8);
            return (value % modulus + modulus) % modulus;
        }

        const integer = value;
        const maximum = (1n << BigInt(bits)) - 1n;
        if (!skipValidation && (integer < 0n || integer > maximum)) {
            throw new RangeError(`Value must be an unsigned ${bits}-bit integer; received ${String(value)}`);
        }
        return Number(BigInt.asUintN(byteLength * 8, integer));
    }

    /** Validates and normalizes a value stored in five to eight bytes. */
    private bigIntValue(
        bits: BitWidth,
        byteLength: number,
        value: UnsignedInteger,
        skipValidation: boolean
    ): bigint {
        const integer = this.integerValue(value);
        const maximum = (1n << BigInt(bits)) - 1n;
        if (!skipValidation && (integer < 0n || integer > maximum)) {
            throw new RangeError(`Value must be an unsigned ${bits}-bit integer; received ${String(value)}`);
        }
        return BigInt.asUintN(byteLength * 8, integer);
    }

    /** Converts an exact JavaScript integer to bigint. */
    private integerValue(value: UnsignedInteger): bigint {
        if (typeof value === "bigint") return value;
        if (!Number.isSafeInteger(value)) {
            throw new RangeError(`Number values must be safe integers; received ${value}`);
        }
        return BigInt(value);
    }

    /** Advances the cursor and output high-water mark after a successful write. */
    private commit(end: number): void {
        this._offset = end;
        if (end > this.lengthValue) this.lengthValue = end;
    }

    /** Computes a safe end position before allocating or mutating output. */
    private endOffset(byteLength: number): number {
        const end = this._offset + byteLength;
        if (!Number.isSafeInteger(end)) {
            throw new RangeError(`Write ending at offset ${end} exceeds the safe integer range`);
        }
        return end;
    }

    /** Grows the backing array geometrically while preserving existing bytes. */
    private ensureCapacity(required: number): void {
        if (required <= this.bytes.byteLength) return;

        let capacity = Math.max(this.bytes.byteLength, MIN_CAPACITY);
        while (capacity < required) {
            const doubled = capacity * 2;
            capacity = Number.isSafeInteger(doubled) ? doubled : required;
        }

        const next = new Uint8Array(capacity);
        next.set(this.bytes.subarray(0, this.lengthValue));
        this.bytes = next;
        this.view = new DataView(next.buffer);
    }

    static {
        for (let bits = 1; bits <= 64; bits++) {
            const width = bits as BitWidth;
            Object.defineProperty(ByteWriter.prototype, `i${width}`, {
                configurable: true,
                enumerable: false,
                writable: true,
                value(this: ByteWriter, value: UnsignedInteger, skipValidation = false): void {
                    this.writeInteger(width, value, skipValidation);
                }
            });
        }
    }
}

/** Adds the statically typed `i1(value)` through `i64(value)` methods installed above. */
interface ByteWriter extends IntegerWriterMethods {}

export default ByteWriter;
