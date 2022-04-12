import { FC, useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useMatchBreakpoints } from '@my/ui';
import Header from './Header';
const Wrapper = styled.div<{ collapsed: boolean }>`
  // background: linear-gradient(0deg, #0D0D11, #3A3A4C);
  flex: 1;
  display: flex;
  flex-direction: column;

  .amimation {
  }
`;
const BodyContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  // background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  transition: 0.15s padding;
  > .content {
    position: relative;
    padding-top: 72px;
    flex: 1;
  }
`;
const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isXs, isSm, isMd } = useMatchBreakpoints();

  useEffect(() => {
    if ([isXs, isSm, isMd].some(Boolean)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isXs, isSm, isMd]);

  return (
    <Wrapper className={className} collapsed={collapsed}>
      <Header setCollapsed={setCollapsed} collapsed={collapsed} />
      <BodyContainer collapsed={collapsed}>
        <div className="content">
          <div className="bg-holder">{children}</div>
        </div>
      </BodyContainer>
    </Wrapper>
  );
};

export default SideMenu;
