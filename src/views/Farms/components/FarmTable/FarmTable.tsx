import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTable, ColumnType } from '@my/ui';

import Row, { RowProps } from './Row';
import TableHeader from '../TableHeader';

export interface ITableProps {
  data: RowProps[];
  columns: ColumnType<RowProps>[];
  userDataReady: boolean;
  sortColumn?: string;
}

const Container = styled.div`
  // filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px;
  margin: 16px 0px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  overflow: hidden;
`;

export const TableHeaderStyled = styled.thead`
  & tr {
    background: ${({ theme }) => theme.colors.cardBackground};
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;
const TableBody = styled.tbody`
  & tr {
    background: ${({ theme }) => theme.colors.cardBackground};
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

const TableContainer = styled.div`
  position: relative;
  table tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  table tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
  table tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }

  table tr:first-child td:last-child {
    border-top-right-radius: 10px;
  }
`;

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null);
  const { data, columns, userDataReady } = props;

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' });

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableHeader />

            <TableBody>
              {rows.map((row, index) => {
                return (
                  <Row
                    {...row.original}
                    isLast={index === rows.length - 1}
                    userDataReady={userDataReady}
                    key={`table-row-${row.id}`}
                  />
                );
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        {/* <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer> */}
      </TableContainer>
    </Container>
  );
};

export default FarmTable;
