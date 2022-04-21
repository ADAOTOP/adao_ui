import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from 'state';
import { providerEndpoints } from './chainEndpoints';
import { connected, disconnect } from './connectApi';
import { setInfo } from '.';
import { useEffect, useState } from 'react';
export function usePolkadotApi(): AppState['polkadotApi'] {
  return useSelector<AppState, AppState['polkadotApi']>((state) => state.polkadotApi);
}
export const GetPolkadotApi = async () => {
  const endpoint = providerEndpoints[0].endpoint;
  try {
    const _api = await connected(endpoint);
    if (_api) {
      return {
        api: _api,
      };
    }
  } catch (e) {
    console.log(`connectApi error: `, e);
  }
};
export async function useCurrentEra() {
  const era = 0;
  const blockPerEra = 0;
  const polkadotApi = usePolkadotApi();
  const [init, setInit] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (init) {
      return;
    }
    const getEra = async () => {
      const { api } = await GetPolkadotApi();
      if (!api) {
        return;
      }
      // console.log(1111);
      // const [currentEra, blockAmtPerEra, blockHeight, nextEraStartingBlockHeight] = await Promise.all([
      //   api.query.dappsStaking.currentEra(),
      //   api.consts.dappsStaking.blockPerEra,
      //   api.derive.chain.bestNumber,
      //   api.query.dappsStaking.nextEraStartingBlock(),
      // ]);
      // console.log(3333);
      // console.log({ currentEra });
      // const era = Number(currentEra.toString());
      // const blockPerEra = Number(blockAmtPerEra.toString());
      // console.log(era, blockPerEra, blockHeight, nextEraStartingBlockHeight);
    };
    getEra();
  }, [dispatch, init]);
}
