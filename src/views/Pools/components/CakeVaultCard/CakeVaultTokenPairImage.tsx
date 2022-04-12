import React from 'react';
import { TokenPairImage, ImageProps } from '@my/ui';
import { Adao, chainId } from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${getAddress(Adao[chainId].address)}.svg`;

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />;
};

export default CakeVaultTokenPairImage;
