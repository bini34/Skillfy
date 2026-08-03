import { clsx } from 'clsx';

/**
 * Compose Tailwind class names conditionally.
 * Accepts the same arguments as clsx.
 * Does NOT merge conflicting Tailwind utilities (e.g. p-2 + p-4 both stay).
 * If conflict merging becomes a real issue, add tailwind-merge.
 *
 * @example
 *   cn('btn', isActive && 'btn-primary', className)
 */
export function cn(...inputs) {
  return clsx(...inputs);
}
