// PWA utilities for service worker registration and offline handling

/**
 * Register the service worker with proper error handling and logging
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('Service Worker registered successfully:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available and will be used when all tabs for this page are closed.');
              // You could show a notification to the user here
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.warn('Service Workers not supported in this browser');
    return null;
  }
};

/**
 * Check if the app is currently online
 */
export const isOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Listen for online/offline events
 */
export const onOnlineStatusChange = (callback: (online: boolean) => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Check if the app is running in standalone mode (installed PWA)
 */
export const isStandalone = (): boolean => {
  // Check for iOS Safari
  const isInWebAppiOS = (window.navigator as any).standalone === true;

  // Check for Android Chrome
  const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;

  return isInWebAppiOS || isInWebAppChrome;
};

/**
 * Get the current display mode
 */
export const getDisplayMode = (): string => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
  const isBrowser = window.matchMedia('(display-mode: browser)').matches;

  if (isStandalone) return 'standalone';
  if (isMinimalUI) return 'minimal-ui';
  if (isBrowser) return 'browser';
  return 'unknown';
};
