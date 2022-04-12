import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}
export enum CHAINKEY {
  BSC = 'BSC',
  SDN = 'SDN',
  ASTR = 'ASTR',
  // OPTIMISTIC = 'OPTIMISTIC',
  // ARBITRUM = 'ARBITRUM',
  // POLYGON = 'POLYGON',
  // AVALANCH = 'AVALANCH',
  // FANTOM = 'FANTOM',
  // THETA = 'THETA',
}
export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 87,

  ASTR_MAINNET = 592,
  ASTR_TESTNET = 81,

  SDN_MAINNET = 336,
  SDN_TESTNET = 82,

  // ARBITRUM_MAINNET = 42161,
  // ARBITRUM_TESTNET = 421611,
  // OPTIMISTIC_MAINNET = 10,
  // OPTIMISTIC_TESTNET = 69,
  // SHIDEN_MAINNET = 336,
  // SHIDEN_TESTNET = 81,
  // POLYGON_MAINNET = 137,
  // POLYGON_TESTNET = 80001,
  // AVALANCH_MAINNET = 43114,
  // AVALANCH_TESTNET = 43113,
  // FANTOM_MAINNET = 250,
  // FANTOM_TESTNET = 4002,
  // THETA_MAINNET = 361,
  // THETA_TESTNET = 365,
}
export const FACTORY_ADDRESS = {
  [ChainId.BSC_MAINNET]: '0xa5e48a6E56e164907263e901B98D9b11CCB46C47',
  [ChainId.BSC_TESTNET]: '0xa5e48a6E56e164907263e901B98D9b11CCB46C47',
  [ChainId.SDN_MAINNET]: '0xcd8620889c1dA22ED228e6C00182177f9dAd16b7',
  [ChainId.SDN_TESTNET]: '0xcd8620889c1dA22ED228e6C00182177f9dAd16b7',
  [ChainId.ASTR_MAINNET]: '0x72e86269b919Db5bDbF61cB1DeCfD6d14feC4D7F',
  [ChainId.ASTR_TESTNET]: '0x72e86269b919Db5bDbF61cB1DeCfD6d14feC4D7F',
}
export const INIT_CODE_HASH = {
  [ChainId.BSC_MAINNET]: '0xf65dd62adf08288b0d787767b8c60ca23df3f25b5a140449a9f9c403ae527424',
  [ChainId.BSC_TESTNET]: '0xf65dd62adf08288b0d787767b8c60ca23df3f25b5a140449a9f9c403ae527424',
  [ChainId.SDN_MAINNET]: '0x0558677b74f6dc11ee476ed79ce993579e32b1ae87e818f42c4f9d829c1db12a',
  [ChainId.SDN_TESTNET]: '0x0558677b74f6dc11ee476ed79ce993579e32b1ae87e818f42c4f9d829c1db12a',
  [ChainId.ASTR_MAINNET]: '0xee94b86c5982668ed547d5703d5fa42db90a876a4fd1b8915cb2676c4218e822',
  [ChainId.ASTR_TESTNET]: '0xee94b86c5982668ed547d5703d5fa42db90a876a4fd1b8915cb2676c4218e822',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(9975)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}
