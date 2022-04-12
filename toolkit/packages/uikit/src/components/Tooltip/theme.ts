import { darkColors, lightColors } from "../../theme/colors";
import { TooltipTheme } from "./types";

export const light: TooltipTheme = {
  background: darkColors.tooltipColors.background,
  text: darkColors.text,
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
  border: `1px solid ${darkColors.tooltipColors.borderColor}`,
};

export const dark: TooltipTheme = {
  background: darkColors.tooltipColors.background,
  text: lightColors.text,
  boxShadow: "0px 4px 9px 1px rgba(9, 2, 18, 0.2);",
  border: `1px solid ${darkColors.tooltipColors.borderColor}`,
};
