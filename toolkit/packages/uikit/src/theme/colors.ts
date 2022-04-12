import { Colors } from "./types";

export const baseColors = {
  primary: "#FFFFFF",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#212929",
  failure: "#FF2d55",
  success: "#31D0AA",
  warning: "#D87E2C",
};

export const tooltipColors = {
  background: "#0d1012",
  borderColor: "#384748",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#1A1A22",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
};
export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  tooltipColors,
  background: "#060608",
  backgroundDisabled: "#3c3742",
  backgroundAlt: "linear-gradient(0deg,#0d0d11,#3a3a4c)",
  cardBorder: "#060608",
  cardBackground: "#1A1A22",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#191326",
  input: "#372F47",
  inputSecondary: "#060608",
  primaryDark: "#0098A1",
  tertiary: "#1A1A22",
  text: "#FFFFFF",
  textDisabled: "#4C4C5C",
  textSubtle: "#91919E",
  textSubSubtle: "#3C4E4E",
  disabled: "#524B63",
  btnTextColor: "#fff",
  btnBgSecondaryColor: "#01100f",
  textGradient: "linear-gradient(90deg, #f561ea 0%, #128aff 50%,#f561ea 100%)",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
  borderColor: "#384748",
};
export const lightColors = darkColors;
