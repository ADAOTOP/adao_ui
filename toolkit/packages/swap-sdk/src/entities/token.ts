import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.ASTR_MAINNET]: new Token(
    ChainId.ASTR_MAINNET,
    '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    18,
    'WASTR',
    'Wrapped ASTR'
  ),
  [ChainId.ASTR_TESTNET]: new Token(
    ChainId.ASTR_TESTNET,
    '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    18,
    'WASTR',
    'Wrapped ASTR'
  ),

  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET,
    '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
    18,
    'WSDN',
    'Wrapped SDN'
  ),
  [ChainId.SDN_TESTNET]: new Token(
    ChainId.SDN_TESTNET,
    '0x321F318e7C276c93Cf3094fd3a9d7c4362fd19FB',
    18,
    'WSDN',
    'Wrapped SDN'
  ),

  [ChainId.BSC_MAINNET]: new Token(
    ChainId.BSC_MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
}
