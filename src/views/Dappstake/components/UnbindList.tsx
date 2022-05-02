import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@my/ui';
import NoList from './NoList';
// import Countdown from './Countdown';
import { IWithdrawRecordItem } from 'utils/types';
// import useBlockNumber from 'state/application/hooks';
// import { LoadingIconStyle } from 'components/svg/Loading';
import { chainId } from 'config/constants/tokens';
import { ChainId } from '@my/sdk';
import Countdown from './Countdown';
// @ts-ignore
export const unbondingPeriod = chainId === ChainId.ASTR_TESTNET ? 2 : 4;

interface Iprops {
  withdraw: any;
  list: IWithdrawRecordItem[];
  pendingTxWithdraw: string;
  withdraw_symbol: string;
  currentEra: number;
  mainTokenSymbol: string;
  blocksUntilNextEra: number;
  era: number;
}
const TextStyled = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #91919e;
  padding: 0px 10px;
  line-height: 20px;
  margin-top: 6px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 10px;
  }
`;
const HeadingStyled = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 0px 10px;
`;
const TextAmount = styled(Text)`
  font-size: 14px;
  font-family: 'Gotham';
`;
const UnbindList: FC<Iprops> = ({
  list,
  withdraw,
  withdraw_symbol,
  pendingTxWithdraw,
  currentEra,
  mainTokenSymbol,
  blocksUntilNextEra,
  era,
}) => {
  // const lastBlockNumber = useBlockNumber();
  return (
    <UnbindListStyled>
      <HeadingStyled>Unbinding Rules</HeadingStyled>
      <TextStyled>
        Due to the {mainTokenSymbol}'s dappstaking rule, the maximum unlocking chunks is {unbondingPeriod}, and we are
        unlocking at era 12, 13, 14, 16. So the next era that can do unbinding is: 22. Sorry for the unconvinience, We
        are working in lifting this restriction.
        {/* 
        Due to the {mainTokenSymbol}'s dappstaking rule, users will take {unbondingPeriod} ERAs(About {unbondingPeriod}{' '}
        days) to unbind. When the time is up, {mainTokenSymbol} will be automatically sent to your address */}
      </TextStyled>
      <UlStyled>
        {list && list.length
          ? list.map((v, index) => {
              const mainEra = v.era + unbondingPeriod - currentEra;
              // 12 s/block   7200 block/day
              // // {/* blocksUntilNextEra+((record.era + unbondingPeriod - currentER)* 7200)  * 12  */} s
              //
              const timp = mainEra > 0 ? (blocksUntilNextEra + (v.era + unbondingPeriod - era - 1) * 7200) * 12 : 0;
              if (timp) {
                console.log({ blocksUntilNextEra, era }, 'v.era: ' + v.era);
              }
              return (
                <li key={index}>
                  <TextAmount>
                    {v.amount || '-'}
                    &nbsp;
                    {withdraw_symbol}
                  </TextAmount>
                  <StatusWrap>
                    {/* {v.status === 0 ? ( */}
                    {mainEra <= 0 ? (
                      <Text fontSize="12px" color="#4C4C5C" textAlign="right" bold>
                        Withdrawed
                      </Text>
                    ) : null}
                    {/* {v.status === 1 && mainEra <= 0 ? (
                      <ButtonStyled
                        onClick={() => {
                          withdraw(index);
                        }}
                        disabled={pendingTxWithdraw === `true${index}`}
                      >
                        Withdraw
                        {pendingTxWithdraw === `true${index}` ? <LoadingIconStyle /> : null}
                      </ButtonStyled>
                    ) : null} */}
                    {v.status === 1 && mainEra > 0 ? (
                      `${timp}` !== 'NaN' ? (
                        <>
                          {/* // <Flex alignItems="center" justifyContent="end"> */}
                          <LineText>{mainEra} Era</LineText>
                          {/* &nbsp; &nbsp; */}
                          <Countdown nextEventTime={timp} />
                          {/* // </Flex> */}
                        </>
                      ) : (
                        <LineText>{mainEra} Era</LineText>
                      )
                    ) : null}
                    {/* <Countdown nextEventTime={(v.unbonding - lastBlockNumber) * 12} /> */}
                  </StatusWrap>
                </li>
              );
            })
          : null}
      </UlStyled>
      {list.length === 0 ? <NoList /> : null}
    </UnbindListStyled>
  );
};
const LineText = styled(Text)`
  text-align: right;
  color: transparent;
  background: linear-gradient(90deg, #303fff 0%, #c947d9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
`;
const StatusWrap = styled.div`
  text-align: center;
  width: 140px;
`;
// const ButtonStyled = styled(Button)`
//   border-radius: 12px;
//   font-size: 10px;
//   font-weight: bold;
//   height: 24px;
//   border-width: 1px;
//   padding: 0;
//   width: 100%;
// `;
const UlStyled = styled.ul`
  margin-top: 20px;
  list-style: none;
  max-height: 268px;
  overflow-y: auto;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    line-height: 20px;
    background: linear-gradient(0deg, #0d0d11, #3a3a4c);
    border-radius: 12px;
    padding: 9px 20px;
    margin-top: 9px;
    min-height: 42px;
    line-height: 22px;
    border: 1px solid #060608;
  }
`;
const UnbindListStyled = styled.div`
  margin-left: 0;
  background: linear-gradient(0deg, #0d0d11, #3a3a4c);
  border-radius: 20px;
  margin-top: 12px;
  width: 600px;
  padding: 30px;
  @media screen and (min-width: 1200px) {
    margin-left: 16px;
    margin-top: 0;
    max-width: 320px;
  }
`;
export default UnbindList;
