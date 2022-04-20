import BigNumber from 'bignumber.js';
import dAppStakingAbi from 'config/abi/dAppStakingAbi.json';
import multicall from 'utils/multicall';

export const fetchUserTokenBalances = async (contractAddress: string, account: string) => {
  try {
    const calls = [
      {
        address: contractAddress,
        name: 'balanceOf',
        params: [account],
      },
    ];
    const rawTokenBalances = await multicall(dAppStakingAbi, calls);
    const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
      return new BigNumber(tokenBalance).toString();
    });
    return parsedTokenBalances[0];
  } catch (e) {
    console.log(e);
    return '0';
  }
};
