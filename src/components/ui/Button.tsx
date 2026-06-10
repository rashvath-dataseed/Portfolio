import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  external?: boolean;
}

const variants = {
  primary:
    'bg-white text-neutral-900 hover:bg-neutral-200',
  secondary:
    'border border-neutral-700 text-neutral-300 hover:bg-neutral-800/50',
  ghost:
    'text-neutral-400 hover:text-white hover:bg-neutral-800',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  external,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${variants[variant]} ${sizes[size]} ${className}`;
  const isInternalRoute = href?.startsWith("/");

  if (href) {
    if (isInternalRoute) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
