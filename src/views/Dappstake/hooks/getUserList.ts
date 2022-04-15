import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { BIG_TEN } from 'utils/bigNumber';
import { IDappStakingInterface, IWithdrawRecordItem } from 'utils/types';
interface pageInterface {
  pageSize: number;
  pageNum: number;
}
const pageSize = 20;
export const GetUserList = (
  contract: IDappStakingInterface,
  recordsIndex: number,
  account: string,
): IWithdrawRecordItem[] => {
  // 当前处理到的数据   recordsIndex-500  最多
  const [list, setList] = useState<IWithdrawRecordItem[]>([]);
  useEffect(() => {
    if (contract && recordsIndex && account) {
      console.log(222);
      const getList = async () => {
        try {
          //  dapptodo
          const _records = await contract.getRecordsLength();
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
              pageNum: i,
              pageSize: _pageSize,
            });
          }
          const _list: IWithdrawRecordItem[] = [];
          const promiseArr = pageList.map(async (item: pageInterface) => {
            console.log('item.pageNum, item.pageSize: ', item.pageNum, item.pageSize);
            const getListApi = await contract.getWithdrawRecords(item.pageNum, item.pageSize);
            console.log({ getListApi });
            // const getListApi = arr;
            if (getListApi && getListApi.length) {
              for (let jj = 0; jj < getListApi.length; jj++) {
                console.log('era:', getListApi[jj].era);
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

            console.log(222, _list, getListApi);
          });
          await Promise.all(promiseArr);

          const __list = _list.length ? _list.filter((v: IWithdrawRecordItem) => v.address === account) : [];
          console.log({ __list, _list });
          if (__list.length) {
            const ___list = __list.map((v) => ({
              ...v,
              status: Number(v.era.toString()) <= recordsIndex ? 0 : 1,
              unbonding: Number(v.era.toString()) + Number(unbondingPeriod.toString()),
            }));
            setList(___list);
          }
        } catch (e) {
          console.log('GetUserList err', e);
        }
      };
      getList();
    }
  }, [contract, recordsIndex, account]);
  return list;
};
