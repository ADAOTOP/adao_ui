import { chainId, ibASTR } from 'config/constants/tokens';
import { registerToken } from 'utils/wallet';

export const addToMetamask = (account, onPresentConnectModal) => {
  if (!account) {
    onPresentConnectModal();
  } else {
    registerToken(ibASTR[chainId].address, ibASTR[chainId].symbol, ibASTR[chainId].decimals);
  }
};
