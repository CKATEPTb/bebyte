/** Shared cursor contract for byte readers and writers. */
export default abstract class ByteProcessor {
    protected _offset = 0;

    /** Current zero-based byte position. */
    public get offset(): number {
        return this._offset;
    }

    /**
     * Moves the byte cursor.
     *
     * Readers additionally require the position to remain inside their input;
     * writers may move forward and create a zero-filled gap.
     */
    public set offset(value: number) {
        this.assertOffset(value);
        this._offset = value;
    }

    /** Returns the processor contents as a `Uint8Array`. */
    public abstract toUint8Array(): Uint8Array;

    /** Validates a cursor without changing processor state. */
    protected assertOffset(value: number): void {
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new RangeError(`Offset must be a non-negative safe integer; received ${value}`);
        }
    }
}
