import { Flex, Text } from '@my/ui';
import styled from 'styled-components';

export const ActionContainer = styled.div`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 12px;
  min-height: 110px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
  }
`;

export const ActionTitles = styled(Flex)`
  justify-content: space-between;
  align-items: center;
`;
export const ActionTitlesTitle = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;
export const ActionTitlesBalance = styled(Text)<{ balance: number }>`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme, balance }) => (balance ? theme.colors.primary : theme.colors.textSubSubtle)};
`;
export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    margin-top: 10px;
    width: 100%;
    height: 36px;
  }
`;
