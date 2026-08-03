import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token) => {
        if (token) localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true, isLoading: false });
      },

      clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      getRole: () => {
        const { user } = get();
        if (!user) return null;
        if (user.role?.$values?.length) return user.role.$values[0];
        if (Array.isArray(user.role)) return user.role[0];
        return user.role || null;
      },

      hasRole: (role) => {
        const userRole = get().getRole();
        if (!role) return true;
        if (Array.isArray(role)) return role.includes(userRole);
        return userRole === role;
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
