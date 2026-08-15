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

const FLUTTERWAVE_INLINE_URL = "https://checkout.flutterwave.com/v3.js";

let scriptLoaded = false;
let scriptLoading: Promise<void> | null = null;

/**
 * Dynamically load the Flutterwave Inline v3 script into the page.
 * Safe to call multiple times — will only load once.
 */
function loadFlutterwaveScript(): Promise<void> {
  if (scriptLoaded && window.FlutterwaveCheckout) {
    return Promise.resolve();
  }

  if (scriptLoading) {
    return scriptLoading;
  }

  scriptLoading = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="${FLUTTERWAVE_INLINE_URL}"]`,
    );
    if (existingScript) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = FLUTTERWAVE_INLINE_URL;
    script.async = true;

    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("Failed to load Flutterwave checkout script"));
    };

    document.head.appendChild(script);
  });

  return scriptLoading;
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
export async function openFlutterwaveCheckout(
  config: FlutterwaveConfig,
): Promise<void> {
  await loadFlutterwaveScript();

  if (!window.FlutterwaveCheckout) {
    throw new Error(
      "FlutterwaveCheckout is not available after script load. Please try again.",
    );
  }

  window.FlutterwaveCheckout(config);
}
