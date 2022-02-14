import React from 'react';
import { Button, useWalletModal } from '@kaco/adao_ui';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';

const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <Button variant="tertiary" onClick={onPresentConnectModal} width="140px" padding="0" {...props}>
      {t('Connect Wallet')}
    </Button>
  );
};

export default ConnectWalletButton;
