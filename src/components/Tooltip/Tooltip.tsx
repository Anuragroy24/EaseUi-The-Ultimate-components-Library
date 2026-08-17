import React, { useEffect, useId, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";

const tooltipVariants = cva(
  "absolute z-50 w-max max-w-xs rounded-md font-medium shadow-lg whitespace-normal text-center pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white",
        light: "bg-white text-gray-800 border border-gray-200",
        primary: "bg-indigo-600 text-white",
        outline: "bg-white text-gray-700 border border-gray-300",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
        left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
        right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
      position: "top",
    },
  }
);

const arrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      dark: "bg-slate-900",
      light: "bg-white",
      primary: "bg-indigo-600",
      outline: "bg-white",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -mt-1",
      bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
      left: "left-full top-1/2 -translate-y-1/2 -ml-1",
      right: "right-full top-1/2 -translate-y-1/2 -mr-1",
    },
  },
  defaultVariants: {
    variant: "dark",
    position: "top",
  },
});

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  delay?: number;
  disabled?: boolean;
  showArrow?: boolean;
  trigger?: "hover" | "click";
  animation?: keyof typeof entranceAnimations;
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      className,
      variant = "dark",
      size = "md",
      position = "top",
      delay = 200,
      disabled = false,
      showArrow = true,
      trigger = "hover",
      animation = "fadeIn",
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipId = useId();

    const assignRef = (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const clearTimers = () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };

    const show = () => {
      if (disabled) return;
      clearTimers();
      showTimer.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
      clearTimers();
      hideTimer.current = setTimeout(() => setVisible(false), 80);
    };

    const toggle = () => {
      if (disabled) return;
      clearTimers();
      setVisible((prev) => !prev);
    };

    useEffect(() => {
      return () => clearTimers();
    }, []);

    useEffect(() => {
      const el = tooltipRef.current;
      if (!el || !visible || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [visible, animation]);

    useEffect(() => {
      if (trigger !== "click" || !visible) return;

      const handleOutsideClick = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setVisible(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setVisible(false);
      };

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [trigger, visible]);

    return (
      <div
        ref={assignRef}
        className="relative inline-flex"
        aria-describedby={visible ? tooltipId : undefined}
        {...props}
        onMouseEnter={() => trigger === "hover" && show()}
        onMouseLeave={() => trigger === "hover" && hide()}
        onFocus={() => trigger === "hover" && show()}
        onBlur={() => trigger === "hover" && hide()}
        onClick={trigger === "click" ? toggle : undefined}
      >
        {children}

        {visible && (
          <div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              tooltipVariants({ variant, size, position }),
              className
            )}
          >
            {content}
            {showArrow && (
              <span
                className={arrowVariants({ variant, position })}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
