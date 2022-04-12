import React from 'react';
import { Text, useMatchBreakpoints } from '@my/ui';
import { TableHeaderStyled } from './FarmTable/FarmTable';
import styled from 'styled-components';
const TextStyled = styled(Text)`
  padding-top: 30px;
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`;
const FirstTh = styled(TextStyled)`
  padding-left: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`;
const TextFrStyled = styled(TextStyled)`
  text-align: right;
`;
const TableHeader = () => {
  const { isXs, isSm } = useMatchBreakpoints();
  if (isXs || isSm) {
    return (
      <TableHeaderStyled>
        <tr>
          <th>
            <FirstTh>Pool</FirstTh>
          </th>
          <th>
            <TextStyled>Rewards</TextStyled>
          </th>
          <th>
            <TextFrStyled>APY</TextFrStyled>
          </th>
          <th>
            <TextStyled></TextStyled>
          </th>
        </tr>
      </TableHeaderStyled>
    );
  }
  return (
    <TableHeaderStyled>
      <tr>
        <th>
          <FirstTh>Pool</FirstTh>
        </th>
        <th>
          <TextStyled>TVL</TextStyled>
        </th>
        <th>
          <TextStyled>APY</TextStyled>
        </th>
        <th>
          <TextStyled>Rewards</TextStyled>
        </th>
        <th>
          <TextStyled></TextStyled>
        </th>
      </tr>
    </TableHeaderStyled>
  );
};
export default TableHeader;
