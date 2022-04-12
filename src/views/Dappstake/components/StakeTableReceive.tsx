import { Text } from '@my/ui';
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
  return <TextStyle>{receiveText}</TextStyle>;
};
export default StakeTableReceive;
