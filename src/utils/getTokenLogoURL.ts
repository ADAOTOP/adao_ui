import { chainKey } from 'config';
import defaultTokenList from 'config/constants/tokenLists/pancake-default.tokenlist.json';

const getTokenLogoURL = (address: string) => {
  const uri = defaultTokenList[chainKey].tokens.find((token) => token.address === address)?.logoURI;

  return uri || ``;
};

export default getTokenLogoURL;
