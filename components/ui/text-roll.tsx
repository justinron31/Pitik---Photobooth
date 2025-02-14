"use client";
import {
  motion,
  VariantLabels,
  Target,
  TargetAndTransition,
  Transition,
} from "framer-motion";
import { ReactNode, ReactElement } from "react";
import React from "react";

export type TextRollProps = {
  children: ReactNode;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

interface ChildElement extends ReactElement {
  props: {
    children?: ReactNode;
    className?: string;
  };
}

const splitChildren = (children: ReactNode): (ReactNode | string)[] => {
  if (typeof children === "string") {
    return children.split("");
  }

  if (Array.isArray(children)) {
    return children.flatMap((child) => splitChildren(child));
  }

  if (React.isValidElement(children)) {
    const element = children as ChildElement;

    if (typeof element.props.children === "string") {
      return [
        React.cloneElement(element, element.props, element.props.children),
      ];
    }

    if (element.props.children) {
      return splitChildren(element.props.children);
    }

    return [element];
  }

  return children ? [children] : [];
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: "easeIn" },
  variants,
  onAnimationComplete,
}: TextRollProps) {
  const defaultVariants = {
    enter: {
      initial: { rotateX: 0 },
      animate: { rotateX: 90 },
    },
    exit: {
      initial: { rotateX: 90 },
      animate: { rotateX: 0 },
    },
  } as const;

  const elements = splitChildren(children);

  return (
    <span
      className={`text-8xl md:text-9xl lg:text-10xl font-extrabold tracking-tight text-[#444041] ${
        className ?? ""
      }`}
    >
      {elements.map((element, i) => {
        const content = React.isValidElement(element)
          ? element
          : element === " "
          ? "\u00A0"
          : element;

        return (
          <span
            key={i}
            className="relative inline-block  [perspective:10000px] [transform-style:preserve-3d]"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inline-block  [backface-visibility:hidden] [transform-origin:50%_25%]"
              initial={
                variants?.enter?.initial ?? defaultVariants.enter.initial
              }
              animate={
                variants?.enter?.animate ?? defaultVariants.enter.animate
              }
              transition={{
                ...transition,
                duration,
                delay: getEnterDelay(i),
              }}
            >
              {content}
            </motion.span>
            <motion.span
              className="absolute inline-block  [backface-visibility:hidden] [transform-origin:50%_100%]"
              initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
              animate={variants?.exit?.animate ?? defaultVariants.exit.animate}
              transition={{
                ...transition,
                duration,
                delay: getExitDelay(i),
              }}
              onAnimationComplete={
                elements.length === i + 1 ? onAnimationComplete : undefined
              }
            >
              {content}
            </motion.span>
            <span className="invisible">{content}</span>
          </span>
        );
      })}
      <span className="sr-only">{children}</span>
    </span>
  );
}
