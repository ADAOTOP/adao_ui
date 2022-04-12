import Animation from 'components/SideMenu/Animation';
import React from 'react';
import { HomeGlobalStyled } from 'style/Global';
import Treasury from './components/Treasury';
import { HomeStyled } from './styled';

const Home: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <HomeStyled>
      <HomeGlobalStyled />
      <Animation />
      <div className="banner">
        <div className="h1">
          <h1>New Invest to Earn DAO Community Autonomy</h1>
        </div>
        <br />
        <p>
          A-DAO will be based on dApp staking of Astar Network. Users will get some of the developer rewards while
          participating and gaining basic rewards. At present, A-DAO divides the developer rewards into: Revenue Reward,
          On-chain Treasury, Incubation Fund, any rewards of which can be adjusted by DAO governance.
        </p>
      </div>
      <Treasury />
      <div className="list">
        <ul>
          <li>
            <div className="border-bg"></div>
            <div className="border-inner">
              <h2>Revenue Reward</h2>
              <p>
                60% of developer revenue will be distributed to all users who participate in staking Astar, for A-DAO
                itself was created to allow everyone to get more income.
              </p>
              <img src="/images/icon_rewards_hover.webp" alt="rewards" />
            </div>
          </li>
          <li>
            <div className="border-bg"></div>
            <div className="border-inner">
              <h2>On-chain Treasury</h2>
              <p>
                30% of the developer revenue will be allocated to the on-chain treasury, which will first be used to
                invest in ecological projects on Astar, including but not limited to: project investment, liquidity
                mining, etc.
              </p>
              <img src="/images/icon_Treasuury_hover.webp" alt="Treasuury" />
            </div>
          </li>
          <li>
            <div className="border-bg"></div>
            <div className="border-inner">
              <h2>Incubation Fund</h2>
              <p>
                10% of the earliest developer revenue will be allocated to the project side. After the establishment of
                the DAO committee, any builders who are conducive to ecological development can apply for this fund.
              </p>
              <img src="/images/iocn_Bonus_hover.webp" alt="Bonus" />
            </div>
          </li>
        </ul>
      </div>
      <div className="part_two">
        <div className="inner">
          <h3>A DAO that redefines the investment to earn mechanism. stay tuned!</h3>
          <div className="fr">
            <i></i>
            <img src="/images/image_shalou.webp" alt="Bonus" />
            <i className="fr_last"></i>
          </div>
        </div>
      </div>
      <div className="footer">
        <ul>
          <li>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/ADAO_Official">
              <img src="/images/twitter.svg" alt="twitter" />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://discord.gg/kBxZyUSeh4">
              <img src="/images/discord.svg" alt="telegram" />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://adao-official.medium.com/">
              <img src="/images/medium.svg" alt="medium" />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://github.com/ADAOTOP">
              <img src="/images/github-fill.svg" alt="github-fill" />
            </a>
          </li>
        </ul>
        <p>© 2022 The ADAO</p>
      </div>
    </HomeStyled>
  );
};

export default Home;
