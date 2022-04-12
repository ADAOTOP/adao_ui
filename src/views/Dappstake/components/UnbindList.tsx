import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Text } from '@my/ui';
import NoList from './NoList';
import Countdown from './Countdown';
import { IWithdrawRecordItem } from 'utils/types';
import useBlockNumber from 'state/application/hooks';
interface Iprops {
  withdraw: any;
  list: IWithdrawRecordItem[];
  withdraw_symbol: string;
}
const TextStyled = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #91919e;
  padding: 0px 10px;
  line-height: 20px;
  margin-top: 20px;
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
const UnbindList: FC<Iprops> = ({ list, withdraw, withdraw_symbol }) => {
  const lastBlockNumber = useBlockNumber();
  console.log(withdraw);
  return (
    <UnbindListStyled>
      <HeadingStyled>Unbinding Rules</HeadingStyled>
      <TextStyled>
        Due to the rules of ASTR dappstake it will take 2 days to unbind. When the time is up, you can claim it at any
        time
      </TextStyled>
      <UlStyled>
        {list && list.length
          ? list
              .sort((a, b) => Number(b.era.toString()) - Number(a.era.toString()))
              .map((v, index) => {
                return (
                  <li key={index}>
                    <TextAmount>
                      {v.amount || '-'}
                      &nbsp;
                      {withdraw_symbol}
                    </TextAmount>
                    <StatusWrap>
                      {v.status === 0 ? (
                        <Text fontSize="12px" color="#4C4C5C" bold>
                          Withdrawed
                        </Text>
                      ) : null}
                      {v.status === 1 && v.unbonding <= lastBlockNumber ? (
                        <ButtonStyled onClick={withdraw}>Withdraw</ButtonStyled>
                      ) : null}
                      {v.status === 1 && v.unbonding > lastBlockNumber ? (
                        <Countdown nextEventTime={(v.unbonding - lastBlockNumber) * 12} />
                      ) : null}
                      {/* {v.status === 2 ? <Countdown nextEventTime={v.time} /> : null} */}
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
const StatusWrap = styled.div`
  text-align: center;
  width: 100px;
`;
const ButtonStyled = styled(Button)`
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
  height: 24px;
  border-width: 1px;
  padding: 0;
  width: 100%;
`;
const UlStyled = styled.ul`
  margin-top: 20px;
  list-style: none;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    line-height: 20px;
    background: linear-gradient(0deg, #0d0d11, #3a3a4c);
    border-radius: 12px;
    padding: 9px 20px;
    margin-top: 9px;
    height: 42px;
    line-height: 42px;
    border: 1px solid #060608;
  }
`;
const UnbindListStyled = styled.div`
  margin-left: 0;
  background: linear-gradient(0deg, #0d0d11, #3a3a4c);
  border-radius: 23px;
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
