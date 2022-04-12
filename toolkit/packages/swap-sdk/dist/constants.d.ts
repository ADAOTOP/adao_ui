import JSBI from 'jsbi';
export declare type BigintIsh = JSBI | bigint | string;
export declare enum TradeType {
    EXACT_INPUT = 0,
    EXACT_OUTPUT = 1
}
export declare enum Rounding {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_UP = 2
}
export declare enum CHAINKEY {
    BSC = "BSC",
    SDN = "SDN",
    ASTR = "ASTR"
}
export declare enum ChainId {
    BSC_MAINNET = 56,
    BSC_TESTNET = 87,
    ASTR_MAINNET = 592,
    ASTR_TESTNET = 81,
    SDN_MAINNET = 336,
    SDN_TESTNET = 82
}
export declare const FACTORY_ADDRESS: {
    56: string;
    87: string;
    336: string;
    82: string;
    592: string;
    81: string;
};
export declare const INIT_CODE_HASH: {
    56: string;
    87: string;
    336: string;
    82: string;
    592: string;
    81: string;
};
export declare const MINIMUM_LIQUIDITY: JSBI;
export declare const ZERO: JSBI;
export declare const ONE: JSBI;
export declare const TWO: JSBI;
export declare const THREE: JSBI;
export declare const FIVE: JSBI;
export declare const TEN: JSBI;
export declare const _100: JSBI;
export declare const FEES_NUMERATOR: JSBI;
export declare const FEES_DENOMINATOR: JSBI;
export declare enum SolidityType {
    uint8 = "uint8",
    uint256 = "uint256"
}
export declare const SOLIDITY_TYPE_MAXIMA: {
    uint8: JSBI;
    uint256: JSBI;
};
