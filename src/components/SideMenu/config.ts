import { CHAINKEY } from '@my/sdk';
import IconMarkets from './imgs/iconMarkets';
import IconMyWallet from './imgs/iconMyWallet';

export const chainKey: CHAINKEY = CHAINKEY.SDN;

export interface IMenu {
  text: string;
  link?: string;
  collapsed?: boolean;
  children?: IMenuDetail[] | undefined;
}
export interface IMenuDetail {
  text: string;
  link: string;
  img: any;
  detail: string;
}
export const NFTPathConfig: IMenuDetail[] = [
  {
    text: 'Markets',
    img: IconMarkets,
    link: '/nft/pools',
    detail: 'You can buy and sell your NFT at our ADAO platform',
  },
  {
    text: 'My Wallet',
    img: IconMyWallet,
    link: '/nft/wallet',
    detail: 'All of your NFT assets are in your ADAO wallet',
  },
];
export const MorePathConfig: IMenuDetail[] = [
  {
    text: 'Audited By Certik',
    img: IconMarkets,
    link: 'https://www.certik.com/projects/ADAO',
    detail: 'The ADAO platform has been officially audited by Certik',
  },
  {
    text: 'Receive NFT in Galaxy',
    img: IconMyWallet,
    link: 'https://galaxy.eco/ADAO',
    detail: 'All ADAO NFT works can be freely traded on the Galaxy platform at the same time',
  },
];

export const menuItemsDefault = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Staking',
    link: '/dappstake/stake',
  },
];
