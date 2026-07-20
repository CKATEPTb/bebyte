/** Supported unsigned integer widths. Values occupy the minimum whole-byte width. */
export type BitWidth =
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
    9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
    17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
    25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 |
    33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
    41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 |
    49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 |
    57 | 58 | 59 | 60 | 61 | 62 | 63 | 64;

type NumberBitWidth =
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
    9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
    17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
    25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;

/** Integer accepted by writer methods. Unsafe JavaScript numbers are rejected. */
export type UnsignedInteger = number | bigint;

/** Reader result for a particular width: number through 32 bits, bigint above it. */
export type ReadUnsigned<Width extends BitWidth> = Width extends NumberBitWidth ? number : bigint;

/** Strongly typed `i1()` through `i64()` reader methods. */
export type IntegerReaderMethods = {
    [Width in BitWidth as `i${Width}`]: () => ReadUnsigned<Width>;
};

/** Strongly typed `i1(value)` through `i64(value)` writer methods. */
export type IntegerWriterMethods = {
    [Width in BitWidth as `i${Width}`]: (value: UnsignedInteger, skipValidation?: boolean) => void;
};
