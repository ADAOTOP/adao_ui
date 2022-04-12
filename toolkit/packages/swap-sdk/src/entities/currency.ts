import JSBI from 'jsbi'
import { ChainId } from '..'

import { SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * The only instance of the base class `Currency`.
   */
  public static readonly ETHER = {
    [ChainId.BSC_MAINNET]: new Currency(18, 'BNB', 'Binance Coin'),
    [ChainId.BSC_TESTNET]: new Currency(18, 'BNB', 'Binance Coin'),
    [ChainId.SDN_MAINNET]: new Currency(18, 'SDN', 'SDN Token'),
    [ChainId.SDN_TESTNET]: new Currency(18, 'SDN', 'SDN Token'),
    [ChainId.ASTR_MAINNET]: new Currency(18, 'ASTR', 'ASTR Token'),
    [ChainId.ASTR_TESTNET]: new Currency(18, 'ASTR', 'ASTR Token'),
  }

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

const ETHER = Currency.ETHER
export { ETHER }
