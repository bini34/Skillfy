import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn.js';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const sizeClass = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-xl',
  '2xl':'max-w-2xl',
};

function Modal({
  open,
  onClose,
  title,
  children,
  size       = 'md',
  closeOnBackdrop = true,
  className  = '',
}) {
  const panelRef   = useRef(null);
  const triggerRef = useRef(null);

  // Save the element that opened the modal so focus can be restored
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    }
    return () => {
      if (!open && triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    };
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Focus the first focusable element when the modal opens
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const el = panelRef.current.querySelector(FOCUSABLE);
    el ? el.focus() : panelRef.current.focus();
  }, [open]);

  // Trap focus within the panel
  const trapFocus = useCallback((e) => {
    if (!panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === 'Escape') {
      onClose?.();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [open, trapFocus]);

  if (!open) return null;

  return createPortal(
    <div
      className="overlay"
      role="presentation"
      onClick={closeOnBackdrop ? (e) => { if (e.target === e.currentTarget) onClose?.(); } : undefined}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-modal overflow-hidden',
          'outline-none max-h-[90dvh] flex flex-col',
          sizeClass[size] ?? sizeClass.md,
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
