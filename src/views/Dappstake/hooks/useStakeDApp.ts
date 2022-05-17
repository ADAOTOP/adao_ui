import { ethers } from 'ethers';
import { IDappStakingInterface } from 'utils/types';

export const UseStakeDApp = async (contract: IDappStakingInterface, account: string, value = '0') => {
  const tx = await contract.depositFor(account, {
    value: ethers.utils.parseEther(value),
    gasLimit: 1_310_000,
    gasPrice: 1_110_000_000,
  });
  if (tx) {
    const receipt = await tx.wait();
    return receipt.status;
  }
};
