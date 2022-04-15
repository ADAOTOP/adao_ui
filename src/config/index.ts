import BigNumber from 'bignumber.js/bignumber';
import { BIG_TEN } from 'utils/bigNumber';
import { CHAINKEY, ChainId } from '@my/sdk';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});
export const chainKey: CHAINKEY = CHAINKEY.ASTR;

//  @ts-ignore
export const BSC_BLOCK_TIME = chainKey === CHAINKEY.BSC ? 3 : chainKey === CHAINKEY.SDN ? 12 : 12;

export const BASE_BSC_SCAN_URLS = {
  [ChainId.ASTR_MAINNET]: 'https://blockscout.com/astar',
  [ChainId.ASTR_TESTNET]: 'https://blockscout.com/shibuya',

  [ChainId.SDN_MAINNET]: 'https://blockscout.com/shiden',
  [ChainId.SDN_TESTNET]: 'https://blockscout.com/shibuya',

  [ChainId.BSC_MAINNET]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
};

// CAKE_PER_BLOCK details
// 40 KAC is minted per block
// 20 KAC per block is sent to Burn pool (A farm just for burning cake)
// 10 KAC per block goes to KAC syrup pool
// 9 KAC per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 19 (40 - Amount sent to burn pool)
export const CAKE_PER_BLOCK = new BigNumber(40);
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365); // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR);
export const BASE_URL = 'https://www.kaco.finance';
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`;
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`;
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[process.env.REACT_APP_CHAIN_ID];
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50;
export const LOTTERY_TICKET_PRICE = 1;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const DEFAULT_GAS_LIMIT = 650000;
// 900000
export const DEFAULT_GAS_LIMIT_40w = 400000;
// 15000000
// 116020
// 1000000
// 400000
// 200000
export const DEFAULT_GAS_PRICE = 2000000000; // 2gwei
export const AUCTION_BIDDERS_TO_FETCH = 500;
export const RECLAIM_AUCTIONS_TO_FETCH = 500;
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500;
