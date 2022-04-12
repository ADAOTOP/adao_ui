import { ContextApi } from 'contexts/Localization/types';
import { PageMeta } from './types';

export const DEFAULT_META: PageMeta = {
  title: 'ADAO',
  description: 'ADAO',
  image: 'https://kaco.finance/images/hero.png',
};

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `Compounding | ADAO`,
      };
    case '/farms':
      return {
        title: `Farms | ADAO`,
      };
    case '/dappstake/stake':
      return {
        title: `Stake | ADAO`,
      };
    case '/dappstake/unbind':
      return {
        title: `Unbind | ADAO`,
      };
    default:
      return null;
  }
};
