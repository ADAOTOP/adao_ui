import { chainId, main_tokens } from '../config/constants/tokens';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { usePrice } from 'state/price/hooks';

export const useADaoPrice = () => {
  const { priceVsBusdMap } = usePrice();

  const kacoPrice = useMemo(
    () => priceVsBusdMap[main_tokens.kaco.address[chainId].toLowerCase()] || new BigNumber(0),
    [priceVsBusdMap],
  );

  return new BigNumber(kacoPrice);
};
