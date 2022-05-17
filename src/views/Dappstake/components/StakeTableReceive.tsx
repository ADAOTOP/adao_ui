import { Text } from '@my/ui';
import { useMemo } from 'react';
import styled from 'styled-components';
const TextStyle = styled(Text)`
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 10px;
  color: #91919e;
  padding-top: 24px;
`;
const StakeTableReceive = ({ receiveText }: { receiveText: string }) => {
  return useMemo(() => {
    return <TextStyle>{receiveText}</TextStyle>;
  }, [receiveText]);
};
export default StakeTableReceive;
