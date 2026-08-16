/**
 * Flutterwave Inline Checkout — Vanilla JS Wrapper
 *
 * Dynamically loads the Flutterwave Inline v3 script and provides a typed
 * `openFlutterwaveCheckout()` function. This avoids importing
 * `flutterwave-react-v3` (which can cause SSR/React 19 issues in TanStack Start).
 *
 * The public key is fetched at runtime from the server function —
 * it is never bundled into the client-side JavaScript source.
 */

export interface FlutterwaveCustomer {
  email: string;
  phone_number?: string;
  name: string;
}

export interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options?: string;
  customer: FlutterwaveCustomer;
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  callback: (response: FlutterwaveResponse) => void;
  onclose: () => void;
}

export interface FlutterwaveResponse {
  status: string;
  transaction_id: number;
  tx_ref: string;
  flw_ref: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    name: string;
    phone_number?: string;
  };
}

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: FlutterwaveConfig) => void;
  }
}

/**
 * Wait for the Flutterwave Inline v3 script (loaded statically in <head>)
 * to initialise window.FlutterwaveCheckout. Polls with a short timeout to
 * handle any async bootstrap delay without injecting a duplicate script tag.
 */
function waitForFlutterwaveReady(timeoutMs = 8000): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (window.FlutterwaveCheckout) {
      resolve();
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      if (window.FlutterwaveCheckout) {
        clearInterval(interval);
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(
          new Error(
            "Flutterwave checkout did not initialise in time. Please check your internet connection and try again.",
          ),
        );
      }
    }, 100);
  });
}

/**
 * Generate a unique transaction reference for Flutterwave.
 */
export function generateTxRef(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `SEDDY-${timestamp}-${random}`;
}

/**
 * Open the Flutterwave Inline payment modal.
 *
 * @param config - The Flutterwave checkout configuration (public_key injected at runtime)
 * @throws If the script fails to load or FlutterwaveCheckout is not available
 */
export async function openFlutterwaveCheckout(config: FlutterwaveConfig): Promise<void> {
  await waitForFlutterwaveReady();

  if (!window.FlutterwaveCheckout) {
    throw new Error("FlutterwaveCheckout is not available after script load. Please try again.");
  }

  window.FlutterwaveCheckout(config);
}
