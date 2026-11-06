"use client";

import { createElement, type ReactNode } from "react";
import { useInspect } from "./inspect";

type InspectableProps = {
  as?: "a" | "article" | "div";
  label: string;
  tokens: string[];
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  children: ReactNode;
};

/**
 * Client island that reports its tokens to the Inspector on hover and focus,
 * so the surrounding markup can stay a server component.
 */
export function Inspectable({
  as = "div",
  label,
  tokens,
  children,
  ...rest
}: InspectableProps) {
  const { inspect, reset } = useInspect();
  const show = () => inspect({ label, tokens });

  return createElement(
    as,
    {
      ...rest,
      onMouseEnter: show,
      onMouseLeave: reset,
      onFocus: show,
      onBlur: reset,
    },
    children,
  );
}
