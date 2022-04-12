import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react';
import { Currency, CurrencyAmount, currencyEquals, ETHER, Token } from '@my/sdk';
import { Text } from '@my/ui';
import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import { wrappedCurrency } from 'utils/wrappedCurrency';
import { ErrorCard } from 'components/Card';
import QuestionHelper from 'components/QuestionHelper';
import { useTranslation } from 'contexts/Localization';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCombinedActiveList } from '../../state/lists/hooks';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { useIsUserAddedToken, useAllInactiveTokens } from '../../hooks/Tokens';
import Column from '../Layout/Column';
import { RowFixed, RowBetween } from '../Layout/Row';
import { CurrencyLogo } from '../Logo';
import CircleLoader from '../Loader/CircleLoader';
import { isTokenOnList } from '../../utils';
import ImportRow from './ImportRow';
import ErrorSvg from './imgs/error.svg';
import { chainId } from 'config/constants/tokens';

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER[chainId] ? 'ETHER' : '';
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.text};
`;

const FixedContentRow = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`;

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>;
}

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    /* background-color: ${({ theme, disabled }) => !disabled && theme.colors.background}; */
    background-color: ${({ theme }) => theme.colors.cardBackground};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};

  .symbol {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
  .symbol-text {
    margin-top: 7px;
    font-size: 12px;
    color: #91919e;
  }
`;

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  currency: Currency;
  onSelect: () => void;
  isSelected: boolean;
  otherSelected: boolean;
  style: CSSProperties;
}) {
  const { account } = useActiveWeb3React();
  const key = currencyKey(currency);
  const selectedTokenList = useCombinedActiveList();
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency);
  const customAdded = useIsUserAddedToken(currency);
  const balance = useCurrencyBalance(account ?? undefined, currency);

  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size="24px" />
      <Column>
        <div className="symbol">{currency.symbol}</div>
        <div className="symbol-text">
          {!isOnSelectedList && customAdded && 'Added by user •'} {currency.name}
        </div>
      </Column>
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <CircleLoader /> : null}
      </RowFixed>
    </MenuItem>
  );
}

export default function CurrencyList({
  height,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showETH,
  showImportView,
  setImportToken,
  breakIndex,
}: {
  height: number;
  currencies: Currency[];
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherCurrency?: Currency | null;
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>;
  showETH: boolean;
  showImportView: () => void;
  setImportToken: (token: Token) => void;
  breakIndex: number | undefined;
}) {
  const itemData: (Currency | undefined)[] = useMemo(() => {
    let formatted: (Currency | undefined)[] = showETH ? [...[Currency.ETHER[chainId], ...currencies]] : currencies;
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)];
    }
    return formatted;
  }, [breakIndex, currencies, showETH]);

  const { t } = useTranslation();

  const inactiveTokens: {
    [address: string]: Token;
  } = useAllInactiveTokens();

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index];
      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency));
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency));
      const handleSelect = () => onCurrencySelect(currency);

      const token = wrappedCurrency(currency, chainId);

      const showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address);

      if (index === breakIndex || !data) {
        return (
          <FixedContentRow style={style}>
            <ErrorCard padding="6px 10px">
              <RowBetween>
                <img style={{ width: '28px', height: '24px' }} src={ErrorSvg} alt="" />
                <Text small color="secondary">
                  {t('Expanded results from inactive Token Lists')}
                </Text>
                <QuestionHelper
                  text={t(
                    "Tokens from inactive lists. Import specific tokens below or click 'Manage' to activate more lists.",
                  )}
                  ml="4px"
                />
              </RowBetween>
            </ErrorCard>
          </FixedContentRow>
        );
      }

      if (showImport && token) {
        return (
          <ImportRow style={style} token={token} showImportView={showImportView} setImportToken={setImportToken} dim />
        );
      }
      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      );
    },
    [inactiveTokens, onCurrencySelect, otherCurrency, selectedCurrency, setImportToken, showImportView, breakIndex, t],
  );

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), []);

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  );
}
