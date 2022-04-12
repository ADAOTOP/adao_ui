import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "40px",
    padding: "0 12px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    background: "linear-gradient(90deg, #303FFF, #C947D9)",
    color: "text",
  },
  [variants.SECONDARY]: {
    backgroundColor: "secondary",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "primary",
    border: "1px solid",
    borderColor: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "backgroundAlt",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "btnTextColor",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "btnTextColor",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    // border: "1px solid",
    // borderColor: "primary",
    // boxShadow: "none",
    color: "primary",
  },
};
