import useActiveWeb3React from 'hooks/useActiveWeb3React';
import addresses from 'config/constants/contracts';
import multicall from 'utils/multicall';

import { BIG_TEN } from './../../../utils/bigNumber';
import RealBigNumber from 'bignumber.js';

import masterChef from 'config/abi/masterchef.json';

import { useEffect, useState } from 'react';
import { chainKey } from 'config';
import { CHAINKEY } from '@kaco/sdkv2';

const base = BIG_TEN.pow(new RealBigNumber(18));

const useKacPerBlock = (): RealBigNumber => {
  const { chainId } = useActiveWeb3React();
  const [kacPerBlock, setKacPerBlock] = useState<RealBigNumber>(new RealBigNumber(0));
  useEffect(() => {
    multicall(masterChef, [
      {
        address: addresses.masterChef[chainId],
        name:
          chainKey === CHAINKEY.BSC
            ? 'cakePerBlock'
            : chainKey === CHAINKEY.SDN
            ? 'kacPerShidenBlock'
            : 'kacPerShidenBlock',
      },
    ]).then(([kacPerBlock]) => {
      console.log(11111);
      setKacPerBlock(new RealBigNumber(kacPerBlock.toString()).div(base));
    });
  }, [chainId]);

  return kacPerBlock;
};
export default useKacPerBlock;
