import { Flex } from '@my/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Treasury = () => {
  return (
    <TreasuryStyled>
      <div>
        <h6>Treasury</h6>
        <h3>$891,192,980.12</h3>
      </div>
      <div className="line"></div>
      <div className="fr">
        <h6>TVL</h6>
        <h3>$989,120.18</h3>
      </div>
      <div className="a_bg">
        <Link to="/dappstake/stake">Stake To Earn</Link>
      </div>
    </TreasuryStyled>
  );
};
const TreasuryStyled = styled(Flex)`
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  background: linear-gradient(90deg, #303fff, #c947d9);
  border-radius: 20px;
  margin: 0 20px 80px;
  padding: 20px 40px 24px;
  position: relative;
  // width: 80%;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 0 auto 120px;
  }
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
`;
export default Treasury;
