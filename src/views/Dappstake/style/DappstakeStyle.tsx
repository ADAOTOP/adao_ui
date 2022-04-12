import styled from 'styled-components';
import { Input, InputProps, Button } from '@my/ui';
export const InnerWrapper = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 60px auto 0;
  background: linear-gradient(90deg, #303fff, #c947d9);
`;
export const Header = styled.div``;
export const HeaderLi = styled.div``;
export const HeaderTitleH3 = styled.h3``;
export const HeaderTitleH6 = styled.h6``;
export const TableContent = styled.div``;
export const DappstakeContext = styled.div``;
const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning;
  }

  return theme.shadows.inset;
};
export const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  justify-content: space-between;
  align-content: center;
  box-shadow: ${getBoxShadow};

  border-radius: 16px;
  background: #1a1a22;
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 0;
  width: 100%;
  margin-bottom: 10px;
  // box-shadow: 0px 0px 0px 1px #1f363a, 0px 0px 0px 2px rgb(34 132 133);
`;
export const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
`;
// fontSize="12px" style={{ cursor: 'pointer' }} color="#ffffff" ml="8px"
export const MaxButton = styled(Button)`
  width: 20%;
  text-align: right;
  padding: 0 14px;
  margin: 0;
  align-items: center;
  justify-content: right;
  line-height: 30px;
  height: 30px;
  background: #262631;
  border-radius: 10px;
  width: auto;
`;
export const FarmStyled = styled.div`
  background: #1a1a22;
  border: 1px solid #060608;
  border-radius: 20px;
  padding: 15px 20px 25px;
  width: 100%;
`;
