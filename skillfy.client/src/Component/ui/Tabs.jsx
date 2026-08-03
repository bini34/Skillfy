import { useState, useRef, useId } from 'react';
import { cn } from '../../lib/cn.js';

function Tabs({ tabs = [], defaultIndex = 0, onChange, className = '' }) {
  const [active, setActive] = useState(defaultIndex);
  const tabRefs  = useRef([]);
  const baseId   = useId();

  const select = (index) => {
    setActive(index);
    onChange?.(index);
  };

  const handleKeyDown = (e, index) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;

    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" className="flex border-b border-gray-200 gap-1" aria-label="Tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            type="button"
            id={`${baseId}-tab-${i}`}
            aria-controls={`${baseId}-panel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            disabled={tab.disabled}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded-t',
              active === i
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="pt-4 focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
