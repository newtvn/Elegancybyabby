import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-xs uppercase tracking-[0.15em] text-text-secondary font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-bg-dark transition-colors ${error ? "border-red-500" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-xs uppercase tracking-[0.15em] text-text-secondary font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-bg-dark transition-colors resize-none ${error ? "border-red-500" : ""} ${className}`}
          rows={4}
          {...props}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
