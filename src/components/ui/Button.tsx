'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-dark)]';

  const variants = {
    primary:
      'bg-[var(--accent)] text-[var(--bg-dark)] hover:bg-[var(--accent-light)] hover:shadow-[0_0_30px_var(--accent-glow)] focus:ring-[var(--accent)]',
    secondary:
      'bg-transparent border-2 border-[var(--text-light)] text-[var(--text-light)] hover:bg-[var(--text-light)] hover:text-[var(--bg-dark)] focus:ring-[var(--text-light)]',
    ghost:
      'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-light)] hover:bg-[var(--border-subtle)] focus:ring-[var(--border-hover)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5';

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
