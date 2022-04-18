import { useEffect, useState } from 'react';
import { IDappStakingInterface } from 'utils/types';

export const GetStakingContractData = (contract) => {
  // 当前处理到的数据   recordsIndex-500  最多
  const [current_era, setCurrent_era] = useState(0);
  useEffect(() => {
    if (contract) {
      const getPool = async (contract: IDappStakingInterface) => {
        try {
          const __recordsIndex = await contract.read_current_era();
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
