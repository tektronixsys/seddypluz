import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server function: Get the Flutterwave public key.
 *
 * The public key is stored in .env and returned to the client at runtime.
 * This prevents it from being hardcoded in client-side JavaScript bundles.
 */
export const getFlutterwavePublicKey = createServerFn({ method: "GET" }).handler(
  async () => {
    const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;

    if (!publicKey) {
      console.error("[Flutterwave] FLUTTERWAVE_PUBLIC_KEY is not set in environment variables");
      return { ok: false as const, publicKey: null, error: "Payment gateway is not configured" };
    }

    return { ok: true as const, publicKey };
  },
);

const verifyPaymentSchema = z.object({
  transactionId: z.number().positive("Invalid transaction ID"),
  txRef: z.string().min(1, "Transaction reference is required"),
  expectedAmount: z.number().positive("Amount must be positive"),
  expectedCurrency: z.string().default("NGN"),
});

/**
 * Server function: Verify a Flutterwave payment transaction.
 *
 * Uses the SECRET key (server-side only) to call the Flutterwave Verify API.
 * Validates that the transaction status, amount, and currency all match
 * before confirming the payment.
 */
export const verifyFlutterwavePayment = createServerFn({ method: "POST" })
  .validator(verifyPaymentSchema)
  .handler(async ({ data }) => {
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!secretKey) {
      console.error("[Flutterwave] FLUTTERWAVE_SECRET_KEY is not set in environment variables");
      return {
        ok: false as const,
        error: "Payment verification is not configured",
      };
    }

    try {
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${data.transactionId}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `[Flutterwave] Verify API returned ${response.status}: ${errorText}`,
        );
        return {
          ok: false as const,
          error: "Payment verification failed. Please contact support.",
        };
      }

      const result = await response.json();

      // Validate the transaction
      const txData = result.data;

      if (!txData) {
        return {
          ok: false as const,
          error: "Invalid response from payment gateway",
        };
      }

      // Check transaction status
      if (txData.status !== "successful") {
        console.warn(
          `[Flutterwave] Transaction ${data.transactionId} status: ${txData.status}`,
        );
        return {
          ok: false as const,
          error: `Payment was not successful (status: ${txData.status})`,
        };
      }

      // Verify amount matches expected amount
      if (txData.amount < data.expectedAmount) {
        console.warn(
          `[Flutterwave] Amount mismatch: expected ₦${data.expectedAmount}, got ₦${txData.amount}`,
        );
        return {
          ok: false as const,
          error: "Payment amount does not match. Please contact support.",
        };
      }

      // Verify currency matches
      if (txData.currency !== data.expectedCurrency) {
        console.warn(
          `[Flutterwave] Currency mismatch: expected ${data.expectedCurrency}, got ${txData.currency}`,
        );
        return {
          ok: false as const,
          error: "Payment currency mismatch. Please contact support.",
        };
      }

      // Verify tx_ref matches
      if (txData.tx_ref !== data.txRef) {
        console.warn(
          `[Flutterwave] tx_ref mismatch: expected ${data.txRef}, got ${txData.tx_ref}`,
        );
        return {
          ok: false as const,
          error: "Transaction reference mismatch. Please contact support.",
        };
      }

      console.log(
        `[Flutterwave] ✅ Payment verified: ${data.txRef} — ₦${txData.amount} ${txData.currency}`,
      );

      return {
        ok: true as const,
        transaction: {
          id: txData.id,
          tx_ref: txData.tx_ref,
          flw_ref: txData.flw_ref,
          amount: txData.amount,
          currency: txData.currency,
          status: txData.status,
          payment_type: txData.payment_type,
          customer_email: txData.customer?.email || "",
          customer_name: txData.customer?.name || "",
          created_at: txData.created_at,
        },
      };
    } catch (err) {
      console.error("[Flutterwave] Verification error:", err);
      return {
        ok: false as const,
        error: "Network error during payment verification. Please try again.",
      };
    }
  });
