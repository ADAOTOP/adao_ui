import { Placement, Padding } from "@popperjs/core";
import { CSSProperties } from "react";
export interface TooltipRefs {
    targetRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    tooltip: React.ReactNode;
    tooltipVisible: boolean;
    setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface TooltipOptions {
    placement?: Placement;
    trigger?: TriggerType;
    arrowPadding?: Padding;
    tooltipPadding?: Padding;
    tooltipOffset?: [number, number];
    tootipStyle?: CSSProperties;
    hideArrow?: boolean;
}
export declare type TriggerType = "click" | "hover" | "focus";
