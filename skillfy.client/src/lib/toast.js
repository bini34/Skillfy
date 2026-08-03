import useUiStore from '../store/uiStore.js';

/**
 * Imperative toast helper — call outside React components (event handlers, API callbacks).
 *
 * @example
 *   toast.success('Course saved');
 *   toast.error('Unable to load courses');
 *   toast.warning('Session expiring soon');
 *   toast.info('Changes are still processing');
 */
export const toast = {
  success: (message) => useUiStore.getState().addToast(message, 'success'),
  error:   (message) => useUiStore.getState().addToast(message, 'error'),
  warning: (message) => useUiStore.getState().addToast(message, 'warning'),
  info:    (message) => useUiStore.getState().addToast(message, 'info'),
};
