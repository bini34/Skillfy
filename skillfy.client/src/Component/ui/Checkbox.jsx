import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';

const Checkbox = forwardRef(function Checkbox(
  {
    label,
    description,
    error,
    className = '',
    id,
    disabled,
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
      <div className="flex items-start gap-2">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary-600',
            'focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-400',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {label && (
          <div>
            <label
              htmlFor={inputId}
              className={cn('text-sm font-medium text-gray-700 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
            >
              {label}
            </label>
            {description && (
              <p id={descId} className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="field-error mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
