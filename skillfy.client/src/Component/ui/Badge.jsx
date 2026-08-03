import { cn } from '../../lib/cn.js';

const variantClass = {
  default: 'badge',
  success: 'badge-success',
  warning: 'badge-warning',
  danger:  'badge-danger',
  info:    'badge-info',
};

function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={cn(variantClass[variant] ?? variantClass.default, className)}>
      {children}
    </span>
  );
}

export default Badge;
