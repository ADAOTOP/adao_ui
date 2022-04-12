import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTooltip, Button, LogoutIcon } from '@my/ui';
import ConnectWalletButton from '../../ConnectWalletButton';
import PolkadotAccounts from './WalletAccountInfo/PolkadotAccounts';
import BscAccountInfo from './WalletAccountInfo/BscAccountInfo';
import { chainKey } from 'config';
import useAuth from 'hooks/useAuth';
const WalletAccountInfo = () => {
  const { logout } = useAuth();
  const { account } = useWeb3React();
  const { tooltip: tooltip_P, tooltipVisible: tooltipVisible_P } = useTooltip(
    chainKey === 'SDN' ? PolkadotAccounts : BscAccountInfo,
    {
      trigger: 'click',
      placement: 'top-end',
      hideArrow: false,
      tooltipOffset: [20, 10],
    },
  );

  return (
    <>
      {tooltipVisible_P && tooltip_P}
      {account ? (
        <Button variant="tertiary" scale="sm" width="140px" padding="0">
          {/* <img className="head_icon" src={karsierNft} alt="header_default" /> */}
          {account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : ''}
          <LogoutIcon onClick={logout} marginLeft="10px" />
          {/* add kaco header img */}
        </Button>
      ) : (
        <ConnectWalletButton scale="sm" />
      )}
    </>
  );
};
export default WalletAccountInfo;
