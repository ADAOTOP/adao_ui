import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { BaseButtonProps, PolymorphicComponent, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle)};
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return (
      <Bg showBorder={false}>
        <InactiveButton
          style={{
            height: "36px",
            width: "124px",
            color: "#4C4C5C",
          }}
          forwardedAs={as}
          variant={variant}
          {...props}
        />
      </Bg>
    );
  }

  return (
    <Bg showBorder={true}>
      <Button
        style={{
          height: "36px",
          width: "124px",
          background: "linear-gradient(0deg, #0D0D11, #3A3A4C)",
          color: "#ffffff",
        }}
        as={as}
        variant={variant}
        {...props}
      />
    </Bg>
  );
};
const Bg = styled.div<{ showBorder: boolean }>`
  background: ${({ showBorder }) => (showBorder ? "linear-gradient(90deg, #58586d, #060608)" : "transparent")};
  padding: 1px;
  border-radius: 12px;
`;
export default ButtonMenuItem;
