/// <reference types="vite/client" />

// Extend Window interface for requestIdleCallback
interface Window {
  requestIdleCallback?: (callback: () => void) => number;
  cancelIdleCallback?: (id: number) => void;
}
