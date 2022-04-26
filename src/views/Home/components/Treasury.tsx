import { Link } from 'react-router-dom';
import { GetTreasuryContractData, useStakingState } from 'state/staking/hooks';
import styled from 'styled-components';
import { usePrice } from 'state/price/hooks';
import { chainId, DEFAULT_Token } from 'config/constants/tokens';

const Treasury = () => {
  const staking = useStakingState();
  GetTreasuryContractData();
  const { totalSupply = '0', ratio = 1, recordsIndex = 1, mainTokenSymbol, treasuryBalance } = staking;
  const pool = {
    totalSupply,
    ratio,
    recordsIndex,
  };
  const { priceVsBusdMap } = usePrice();
  const main_token_busd = priceVsBusdMap[DEFAULT_Token[chainId].address.toLocaleLowerCase()];
  return (
    <TreasuryStyled>
      <div className="bg">
        <p className="t">Come to ADAO to participate in Astar dApp Staking to get higher returns</p>
      </div>
      <div className="inner">
        <div>
          <h6>Treasury</h6>
          <h3>
            {main_token_busd ? '$' : ''}
            {treasuryBalance
              ? Number(Number(treasuryBalance) * Number(main_token_busd ?? 1)).toLocaleString('en-US', {
                  maximumFractionDigits: 4,
                })
              : '-'}
            {main_token_busd ? '' : mainTokenSymbol}
          </h3>
        </div>
        <div className="line"></div>
        <div className="fr">
          <h6>TVL</h6>
          <h3>
            {main_token_busd ? '$' : ''}
            {Number(Number(pool.totalSupply) * (pool?.ratio ?? 1) * Number(main_token_busd ?? 1)).toLocaleString(
              'en-US',
              {
                maximumFractionDigits: 4,
              },
            )}
            {main_token_busd ? '' : mainTokenSymbol}
          </h3>
        </div>
        <div className="a_bg">
          <Link to="/dappstake/stake">Stake To Earn</Link>
        </div>
      </div>
    </TreasuryStyled>
  );
};
const TreasuryStyled = styled.div`
  max-width: 1000px;
  margin: 0 20px 80px;

  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    // height: 44px;
    // position: absolute;
    // top: 0;
    // left: 0;
    background: linear-gradient(0deg, #0d0d11, #343443);
    transform: perspective(21px) rotateX(5deg);
    transform-origin: bottom;
    border-radius: 2px 2px 0 0;
  }
  .t {
    position: relative;
    z-index: 2;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    // background: linear-gradient(90deg, #303fff 0%, #c947d9 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // display: inline-block;
    transform: perspective(22px) rotateX(-5deg);
    transform-origin: bottom;
    padding: 30px 40px 10px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 10px 30px 10px;
    }
  }
  // width: 80%;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 0 auto 120px;
  }
  .inner {
    background: linear-gradient(90deg, #303fff, #c947d9);
    border-radius: 2px 2px 20px 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px 25px;
    & > div {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    ${({ theme }) => theme.mediaQueries.md} {
      & > div {
        margin-bottom: 0;
      }
    }
    .line {
      width: 1px;
      height: 60px;
      background-color: #fff;
      opacity: 0.4;
      display: none;
      ${({ theme }) => theme.mediaQueries.md} {
        display: block;
      }
    }
    .fr {
      // padding-right: 100px;
    }
    h6 {
      font-size: 14px;
      line-height: 30px;
    }
    h3 {
      font-size: 24px;
    }
    .a_bg {
      border-radius: 12px;
      background-color: #fff;
      height: 40px;
      line-height: 40px;
      a {
        display: block;
        background: linear-gradient(90deg, #303fff 0%, #c947d9 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding: 0 26px;
        font-weight: bold;
      }
    }
  }
`;
export default Treasury;
