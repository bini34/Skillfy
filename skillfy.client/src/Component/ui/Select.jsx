import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';

const Select = forwardRef(function Select(
  {
    label,
    description,
    error,
    required,
    placeholder,
    options = [],
    className = '',
    id,
    children,
    ...props
  },
  ref
) {
  const autoId      = useId();
  const inputId     = id || autoId;
  const descId      = description ? `${inputId}-desc`  : undefined;
  const errorId     = error       ? `${inputId}-error` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}
      {description && (
        <p id={descId} className="text-xs text-gray-500 mb-1">{description}</p>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn(
          'input appearance-none bg-no-repeat',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")]',
          'bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] pr-9',
          error && 'input-error',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children
          ? children
          : options.map(({ value, label: optLabel, disabled: optDisabled }) => (
              <option key={value} value={value} disabled={optDisabled}>
                {optLabel}
              </option>
            ))}
      </select>
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
