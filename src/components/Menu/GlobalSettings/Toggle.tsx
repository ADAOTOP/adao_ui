import React from 'react';
import styled from 'styled-components';

export interface ToggleProps {
  checked?: boolean;
  onChange: () => void;
  className?: string;
}

// const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
//   return <img style={{ cursor: 'pointer' }} src={checked ? ToggleOn : ToggleOff} alt="" onClick={onChange} />;
// };

const Wrapper = styled.div<{ checked: boolean }>`
  user-select: none;
  cursor: pointer;
  width: 68px;
  height: 32px;
  background-color: ${(props) => (props.checked ? 'rgb(27, 211, 213)' : 'rgb(18, 33, 36)')};
  border-radius: 32px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.colors.cardBackground};

  > .inside {
    margin-left: ${(props) => (props.checked ? '34px' : '0px')};
    transition: margin-left 0.08s;
    height: 20px;
    width: 24px;
    border-radius: 20px;
    background-color: ${(props) => (props.checked ? 'rgb(223, 235,255)' : 'rgb(31, 55, 59)')};
  }
`;

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, className }) => {
  return (
    <Wrapper className={className} checked={checked || false} onClick={onChange}>
      <div className="inside" />
    </Wrapper>
  );
};

export default Toggle;
