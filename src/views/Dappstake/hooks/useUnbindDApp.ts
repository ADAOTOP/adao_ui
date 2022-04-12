import { ethers } from 'ethers';
import { IDappStakingInterface } from 'utils/types';

export const UseUnbindDApp = async (contract: IDappStakingInterface, account: string, ibASTRAmount: string) => {
  const tx = await contract.withdrawTo(account, ethers.utils.parseEther(ibASTRAmount));
  const receipt = await tx.wait();
  return receipt.status;
};
