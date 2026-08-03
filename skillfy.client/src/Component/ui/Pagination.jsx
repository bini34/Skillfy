import { cn } from '../../lib/cn.js';

function PageButton({ children, active, disabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'min-w-[2rem] h-8 px-2 rounded text-sm font-medium transition-colors',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 outline-none',
        active
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:bg-gray-100',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
      )}
    >
      {children}
    </button>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className    = '',
}) {
  if (totalPages <= 1) return null;

  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const buildPages = () => {
    const total = 2 * siblingCount + 5;
    if (totalPages <= total) return range(1, totalPages);

    const leftSibling  = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, totalPages);
    const showLeft  = leftSibling > 2;
    const showRight = rightSibling < totalPages - 1;

    if (!showLeft && showRight) {
      return [...range(1, 3 + 2 * siblingCount), '…', totalPages];
    }
    if (showLeft && !showRight) {
      return [1, '…', ...range(totalPages - (3 + 2 * siblingCount) + 1, totalPages)];
    }
    return [1, '…', ...range(leftSibling, rightSibling), '…', totalPages];
  };

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <PageButton
        label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
      </PageButton>

      {buildPages().map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-gray-400 select-none">…</span>
        ) : (
          <PageButton
            key={p}
            active={p === page}
            label={`Page ${p}`}
            onClick={() => p !== page && onPageChange(p)}
          >
            {p}
          </PageButton>
        )
      )}

      <PageButton
        label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </PageButton>
    </nav>
  );
}

export default Pagination;
