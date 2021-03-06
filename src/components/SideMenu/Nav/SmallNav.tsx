import React, { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTooltip } from '@my/ui';
import { IMenu } from '../config';
import CollapseSvg from '../imgs/collapse';
import IconClose from '../imgs/iconClose';
import IconMenu from '../imgs/iconMenu';
const SmallNavTooltip: FC<{ _menuItems: IMenu[]; setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>> }> =
  ({ _menuItems, setTooltipVisible }) => {
    const { pathname } = useLocation();
    const [menuItems, setMenuItems] = useState(_menuItems);
    const { targetRef: BorrowTargetRef, tooltip: BorrowTooltip } = useTooltip('Comming Soon', {
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
        width: '120px',
        textAlign: 'center',
        top: '19px',
      },
      hideArrow: true,
    });
    return (
      <NavWrap>
        {menuItems.map((item, index) => (
          <div key={index}>
            <NavLink
              active={
                (
                  item.link === '/'
                    ? pathname === item.link
                    : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                    ? item.link === '/swap'
                    : ['/dappstake/unbind', '/dappstake/stake', '/dappstake/unstake'].find((p) =>
                        pathname.startsWith(p),
                      )
                    ? item.link === '/dappstake/stake'
                    : ['/nft/pools', '/nft/wallet/mint', '/nft/wallet/burn'].find((p) => pathname.startsWith(p))
                    ? item.link === '/nft/pools/'
                    : pathname.startsWith(item.link)
                )
                  ? 't'
                  : 'f'
              }
              to={item.link}
              key={item.link}
              onClick={() => {
                setTooltipVisible(false);
                if (item.link.indexOf('https://') > -1) {
                  window.open(item.link);
                  return;
                }
                setMenuItems([...menuItems.map((v) => (v.children ? { ...v, collapsed: true } : v))]);
                if (item.children?.length) {
                  setMenuItems([
                    ...menuItems.slice(0, index),
                    { ...item, collapsed: !item.collapsed },
                    ...menuItems.slice(index + 1),
                  ]);
                }
              }}
            >
              {item.text}
              {item.children?.length && <CollapseSvg />}
            </NavLink>
          </div>
        ))}
        <NavLinkP ref={BorrowTargetRef}>
          Rewards
          {BorrowTooltip}
        </NavLinkP>
      </NavWrap>
    );
  };

const SmallNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const setMoreTooltipVisible = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
  const {
    targetRef: MenuTargetRef,
    tooltip: MenuTooltip,
    tooltipVisible: MenuTooltipVisible,
    setTooltipVisible,
  } = useTooltip(
    <>
      <SmallNavTooltip _menuItems={menuItems} setTooltipVisible={setMoreTooltipVisible.current} />
    </>,
    {
      trigger: 'click',
      tootipStyle: {
        border: 'none',
        backgroundColor: 'transparent',
        width: '100vw',
        padding: 0,
        left: 0,
        borderRadius: 0,
        transform: 'translate3d(0, 72px, 0px)',
      },
      placement: 'bottom-start',
      hideArrow: true,
    },
  );
  useEffect(() => {
    setMoreTooltipVisible.current = setTooltipVisible;
  }, [setTooltipVisible]);
  useEffect(() => {
    if (MenuTooltipVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [MenuTooltipVisible]);

  return (
    <>
      {MenuTooltipVisible && MenuTooltip}
      <MenuBtn ref={MenuTargetRef}>{MenuTooltipVisible ? <IconClose /> : <IconMenu />}</MenuBtn>
    </>
  );
};
const NavWrap = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 30px;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  background-color: rgba(6, 6, 8, 0.9);
  &::-webkit-scrollbar {
    display: none;
  }
  .sub-menu {
    margin: 10px 0 20px;
  }
`;

const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  height: 60px;
  line-height: 60px;
  transition: all 0.3s ease;
  font-weight: 600;
  text-align: left;
  width: 100%;
  display: block;
  padding-left: 20px;
  svg {
    width: 36px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? 'none' : 'scaleY(-1)')};
  }
`;

const MenuBtn = styled.div`
  position: fixed;
  // top: (72-40)/2;
  top: 19px;
  right: 16px;
  cursor: pointer;
  & > svg {
    width: 40px;
    fill: ${({ theme }) => theme.colors.text};
  }
`;
const NavLinkP = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  height: 60px;
  line-height: 60px;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-right: 34px;
  position: relative;
  width: 80px;
  text-align: left;
  display: block;
  padding-left: 20px;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
export default SmallNav;
