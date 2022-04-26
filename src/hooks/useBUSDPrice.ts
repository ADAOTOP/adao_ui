import { Currency, currencyEquals, JSBI, Price, WETH } from '@my/sdk';
import { useMemo } from 'react';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BUSD, chainId, Adao } from '../config/constants/tokens';
import { PairState, usePairs } from './usePairs';
import { wrappedCurrency } from '../utils/wrappedCurrency';
import { ChainId } from '@my/sdk';

const BUSD_MAINNET = BUSD[chainId];
/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const wrapped = wrappedCurrency(currency, chainId);
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WETH[chainId], wrapped) ? undefined : currency,
        chainId ? WETH[chainId] : undefined,
      ],
      [wrapped?.equals(BUSD_MAINNET) ? undefined : wrapped, BUSD_MAINNET],
      [chainId ? WETH[chainId] : undefined, BUSD_MAINNET],
    ],
    [currency, wrapped],
  );
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs);

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined;
    }
    // handle weth/eth
    if (wrapped.equals(WETH[chainId])) {
      if (busdPair) {
        const price = busdPair.priceOf(WETH[chainId]);
        return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator);
      }
      return undefined;
    }
    // handle busd
    if (wrapped.equals(BUSD_MAINNET)) {
      return new Price(BUSD_MAINNET, BUSD_MAINNET, '1', '1');
    }

    const ethPairETHAmount = ethPair?.reserveOf(WETH[chainId]);
    const ethPairETHBUSDValue: JSBI =
      ethPairETHAmount && busdEthPair
        ? busdEthPair.priceOf(WETH[chainId]).quote(ethPairETHAmount, chainId).raw
        : JSBI.BigInt(0);

    // all other tokens
    // first try the busd pair
    if (
      busdPairState === PairState.EXISTS &&
      busdPair &&
      busdPair.reserveOf(BUSD_MAINNET).greaterThan(ethPairETHBUSDValue)
    ) {
      const price = busdPair.priceOf(wrapped);
      return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator);
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(BUSD_MAINNET).greaterThan('0') && ethPair.reserveOf(WETH[chainId]).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(BUSD_MAINNET);
        const currencyEthPrice = ethPair.priceOf(WETH[chainId]);
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert();
        return new Price(currency, BUSD_MAINNET, busdPrice.denominator, busdPrice.numerator);
      }
    }
    return undefined;
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped]);
}

export const useCakeBusdPrice = (): Price | undefined => {
  const currentChaindId = chainId || ChainId.BSC_MAINNET;
  const cakeBusdPrice = useBUSDPrice(Adao[currentChaindId]);
  return cakeBusdPrice;
};
