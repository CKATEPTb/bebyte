import ByteWriter from "@/ByteWriter";
import ByteReader from "@/ByteReader";

export {
    type ByteWriter,
    type ByteReader
}

const bebyte = {
    writer: () => new ByteWriter(),
    reader: (buffer: Uint8Array) => new ByteReader(buffer)
}
export default bebyte