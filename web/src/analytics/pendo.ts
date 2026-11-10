// Pendo Track Events. The Pendo agent is loaded by the install snippet as the `pendo`
// global; it attaches the visitor and account to every event itself.
type TrackProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    pendo?: { track?: (event: string, properties?: TrackProperties) => void };
  }
}

/** Sends a Pendo Track Event, if the Pendo agent is loaded. Tracking never breaks the app. */
export function trackEvent(event: string, properties: TrackProperties): void {
  try {
    window.pendo?.track?.(event, properties);
  } catch {
    // Ignore tracking failures.
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days from one `YYYY-MM-DD` date to another. */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS);
}

/** Today's local date as `YYYY-MM-DD`. */
export function today(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
