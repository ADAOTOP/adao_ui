import { ethers } from 'ethers';
import { IDappStakingInterface } from 'utils/types';

export const UseUnbindDApp = async (contract: IDappStakingInterface, ibASTRAmount: string) => {
  const tx = await contract.withdraw(ethers.utils.parseEther(ibASTRAmount));
  const receipt = await tx.wait();
  return receipt.status;
};
