import { chainId, ibASTR } from 'config/constants/tokens';

export const getReceiveNum = (ratio: number, num: string, key: string) => {
  if (!ratio || !num) {
    return '0.00';
  }
  // ratio = 1.001 ASTR / ibASTR
  const ibASTRSymbol = ibASTR[chainId].symbol;
  const race = key === ibASTRSymbol ? ratio : 1 / ratio;
  const _num = race * Number(num);
  if (`${_num}` === `NaN`) {
    return '0.00';
  }
  return _num.toFixed(2);
};
