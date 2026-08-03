import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import Spinner from './Spinner.jsx';

const variantClass = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
};

const sizeClass = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

const Button = forwardRef(function Button(
  {
    children,
    variant    = 'primary',
    size       = 'md',
    loading    = false,
    fullWidth  = false,
    type       = 'button',
    className  = '',
    disabled,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        variantClass[variant] ?? variantClass.primary,
        sizeClass[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <>
          <Spinner size="sm" aria-hidden="true" />
          <span className="sr-only">Loading…</span>
        </>
      )}
      {children}
    </button>
  );
});

export default Button;
