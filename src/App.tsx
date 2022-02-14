import React, { lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ResetCSS } from '@kaco/adao_ui';
import BigNumber from 'bignumber.js';
import useEagerConnect from 'hooks/useEagerConnect';
import { usePollBlockNumber } from 'state/block/hooks';
import { DatePickerPortal } from 'components/DatePicker';
import GlobalStyle from './style/Global';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import { ToastListener } from './contexts/ToastsContext';
import PageLoader from './components/Loader/PageLoader';
import EasterEgg from './components/EasterEgg';
import history from './routerHistory';
// Views included in the main bundle

import { PriceProvider } from 'contexts/PriceProvider';
import SideMenu from './components/SideMenu';

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'));
const NotFound = lazy(() => import('./views/NotFound'));

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  usePollBlockNumber();
  useEagerConnect();
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

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </SideMenu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  );
};

export default React.memo(App);
