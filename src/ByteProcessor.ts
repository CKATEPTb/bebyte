/**
 * ByteProcessor is an abstract base class that provides a shared interface
 * for working with byte-oriented data structures. It manages a read/write
 * cursor (`offset`) and requires subclasses to implement a method that exports
 * the current byte data as a Uint8Array.
 */
export default abstract class ByteProcessor {
    protected _offset: number = 0

    /**
     * The current byte offset used for reading from or writing to a buffer.
     * Can be used to control the read/write position manually.
     */
    public get offset(): number {
        return this._offset
    }

    /**
     * Sets the current byte offset (cursor) to a new position.
     *
     * @param {number} value - The new offset position.
     */
    public set offset(value: number) {
        this._offset = value
    }

    /**
     * Converts the internal state or buffer content into a Uint8Array.
     *
     * @returns {Uint8Array} A byte array representing the internal data.
     */
    public abstract toUint8Array(): Uint8Array
}