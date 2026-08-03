import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (course) => {
        const { items } = get();
        if (items.some((i) => i.id === course.id)) return;
        set({ items: [...items, course] });
      },

      removeItem: (courseId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== courseId) })),

      clearCart: () => set({ items: [] }),

      isInCart: (courseId) => get().items.some((i) => i.id === courseId),

      total: () =>
        get().items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0),

      count: () => get().items.length,
    }),
    {
      name: 'cart-store',
    }
  )
);

export default useCartStore;
