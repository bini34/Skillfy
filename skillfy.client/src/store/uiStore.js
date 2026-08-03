import { create } from 'zustand';

const TOAST_DURATION_MS = 4000;
const DEDUPE_WINDOW_MS  = 800;

const useUiStore = create((set, get) => ({
  mobileNavOpen: false,
  toasts: [],

  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  closeMobileNav:  () => set({ mobileNavOpen: false }),

  addToast: (message, type = 'info') => {
    // Suppress duplicate toasts raised within a short window
    const existing = get().toasts;
    const duplicate = existing.find(
      (t) => t.message === message && t.type === type && Date.now() - t.created < DEDUPE_WINDOW_MS
    );
    if (duplicate) return;

    const id = Date.now();
    set((s) => ({
      toasts: [...s.toasts, { id, message, type, created: id }],
    }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, TOAST_DURATION_MS);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export default useUiStore;
