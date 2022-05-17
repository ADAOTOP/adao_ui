import { ethers } from 'ethers';
import { IDappStakingInterface } from 'utils/types';

export const UseUnbindDApp = async (contract: IDappStakingInterface, ibASTRAmount: string) => {
  const tx = await contract.withdraw(ethers.utils.parseEther(ibASTRAmount), {
    gasLimit: 1_310_000,
    gasPrice: 1_110_000_000,
  });
  const receipt = await tx.wait();
  return receipt.status;
};
