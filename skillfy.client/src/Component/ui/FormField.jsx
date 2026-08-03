import { useId } from 'react';
import { cn } from '../../lib/cn.js';

function FormField({
  label,
  description,
  error,
  required,
  className = '',
  id,
  children,
}) {
  const autoId      = useId();
  const fieldId     = id || autoId;
  const descId      = description ? `${fieldId}-desc`  : undefined;
  const errorId     = error       ? `${fieldId}-error` : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={fieldId} className="label">
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}
      {description && (
        <p id={descId} className="text-xs text-gray-500 mb-1">{description}</p>
      )}
      {typeof children === 'function'
        ? children({ id: fieldId, 'aria-describedby': [descId, errorId].filter(Boolean).join(' ') || undefined, 'aria-invalid': error ? 'true' : undefined })
        : children}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
