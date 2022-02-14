import { Farm } from 'state/types';
import fetchPublicFarmData, { PublicFarmData } from './fetchPublicFarmData';

const fetchFarm = async (farm: Farm): Promise<Farm & PublicFarmData> => {
  const farmPublicData = await fetchPublicFarmData(farm);

  return { ...farm, ...farmPublicData };
};

export default fetchFarm;
