import ByteWriter from "@/ByteWriter";
import ByteReader from "@/ByteReader";

export {
    type ByteWriter,
    type ByteReader
}

export const Buffer = {
    writer: () => new ByteWriter(),
    reader: (buffer: Uint8Array) => new ByteReader(buffer)
}