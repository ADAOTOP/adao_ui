import { useEffect, useState } from 'react';
import { IDappStakingInterface } from 'utils/types';
export interface IDappPoolDataInterface {
  totalSupply: string;
  ratio: number;
  recordsIndex: number;
}
export const GetStakingContractData = (contract) => {
  // 当前处理到的数据   recordsIndex-500  最多
  const [current_era, setCurrent_era] = useState(0);
  useEffect(() => {
    if (contract) {
      const getPool = async (contract: IDappStakingInterface) => {
        try {
          console.log('__recordsIndex', contract.read_current_era);
          const __recordsIndex = await contract.read_current_era();
          console.log('__recordsIndex:', __recordsIndex);
          setCurrent_era(Number(__recordsIndex.toString()));
        } catch (e) {}
      };
      getPool(contract);
    }
  }, [contract]);
  return {
    current_era,
  };
};
