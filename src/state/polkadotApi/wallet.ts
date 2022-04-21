import { web3Enable } from '@polkadot/extension-dapp';

export const getInjectedExtensions = async (): Promise<any[]> => {
  const extension = await web3Enable('AstarNetwork/astar-apps');
  return extension;
};
