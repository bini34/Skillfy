import { cn } from '../../lib/cn.js';

function Skeleton({ variant = 'text', className = '', width, height, lines = 3 }) {
  const base = 'animate-pulse rounded bg-gray-200';

  if (variant === 'text') {
    return (
      <div className={cn('space-y-2', className)} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, 'h-4', i === lines - 1 && lines > 1 && 'w-4/5')}
            style={width ? { width } : undefined}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div
        aria-hidden="true"
        className={cn(base, 'rounded-full', className)}
        style={{ width: width ?? '2.5rem', height: height ?? '2.5rem' }}
      />
    );
  }

  if (variant === 'image') {
    return (
      <div
        aria-hidden="true"
        className={cn(base, 'rounded-lg w-full', className)}
        style={{ height: height ?? '12rem' }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div aria-hidden="true" className={cn('rounded-xl border border-gray-100 overflow-hidden', className)}>
        <div className={cn(base, 'w-full h-40 rounded-none')} />
        <div className="p-4 space-y-3">
          <div className={cn(base, 'h-4 w-3/4')} />
          <div className={cn(base, 'h-3 w-full')} />
          <div className={cn(base, 'h-3 w-5/6')} />
          <div className="flex justify-between pt-2">
            <div className={cn(base, 'h-3 w-16')} />
            <div className={cn(base, 'h-6 w-20 rounded-full')} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(base, className)}
      style={{ width, height }}
    />
  );
}

export default Skeleton;
