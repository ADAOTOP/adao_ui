import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { useDispatch } from 'react-redux';
import farmsReducer from './farms';
import poolsReducer from './pools';
import predictionsReducer from './predictions';
import profileReducer from './profile';
import teamsReducer from './teams';
import achievementsReducer from './achievements';
import priceReducer from './price';
import blockReducer from './block';
import collectiblesReducer from './collectibles';
import votingReducer from './voting';
import lotteryReducer from './lottery';
import application from './application/reducer';
import { updateVersion } from './global/actions';
import user from './user/reducer';
import transactions from './transactions/reducer';
import swap from './swap/reducer';
import mint from './mint/reducer';
import lists from './lists/reducer';
import burn from './burn/reducer';
import multicall from './multicall/reducer';
import staking from './staking';
import polkadotApi from './polkadotApi';
const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'staking'];

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    application,
    achievements: achievementsReducer,
    block: blockReducer,
    price: priceReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    user,
    transactions,
    swap,
    multicall,
    lists,
    staking,
    polkadotApi,
    burn,
    mint,

    teams: teamsReducer,
    collectibles: collectiblesReducer,
    voting: votingReducer,
    lottery: lotteryReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
