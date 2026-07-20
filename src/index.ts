import ByteReader from "@/reader/ByteReader";
import ByteWriter from "@/writer/ByteWriter";

export type {default as ByteReader} from "@/reader/ByteReader";
export type {default as ByteWriter} from "@/writer/ByteWriter";

/** Factory API for creating independent big-endian readers and writers. */
const bebyte = {
    /** Creates an empty writer, optionally reserving the requested capacity. */
    writer: (initialCapacity = 0): ByteWriter => new ByteWriter(initialCapacity),

    /** Creates a zero-copy reader over the supplied `Uint8Array` view. */
    reader: (buffer: Uint8Array): ByteReader => new ByteReader(buffer)
};

export default bebyte;
