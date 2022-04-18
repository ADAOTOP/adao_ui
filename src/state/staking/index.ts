import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { chainId, DEFAULT_Token, ibASTR } from 'config/constants/tokens';
import { StatingState } from 'state/types';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { simpleRpcProvider } from 'utils/providers';
import { fetchUserTokenBalances } from './helpers';

const initialState: StatingState = {
  mainTokenSymbol: DEFAULT_Token[chainId].symbol,
  mainTokenBalance: '0',
  mainTokenIsBalanceZero: true,
  mainTokenDecimals: DEFAULT_Token[chainId].decimals,
  mainTokenFullBalance: '0',

  ibASTRTokenSymbol: ibASTR[chainId].symbol,
  ibASTRTokenBalance: '0',
  ibASTRTokenIsBalanceZero: true,
  ibASTRTokenDecimals: ibASTR[chainId].decimals,
  ibASTRTokenFullBalance: '0',

  totalSupply: '0',
  ratio: 1,
  recordsIndex: 1,

  isLoading: true,
  data: [],
};

export const fetchStakingBalance = createAsyncThunk<string[], { account: string }>(
  'staking/fetchStakingBalance',
  async ({ account }) => {
    const walletBalance = await simpleRpcProvider.getBalance(account);
    const ibASTRbalance = await fetchUserTokenBalances(ibASTR[chainId].address, account);
    return [walletBalance.toString(), ibASTRbalance];
  },
);

export const stakingSlice = createSlice({
  name: 'staking',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchFailed: (state) => {
      state.isLoading = false;
    },
    fetchSetStateSuccess: (state, action) => {
      state.totalSupply = action.payload.totalSupply;
      state.ratio = action.payload.ratio;
      state.recordsIndex = action.payload.recordsIndex;
    },
    fetchListSuccess: (state, action) => {
      // console.log(111000);
      state.data = action.payload.list;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStakingBalance.fulfilled, (state, action) => {
      if (action.payload && action.payload[0]) {
        state.mainTokenBalance = action.payload[0];
        state.mainTokenIsBalanceZero = Number(action.payload[0]) > 0 ? false : true;
        state.mainTokenFullBalance = getFullDisplayBalance(
          new BigNumber(action.payload[0]),
          state.mainTokenDecimals,
          8,
        );
      }
      if (action.payload && action.payload[1]) {
        state.ibASTRTokenBalance = action.payload[1];
        state.ibASTRTokenIsBalanceZero = Number(action.payload[1]) > 0 ? false : true;
        state.ibASTRTokenFullBalance = getFullDisplayBalance(
          new BigNumber(action.payload[1]),
          state.ibASTRTokenDecimals,
          8,
        );
      }
    });
  },
});
export const { fetchStart, fetchFailed, fetchSetStateSuccess, fetchListSuccess } = stakingSlice.actions;

export default stakingSlice.reducer;
