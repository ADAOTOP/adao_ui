import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import UserWidget from './UserWidget';
import Logo from './Logo';
import Nav from './Nav';
import { Flex, useMatchBreakpoints } from '@my/ui';
const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  collapsed,
}) => {
  const { isXl } = useMatchBreakpoints();
  const [showBg, setShowBg] = useState(false);
  const refPrevOffset = useRef(window.pageXOffset);
  const isMobile = isXl === false;
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const size = isMobile ? 100 : 250;
      if (currentOffset > size) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isMobile]);
  return (
    <div
      className={className}
      style={{
        backgroundColor: showBg ? `rgba(6, 6, 8, 0.9)` : 'transparent',
      }}
    >
      <div className="inner">
        <FlFlex>
          <Logo collapsed={collapsed} />
          <Nav collapsed={collapsed} />
          <UserWidget />
        </FlFlex>
      </div>
    </div>
  );
};
const FlFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export default styled(Header)`
  position: fixed;
  top: 0px;
  width: 100%;
  transition: all 0.3s ease;
  z-index: 10;
  // background-color: ${({ theme }) => theme.colors.background};
  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 82px;
    // border-bottom: 1px dashed ${({ theme }) => theme.colors.cardBorder};
    > img {
      width: 25px;
      height: 20px;
    }

    > .right {
      // background-color: ${({ theme }) => theme.colors.background};
      // padding-top: 30px;
      // padding-bottom: 30px;
      padding-left: 40px;
      // display: flex;
      // align-items: center;
    }
  }
`;
