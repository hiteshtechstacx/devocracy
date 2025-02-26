
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary hover:bg-primary/90 text-primary-foreground border-transparent",
      secondary:
        "bg-secondary hover:bg-secondary/90 text-secondary-foreground border-transparent",
      outline:
        "bg-transparent hover:bg-primary/10 text-foreground border-primary",
      ghost: "bg-transparent hover:bg-muted text-foreground border-transparent",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-md",
      md: "text-sm px-4 py-2 rounded-lg",
      lg: "text-base px-6 py-3 rounded-xl",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full border-2 border-b-transparent border-white animate-spin"></div>
          </div>
        )}
        <span
          className={cn(
            "flex items-center gap-2",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
