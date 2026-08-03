import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn.js';

const Textarea = forwardRef(function Textarea(
  {
    label,
    description,
    error,
    required,
    rows    = 4,
    resize  = 'vertical',
    className = '',
    id,
    ...props
  },
  ref
) {
  const autoId      = useId();
  const inputId     = id || autoId;
  const descId      = description ? `${inputId}-desc`  : undefined;
  const errorId     = error       ? `${inputId}-error` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

  const resizeClass = {
    none:       'resize-none',
    vertical:   'resize-y',
    horizontal: 'resize-x',
    both:       'resize',
  }[resize] ?? 'resize-y';

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
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn('input', resizeClass, error && 'input-error', className)}
        aria-invalid={error ? 'true' : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Textarea;
