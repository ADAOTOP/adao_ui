import { FC } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMenu } from '../config';
import { Flex, useTooltip } from '@my/ui';
import CollapseSvg from '../imgs/collapse';
const BigNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { pathname } = useLocation();
  const {
    targetRef: BorrowTargetRef1,
    tooltip: BorrowTooltip1,
    tooltipVisible: BorrowTooltipVisible1,
  } = useTooltip('Coming Soon', {
    placement: 'right-start',
    trigger: 'hover',
    tootipStyle: {
      padding: '0 14px',
      backgroundImage: 'linear-gradient(90deg, #303FFF, #C947D9)',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '10px',
      lineHeight: '24px',
      border: 'none',
      fontWeight: 'bold',
      top: '-14px',
      left: '-14px',
    },
    hideArrow: true,
  });
  const {
    targetRef: BorrowTargetRef2,
    tooltip: BorrowTooltip2,
    tooltipVisible: BorrowTooltipVisible2,
  } = useTooltip('Coming Soon', {
    placement: 'right-start',
    trigger: 'hover',
    tootipStyle: {
      padding: '0 14px',
      backgroundImage: 'linear-gradient(90deg, #303FFF, #C947D9)',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '10px',
      lineHeight: '24px',
      border: 'none',
      fontWeight: 'bold',
      top: '-14px',
      left: '-14px',
    },
    hideArrow: true,
  });

  return (
    <>
      {BorrowTooltipVisible1 && BorrowTooltip1}
      {BorrowTooltipVisible2 && BorrowTooltip2}
      <NavWrap>
        {menuItems.map((item: IMenu, index) => (
          <NavLink
            to={item.link}
            key={index}
            onClick={() => {
              if (item.link.indexOf('https://') > -1) {
                window.open(item.link);
                return;
              }
            }}
            active={
              (
                item.link === '/'
                  ? pathname === item.link
                  : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                  ? item.link === '/swap'
                  : ['/dappstake/unbind', '/dappstake/stake', '/dappstake/unstake'].find((p) => pathname.startsWith(p))
                  ? item.link === '/dappstake/stake'
                  : ['/nft/pools', '/nft/wallet/mint', '/nft/wallet/burn'].find((p) => pathname.startsWith(p))
                  ? item.link === '/nft/pools/'
                  : pathname.startsWith(item.link)
              )
                ? 't'
                : 'f'
            }
          >
            {item.text}
            {item.children?.length && <CollapseSvg />}
          </NavLink>
        ))}
        <NavLinkP ref={BorrowTargetRef1}>Rewards</NavLinkP>
        <NavLinkP ref={BorrowTargetRef2}>Proposal</NavLinkP>
        <NavLinkP>
          <a href="https://docs.adaotop.com/" target="_blank" rel="noreferrer">
            Doc
          </a>
        </NavLinkP>
      </NavWrap>
    </>
  );
};

const NavWrap = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  a:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
      transform: scaleY(-1);
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  height: 43px;
  line-height: 43px;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-right: 34px;
  opacity: ${({ theme, active }) => (active === 't' ? 1 : '0.7')};
  svg {
    width: 20px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? '' : 'scaleY(-1)')};
  }
  &:hover {
    opacity: 0.7;
  }
`;
const NavLinkP = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  height: 40px;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-right: 34px;
  position: relative;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
export default BigNav;
