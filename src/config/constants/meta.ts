import { ContextApi } from 'contexts/Localization/types';
import { PageMeta } from './types';

export const DEFAULT_META: PageMeta = {
  title: 'CoinversationSwap',
  description:
    'The most popular AMM on BSC by user count! Earn KAC through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by CoinversationSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://kaco.finance/images/hero.png',
};

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `Compounding | CoinversationSwap`,
      };
    case '/farms':
      return {
        title: `Farms | CoinversationSwap`,
      };
    case '/stake':
      return {
        title: `Stake | CoinversationSwap`,
      };
    default:
      return null;
  }
};
