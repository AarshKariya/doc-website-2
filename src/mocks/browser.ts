// MSW browser setup
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Setup the worker with our handlers
export const worker = setupWorker(...handlers);

// Start the worker in development
export const startMockWorker = async () => {
  if (import.meta.env.DEV) {
    console.log("🚀 Starting MSW (Mock Service Worker)...");

    try {
      await worker.start({
        onUnhandledRequest: "bypass", // Let unhandled requests pass through
        quiet: false, // Show MSW logs
      });

      console.log(
        "✅ MSW started successfully! All API calls will be intercepted."
      );
      console.log(
        "🔍 Check the Network tab in DevTools to see the intercepted requests."
      );

      return true;
    } catch (error) {
      console.error("❌ Failed to start MSW:", error);
      return false;
    }
  }

  return false;
};
