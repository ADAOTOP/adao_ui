import React, { lazy } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ResetCSS } from '@my/ui';
import BigNumber from 'bignumber.js';
import useEagerConnect from 'hooks/useEagerConnect';
import { usePollBlockNumber } from 'state/block/hooks';
import GlobalStyle from './style/Global';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import { ToastListener } from './contexts/ToastsContext';
import PageLoader from './components/Loader/PageLoader';
import history from './routerHistory';
import { PriceProvider } from 'contexts/PriceProvider';
import SideMenu from './components/SideMenu';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate } from 'state/staking/hooks';

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'));
const DappstakeStake = lazy(() => import('./views/Dappstake/Stake'));
const DappstakeUnbind = lazy(() => import('./views/Dappstake/Unbind'));

const NotFound = lazy(() => import('./views/NotFound'));

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  usePollBlockNumber();
  useEagerConnect();

  // 获取合约
  const contract = useDAppStackingContract();
  GetPoolUpdate(contract);
  // useFetchProfile();
  // usePollCoreFarmData();

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <PriceProvider />
      <SideMenu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/dappstake/stake">
              <DappstakeStake />
            </Route>
            {/*  <Route path="/dappstake/unstake">
                <DappstakeUnstake />
              </Route> */}
            <Route path="/dappstake/unbind">
              <DappstakeUnbind />
            </Route>
            <Route path="/dappstake">
              <Redirect to="/dappstake/stake" />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </SideMenu>
      <ToastListener />
    </Router>
  );
};

export default React.memo(App);
