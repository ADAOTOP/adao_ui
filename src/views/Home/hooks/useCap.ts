import { BigNumber } from '@ethersproject/bignumber';
import { Coinversation } from 'config/constants/tokens';
import { useContract } from 'hooks/useContract';
import { useSingleCallResult } from 'state/multicall/hooks';
import Abi from 'config/abi/kaco.json';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

function useCap(): string {
  const { chainId } = useActiveWeb3React();
  const contract = useContract(chainId ? Coinversation.address : '', Abi);
  const cap: BigNumber = useSingleCallResult(contract, 'cap')?.result?.[0];

  return cap ? cap.div(BigNumber.from(10).pow(18)).toString() : '0';
}

export default useCap;
