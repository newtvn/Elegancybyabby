"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-bg-dark text-text-light hover:bg-bg-dark-secondary font-medium",
  outline: "border border-bg-dark text-text-primary hover:bg-bg-dark hover:text-text-light",
  ghost: "text-text-muted hover:text-text-primary hover:bg-bg-secondary",
  dark: "bg-gold text-white hover:bg-gold-bright font-medium",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
