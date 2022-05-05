import BigNumber from 'bignumber.js';
import { RATIO_PRECISION, treasurycontract } from 'config/constants/dAppStaking';
import { chainId } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState, useAppDispatch } from 'state';
import { State } from 'state/types';
import { BIG_TEN } from 'utils/bigNumber';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { IDappStakingInterface, IWithdrawRecordItem } from 'utils/types';
import { fetchListSuccess, fetchSetStateSuccess, fetchStakingBalance, setcurrentEra, setTreasuryBalance } from '.';
import { simpleRpcProvider } from 'utils/providers';
interface pageInterface {
  pageSize: number;
  pageNum: number;
}
export interface IDappPoolDataInterface {
  totalSupply: string;
  ratio: number;
  recordsIndex: number;
  stakerApr: number;
  stakerApy: number;
}

const pageSize = 20;
export function useStakingState(): AppState['staking'] {
  return useSelector<AppState, AppState['staking']>((state) => state.staking);
}
export const useStakeBalance = () => {
  const { account } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account) {
      dispatch(fetchStakingBalance({ account }));
    }
  }, [dispatch, account]);
};
export const GetTreasuryContractData = () => {
  // 当前处理到的数据   recordsIndex-500  最多
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(treasurycontract[chainId]);
        const balance = getFullDisplayBalance(new BigNumber(walletBalance.toString()), 18, 8);
        dispatch(
          setTreasuryBalance({
            treasuryBalance: balance,
          }),
        );
      } catch (e) {}
    };
    getData();
  }, [dispatch]);
};
export const GetStakingContractData = (contract) => {
  // 当前处理到的数据   recordsIndex-500  最多
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (contract) {
      const getPool = async (contract: IDappStakingInterface) => {
        try {
          const __recordsIndex = await contract.read_current_era();
          dispatch(
            setcurrentEra({
              currentEra: Number(__recordsIndex.toString()),
            }),
          );
        } catch (e) {}
      };
      getPool(contract);
    }
  }, [contract, dispatch]);
};

export const GetPoolUpdate = (contract: IDappStakingInterface, mainContract) => {
  const dispatch = useAppDispatch();

  // const { stakerApr, stakerApy } = useApr();
  const [isLoad, setIsLoad] = useState(false);
  // console.log(stakerApr, stakerApy);
  useEffect(() => {
    const getPool = async (contract: IDappStakingInterface) => {
      if (!isLoad && contract && mainContract) {
        try {
          const __currentEra = await mainContract.read_current_era();
          const currentEra = Number(__currentEra.toString());
          const __recordsIndex = await contract.recordsIndex();
          const __totalSupply = await contract.totalSupply();
          const __ratio = await contract.ratio();
          // console.log('recordsIndex:', __recordsIndex.toString());
          const ratio = Number(__ratio.toString()) / RATIO_PRECISION;
          const _stakerApr = (ratio - 1) / (currentEra - 12) + 1;
          const stakerApr = _stakerApr > 0 ? _stakerApr : 0;
          const _stakerApy = (Math.pow(stakerApr, 365) - 1) * 100;
          const stakerApy = _stakerApy > 0 ? _stakerApy : 0;
          dispatch(
            fetchSetStateSuccess({
              totalSupply: getFullDisplayBalance(new BigNumber(__totalSupply.toString()), 18, 4),
              ratio,
              recordsIndex: Number(__recordsIndex.toString()),
              stakerApr: stakerApr,
              stakerApy: stakerApy,
              currentEra,
            }),
          );

          contract.on('PoolUpdate', (_recordsIndex, _totalSupply, _ratio) => {
            fetchSetStateSuccess({
              totalSupply: getFullDisplayBalance(new BigNumber(_totalSupply.toString()), 18, 4),
              ratio: Number(_ratio.toString()) / RATIO_PRECISION,
              recordsIndex: Number(_recordsIndex.toString()),
              // stakerApr: stakerApr,
              // stakerApy: stakerApy,
            });
          });
          return () => {
            contract = null;
          };
        } catch (e) {}
        setIsLoad(true);
      }
    };
    getPool(contract);
    // eslint-disable-next-line
  }, [dispatch, contract, mainContract]);
};

export const GetUserList = (contract: IDappStakingInterface, pendingTx: boolean) => {
  const { account } = useActiveWeb3React();
  // const account = '0xD15818BAF2D5ba10d554F037e16CC65D6B8c568F';
  // 当前处理到的数据   recordsIndex-500  最多
  const dispatch = useAppDispatch();
  const recordsIndex = useSelector((state: State) => state.staking.recordsIndex);
  useEffect(() => {
    // console.log({ recordsIndex, pendingTx });
    // console.log(112222, dispatch, contract, recordsIndex, account);
    if (dispatch && contract && account && !pendingTx) {
      const getList = async () => {
        try {
          //  dapptodo
          const _records = await contract.getUserRecordsLength(account);
          const records = Number(_records.toString());
          console.log('records: ', records);
          // const records = arr;
          const _unbondingPeriod = await contract.unbondingPeriod();
          const unbondingPeriod = Number(_unbondingPeriod.toString());
          let len: number = 0;
          if (recordsIndex > 500 && records > 500) {
            len = Math.ceil((records - recordsIndex + 500) / pageSize);
          } else {
            len = Math.ceil(records / pageSize);
          }
          const pageList: pageInterface[] = [];
          for (let i = 0; i < len; i++) {
            const _pageSize = i !== 0 && i === len - 1 ? len % pageSize : pageSize;
            pageList.push({
              pageNum: i * pageSize,
              pageSize: _pageSize,
            });
          }
          const _list: IWithdrawRecordItem[] = [];
          const promiseArr = pageList.map(async (item: pageInterface) => {
            console.log('item.pageNum, item.pageSize: ', item.pageNum, item.pageSize);
            const getListApi = await contract.getUserWithdrawRecords(account, item.pageNum, item.pageSize);
            // console.log({ getListApi });
            // const getListApi = arr;
            if (getListApi && getListApi.length) {
              for (let jj = 0; jj < getListApi.length; jj++) {
                // console.log('era:', getListApi[jj].era);
                _list.push({
                  era: Number(getListApi[jj].era.toString()),
                  address: getListApi[jj][1],
                  amount: Number(
                    `${new BigNumber(getListApi[jj].amount.toString())
                      .div(BIG_TEN.pow(18))
                      .toFixed(18, BigNumber.ROUND_DOWN)}`,
                  ).toLocaleString('en-US', {
                    maximumFractionDigits: 4,
                  }),
                });
              }
            }

            // console.log(222, _list, getListApi);
          });
          // console.log(2121214);
          await Promise.all(promiseArr);
          // console.log(1244551);

          const __list = _list.length ? _list.filter((v: IWithdrawRecordItem) => v.address === account) : [];
          console.log({ __list, _list });
          if (__list.length) {
            const ___list = __list.map((v) => ({
              ...v,
              status: Number(v.era.toString()) <= recordsIndex ? 0 : 1,
              unbonding: Number(v.era.toString()) + Number(unbondingPeriod.toString()),
            }));
            console.log(1111);
            dispatch(
              fetchListSuccess({
                account: account,
                list: ___list.sort((a, b) => b.era - a.era),
              }),
            );
            // console.log(232344);
            // setList(___list);
          }
        } catch (e) {
          // console.log('GetUserList err', e);
        }
      };
      getList();
    }
  }, [dispatch, contract, recordsIndex, account, pendingTx]);
};
