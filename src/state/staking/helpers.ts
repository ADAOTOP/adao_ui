import BigNumber from 'bignumber.js';
import erc20ABI from 'config/abi/erc20.json';
import multicall from 'utils/multicall';

export const fetchUserTokenBalances = async (contractAddress: string, account: string) => {
  const calls = [
    {
      address: contractAddress,
      name: 'balanceOf',
      params: [account],
    },
  ];

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance, index) => {
    return new BigNumber(tokenBalance).toString();
  });
  return parsedTokenBalances[0];
};
