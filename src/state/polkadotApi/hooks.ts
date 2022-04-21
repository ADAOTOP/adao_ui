import { AppDispatch, AppState } from 'state';
import { currentNetworkIdx, DAPPS_REWARD_RATE, endpointKey, providerEndpoints } from './chainEndpoints';
import { connected } from './connectApi';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '.';
import { useEffect, useState } from 'react';
import { Perbill } from '@polkadot/types/interfaces';
import { Struct } from '@polkadot/types';
import { defaultAmountWithDecimals } from './utils';
import { ethers } from 'ethers';
import { aprToApy } from 'apr-tools';

export function usePolkadotApi(): AppState['polkadotApi'] {
  return useSelector<AppState, AppState['polkadotApi']>((state) => state.polkadotApi);
}

const GetPolkadotApi = async () => {
  const endpoint = providerEndpoints[currentNetworkIdx].endpoint;
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
  // const [countDown, setCountDown] = useState(0);
  // const [progressRes, setProgressRes] = useState(0);
  const [init, setInit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (init) {
      return;
    }
    const getEra = async () => {
      // const tvlval = await tvl();
      // console.log(tvlval);
      const { api } = await GetPolkadotApi();
      if (!api) {
        return;
      }
      try {
        // console.log(1111);
        const [currentEra, blockAmtPerEra, blockHeight, nextEraStartingBlockHeight] = await Promise.all([
          api.query.dappsStaking.currentEra(),
          api.consts.dappsStaking.blockPerEra,
          api.derive.chain.bestNumber,
          api.query.dappsStaking.nextEraStartingBlock(),
        ]);
        // console.log(3333);
        // console.log({ currentEra });
        const era = Number(currentEra.toString());
        const blockPerEra = Number(blockAmtPerEra.toString());
        // console.log(era, blockPerEra, blockHeight, nextEraStartingBlockHeight);

        const handleBestNumber = blockHeight;
        await handleBestNumber((bestNumber) => {
          const best = bestNumber.toNumber();
          const nextEraStartingBlock = Number(nextEraStartingBlockHeight.toString());
          const _countDown = nextEraStartingBlock - best;
          const _progressRes = ((blockPerEra - _countDown) / blockPerEra) * 100;
          // setCountDown(_countDown);
          // setProgressRes(_progressRes);
          // console.log({ _progressRes });
          dispatch(
            setInfo({
              era: era,
              blockPerEra: blockPerEra,
              progress: _progressRes,
              blocksUntilNextEra: _countDown,
            }),
          );
        });
      } catch (e) {}
    };
    getEra();
    setInit(true);
  }, [dispatch, init]);
}

interface RewardDistributionConfig extends Struct {
  readonly baseTreasuryPercent: Perbill;
  readonly baseStakerPercent: Perbill;
  readonly dappsPercent: Perbill;
  readonly collatorsPercent: Perbill;
  readonly adjustablePercent: Perbill;
  readonly idealDappsStakingTvl: Perbill;
}
const TS_FIRST_BLOCK = {
  [endpointKey.ASTAR]: 1639798585, //  Ref: 2021-12-18 03:36:25 https://astar.subscan.io/block/1
  [endpointKey.SHIDEN]: 1625570880, //  Ref: 2021-07-06 11:28:00 https://shiden.subscan.io/block/1
  [endpointKey.SHIBUYA]: 1630937640, // Ref: 2021-09-06 14:14:00 https://shibuya.subscan.io/block/1
};

const getAveBlocksPerMins = ({
  chainId,
  latestBlock,
  timestampMillis,
}: {
  chainId: endpointKey.SHIBUYA | endpointKey.ASTAR | endpointKey.SHIDEN;
  latestBlock: number;
  timestampMillis: number;
}): number => {
  const currentTs = Math.floor(timestampMillis / 1000);
  const minsChainRunning = (currentTs - TS_FIRST_BLOCK[chainId]) / 60;
  const avgBlocksPerMin = latestBlock / minsChainRunning;
  return avgBlocksPerMin;
};

export const useApr = () => {
  const blockPerEra = useSelector<AppState, number>((state) => state.polkadotApi.blockPerEra);
  const era = useSelector<AppState, number>((state) => state.polkadotApi.era);
  const _stakerApr = useSelector<AppState, number>((state) => state.staking.stakerApr);
  const _stakerApy = useSelector<AppState, number>((state) => state.staking.stakerApy);
  const [stakerApr, setStakerApr] = useState(_stakerApr ?? 0);
  const [stakerApy, setStakerApy] = useState(_stakerApy ?? 0);

  useEffect(() => {
    if (blockPerEra && era) {
      const getApr = async (): Promise<number> => {
        const { api } = await GetPolkadotApi();
        try {
          const results: any[] = await Promise.all([
            api.consts.blockReward.rewardAmount.toString(),
            api.query.timestamp.now(),
            api.rpc.chain.getHeader(),
            api.query.blockReward.rewardDistributionConfigStorage<RewardDistributionConfig>(),
            api.query.dappsStaking.generalEraInfo(era),
          ]);
          const rawBlockRewards = results[0];
          const blockRewards = Number(defaultAmountWithDecimals(rawBlockRewards, 18));
          const eraRewards = blockPerEra * blockRewards;
          const latestBlock = results[2].toJSON().number as number;
          const avrBlockPerMins = getAveBlocksPerMins({
            chainId: currentNetworkIdx,
            timestampMillis: results[1].toNumber(),
            latestBlock,
          });
          const tvl = results[4].unwrap().locked;
          const avgBlocksPerDay = avrBlockPerMins * 60 * 24;
          const dailyEraRate = avgBlocksPerDay / blockPerEra;
          const annualRewards = eraRewards * dailyEraRate * 365.25;
          const totalStaked = Number(ethers.utils.formatUnits(tvl.toString(), 18));
          const developerRewardPercentage = Number(results[3].dappsPercent.toHuman().replace('%', '')) * 0.01;
          const stakerBlockReward = (1 - developerRewardPercentage) * DAPPS_REWARD_RATE;
          const stakerApr = (annualRewards / totalStaked) * stakerBlockReward * 100;

          if (stakerApr === Infinity) return 0;
          const stakerApy = aprToApy(stakerApr);
          setStakerApr(stakerApr);
          setStakerApy(stakerApy);
        } catch (e) {
          console.log(e);
        }
      };
      getApr();
    }
  }, [blockPerEra, era]);
  return {
    stakerApr,
    stakerApy,
  };
};
