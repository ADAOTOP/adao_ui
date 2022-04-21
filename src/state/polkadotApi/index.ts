import { ApiPromise } from '@polkadot/api';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import { createSlice } from '@reduxjs/toolkit';
import { UnsubscribePromise } from '@polkadot/api/types';
import keyring from '@polkadot/ui-keyring';
export interface IPolkadotApiState {
  api?: ApiPromise;
  extensions?: InjectedExtension[];
  currentAccount?: KeyringPair;
  currentBalance?: number;
  unsubscribeAccountInfo?: UnsubscribePromise;

  era?: number;
  blockPerEra?: number;
  progress?: number;
  blocksUntilNextEra?: number;
}
const initialState: IPolkadotApiState = {};
export const polkadotApiSlice = createSlice({
  name: 'polkadotApi',
  initialState,
  reducers: {
    setApi: (state, action) => {
      state.api = action.payload.api;
    },
    setExtensions: (state, action) => {
      state.extensions = action.payload.extensions;
    },
    setInfo: (state, action) => {
      state.era = action.payload.era;
      state.blockPerEra = action.payload.blockPerEra;
      state.progress = action.payload.progress;
      state.blocksUntilNextEra = action.payload.blocksUntilNextEra;
    },
    setCurrentAccount: (state, action) => {
      const api = state.api;
      if (!api) {
        return;
      }
      const accountIndex = action.payload.accountIndex;
      const accounts = keyring.getPairs();
      const accountsLength = accounts.length;
      if (accountsLength === 0 || accountIndex) {
        return;
      }
      const unsub = state.unsubscribeAccountInfo;
      if (unsub) {
        (async function () {
          (await unsub)();
        })();
      }
      const currentAccount = accounts[accountIndex];
      state.currentAccount = currentAccount;
      state.unsubscribeAccountInfo = api.query.system.account(currentAccount.address, (result) => {
        state.currentBalance = result.data.free.toNumber();
      });
    },
  },
});
export const { setApi, setExtensions, setInfo } = polkadotApiSlice.actions;
export default polkadotApiSlice.reducer;
