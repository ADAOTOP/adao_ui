import styled from 'styled-components';
import { Input, InputProps, Button } from '@kaco/adao_ui';
export const InnerWrapper = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 60px auto 0;
  background-image: linear-gradient(270deg, #fc00ff 0%, #7d49ff 100%);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: 2px 4px 7px 1px rgba(9, 2, 18, 0.3);
  border-radius: 10px;
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
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 30px;
  width: 100%;
  margin-bottom: 30px;
`;
export const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
`;
// fontSize="12px" style={{ cursor: 'pointer' }} color="#1BD3D5" ml="8px"
export const MaxButton = styled(Button)`
  width: 20%;
  text-align: right;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: right;
  line-height: 40px;
  height: 40px;
`;
