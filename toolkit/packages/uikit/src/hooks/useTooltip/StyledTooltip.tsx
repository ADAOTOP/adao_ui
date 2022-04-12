import styled from "styled-components";

export const Arrow = styled.div`
  top: -8px;
  &,
  &::before {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: ${({ theme }) => theme.tooltip.background};
    border-left: ${({ theme }) => theme.tooltip.border};
    border-top: ${({ theme }) => theme.tooltip.border};
  }
`;

export const StyledTooltip = styled.div`
  padding: 20px 30px;
  font-size: 16px;
  line-height: 130%;
  border-radius: 6px;
  max-width: 360px;
  z-index: 101;
  color: ${({ theme }) => theme.tooltip.text};
  background: ${({ theme }) => theme.tooltip.background};
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  border: ${({ theme }) => theme.tooltip.border};
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px;
    max-width: 300px;
  }
  /* &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -4px;
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: -4px;
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: -4px;
  } */
`;
