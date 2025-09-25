import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export const startMockWorker = async () => {
  if (import.meta.env.DEV) {
    try {
      await worker.start({
        onUnhandledRequest: "bypass",
        quiet: false,
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
};
