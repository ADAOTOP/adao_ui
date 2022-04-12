import React from "react";
import styled, { DefaultTheme } from "styled-components";
import CheckmarkCircleIcon from "../Svg/Icons/CheckmarkCircle";
import ErrorIcon from "../Svg/Icons/Error";
import BlockIcon from "../Svg/Icons/Block";
import InfoIcon from "../Svg/Icons/Info";
import { Text } from "../Text";
import { IconButton } from "../Button";
import { CloseIcon } from "../Svg";
import Flex from "../Box/Flex";
import { AlertProps, variants } from "./types";

interface ThemedIconLabel {
  variant: AlertProps["variant"];
  theme: DefaultTheme;
  hasDescription: boolean;
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure;
    case variants.WARNING:
      return theme.colors.warning;
    case variants.SUCCESS:
      return theme.colors.success;
    case variants.INFO:
    default:
      return theme.colors.secondary;
  }
};

const getIcon = (variant: AlertProps["variant"] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return ErrorIcon;
    case variants.WARNING:
      return BlockIcon;
    case variants.SUCCESS:
      return CheckmarkCircleIcon;
    case variants.INFO:
    default:
      return InfoIcon;
  }
};

const IconLabel = styled.div<ThemedIconLabel>`
  border-radius: 12px 0 0 12px;
  color: ${({ theme }) => theme.alert.background};
  padding: 16px 20px 16px 20px;
  background-color: ${getThemeColor};
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : "12px")};
  padding-top: 12px;
`;

const CloseHandler = styled.div`
  border-radius: 0 12px 12px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`;

const StyledAlert = styled(Flex)<ThemedIconLabel>`
  position: relative;
  background: linear-gradient(90deg, #303fff, #c947d9);
  // background-color: ${getThemeColor};
  border-radius: 12px 0 0 12px;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`;
const ToastAlert = styled(IconButton)`
  svg {
    fill: ${({ theme }) => theme.colors.text};
    path {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;
const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant);

  return (
    <StyledAlert variant={variant} hasDescription={!!children}>
      <IconLabel variant={variant} hasDescription={!!children}>
        <Icon color="currentColor" width="36px" />
      </IconLabel>
      <Details hasHandler={!!onClick}>
        <Text fontWeight="700">{title}</Text>
        {typeof children === "string" ? (
          <Text as="p" fontSize="12px" lineHeight="16px" fontWeight="500">
            {children}
          </Text>
        ) : (
          children
        )}
      </Details>
      {onClick && (
        <CloseHandler>
          <ToastAlert scale="sm" variant="text" onClick={onClick}>
            <CloseIcon width="24px" color="currentColor" />
          </ToastAlert>
        </CloseHandler>
      )}
    </StyledAlert>
  );
};

export default Alert;
