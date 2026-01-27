// Standardized form component patterns for RCF FUTA E-Library

import { InputHTMLAttributes, ButtonHTMLAttributes, forwardRef, useId } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

// Input component with consistent styling
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'block w-full rounded-lg border-2 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-0 sm:text-sm',
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-rcf-gold',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Button component with consistent styling
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled, 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-rcf-navy text-white shadow-sm hover:bg-rcf-navy-light focus-visible:outline-rcf-navy',
      secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline-gray-500',
      outline: 'border-2 border-rcf-navy text-rcf-navy bg-transparent hover:bg-rcf-navy hover:text-white focus-visible:outline-rcf-navy'
    };
    
    const sizes = {
      sm: 'px-3 py-2 text-xs',
      md: 'px-4 py-3 text-sm',
      lg: 'px-6 py-4 text-base'
    };
    
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Link component with consistent styling
export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'muted';
}

export const Link = ({ href, children, className, variant = 'primary' }: LinkProps) => {
  const variants = {
    primary: 'font-medium text-rcf-navy hover:text-rcf-navy-light',
    muted: 'text-gray-600 hover:text-gray-800'
  };
  
  return (
    <a
      href={href}
      className={clsx(variants[variant], 'transition-colors', className)}
    >
      {children}
    </a>
  );
};