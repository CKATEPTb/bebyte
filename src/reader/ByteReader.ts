import ByteProcessor from "@/core/ByteProcessor";
import type {
    BitWidth,
    IntegerReaderMethods,
    ReadUnsigned
} from "@/integer/types";

/**
 * Sequential big-endian reader over an existing `Uint8Array` view.
 *
 * Every operation validates the complete requested range before moving the
 * cursor. Failed reads therefore leave `offset` unchanged.
 */
class ByteReader extends ByteProcessor {
    private readonly view: DataView<ArrayBufferLike>;

    /**
     * Creates a reader without copying the supplied bytes.
     *
     * The view's `byteOffset` and `byteLength` are preserved, so subarrays are
     * read relative to their own first byte rather than the backing buffer.
     */
    public constructor(private readonly buffer: Uint8Array) {
        super();
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }

    /** Total number of readable bytes. */
    public get length(): number {
        return this.buffer.byteLength;
    }

    /** Number of unread bytes after the current cursor. */
    public get remaining(): number {
        return this.length - this._offset;
    }

    /**
     * Reads and copies exactly `length` bytes.
     *
     * @throws RangeError when the length is invalid or the input is truncated.
     */
    public read(length: number): Uint8Array {
        return this.take(length, true);
    }

    /**
     * Reads exactly `length` bytes as a zero-copy view.
     *
     * Mutating the returned array also mutates the reader's source buffer.
     */
    public viewBytes(length: number): Uint8Array {
        return this.take(length, false);
    }

    /** Reads and copies every byte after the current cursor. */
    public readRemaining(): Uint8Array {
        return this.read(this.remaining);
    }

    /** Returns a zero-copy view over every byte after the current cursor. */
    public viewRemaining(): Uint8Array {
        return this.viewBytes(this.remaining);
    }

    /**
     * Returns the original `Uint8Array` view without copying it or moving the cursor.
     */
    public override toUint8Array(): Uint8Array {
        return this.buffer;
    }

    /** Prevents a manually assigned reader offset from leaving the input view. */
    protected override assertOffset(value: number): void {
        super.assertOffset(value);
        if (value > this.length) {
            throw new RangeError(`Reader offset ${value} exceeds the ${this.length}-byte input`);
        }
    }

    /** Reads one integer using the minimum whole-byte width. */
    private readInteger<Width extends BitWidth>(bits: Width): ReadUnsigned<Width> {
        const byteLength = Math.ceil(bits / 8);
        this.assertAvailable(byteLength);

        const offset = this._offset;
        const unusedBits = byteLength * 8 - bits;
        if (unusedBits > 0 && this.view.getUint8(offset) > 0xff >>> unusedBits) {
            throw new RangeError(`Encoded value exceeds unsigned ${bits}-bit range`);
        }

        const value = byteLength <= 4
            ? this.readNumber(offset, byteLength)
            : this.readBigInt(offset, byteLength);

        this._offset += byteLength;
        return (bits <= 32 ? Number(value) : BigInt(value)) as ReadUnsigned<Width>;
    }

    /** Reads a one-to-four-byte integer without bigint allocation. */
    private readNumber(offset: number, byteLength: number): number {
        switch (byteLength) {
            case 1:
                return this.view.getUint8(offset);
            case 2:
                return this.view.getUint16(offset, false);
            case 3:
                return this.view.getUint16(offset, false) * 0x100 + this.view.getUint8(offset + 2);
            case 4:
                return this.view.getUint32(offset, false);
            default:
                throw new RangeError(`Unsupported number byte length: ${byteLength}`);
        }
    }

    /** Reads a five-to-eight-byte integer exactly. */
    private readBigInt(offset: number, byteLength: number): bigint {
        if (byteLength === 8) return this.view.getBigUint64(offset, false);

        let value = 0n;
        const end = offset + byteLength;
        for (let index = offset; index < end; index++) {
            value = value << 8n | BigInt(this.view.getUint8(index));
        }
        return value;
    }

    /** Returns either a copy or a view after one atomic bounds check. */
    private take(length: number, copy: boolean): Uint8Array {
        this.assertLength(length);
        this.assertAvailable(length);

        const start = this._offset;
        const end = start + length;
        this._offset = end;
        const bytes = this.buffer.subarray(start, end);
        return copy ? bytes.slice() : bytes;
    }

    /** Validates a read length independently from the current cursor. */
    private assertLength(length: number): void {
        if (!Number.isSafeInteger(length) || length < 0) {
            throw new RangeError(`Read length must be a non-negative safe integer; received ${length}`);
        }
    }

    /** Rejects truncated input before DataView or cursor mutation. */
    private assertAvailable(length: number): void {
        if (length > this.remaining) {
            throw new RangeError(`Cannot read ${length} byte(s): only ${this.remaining} byte(s) remain`);
        }
    }

    static {
        for (let bits = 1; bits <= 64; bits++) {
            const width = bits as BitWidth;
            Object.defineProperty(ByteReader.prototype, `i${width}`, {
                configurable: true,
                enumerable: false,
                writable: true,
                value(this: ByteReader): number | bigint {
                    return this.readInteger(width);
                }
            });
        }
    }
}

/** Adds the statically typed `i1()` through `i64()` methods installed above. */
interface ByteReader extends IntegerReaderMethods {}

export default ByteReader;
