import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as stringType, i as objectType, r as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment.functions-BzWaXkCi.js
/**
* Server function: Get the Flutterwave public key.
*
* The public key is stored in .env and returned to the client at runtime.
* This prevents it from being hardcoded in client-side JavaScript bundles.
*/
var getFlutterwavePublicKey_createServerFn_handler = createServerRpc({
	id: "032e544c4c9f913b4b3eac810729ab5a0ce05755ad1899ca9a4e9e559a5ad275",
	name: "getFlutterwavePublicKey",
	filename: "src/lib/payment.functions.ts"
}, (opts) => getFlutterwavePublicKey.__executeServer(opts));
var getFlutterwavePublicKey = createServerFn({ method: "GET" }).handler(getFlutterwavePublicKey_createServerFn_handler, async () => {
	const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
	if (!publicKey) {
		console.error("[Flutterwave] FLUTTERWAVE_PUBLIC_KEY is not set in environment variables");
		return {
			ok: false,
			publicKey: null,
			error: "Payment gateway is not configured"
		};
	}
	return {
		ok: true,
		publicKey
	};
});
var verifyPaymentSchema = objectType({
	transactionId: numberType().positive("Invalid transaction ID"),
	txRef: stringType().min(1, "Transaction reference is required"),
	expectedAmount: numberType().positive("Amount must be positive"),
	expectedCurrency: stringType().default("NGN")
});
/**
* Server function: Verify a Flutterwave payment transaction.
*
* Uses the SECRET key (server-side only) to call the Flutterwave Verify API.
* Validates that the transaction status, amount, and currency all match
* before confirming the payment.
*/
var verifyFlutterwavePayment_createServerFn_handler = createServerRpc({
	id: "4935a90486418bbce42518105a158fdb0bb6274a0fa79ec27262285214a9a14f",
	name: "verifyFlutterwavePayment",
	filename: "src/lib/payment.functions.ts"
}, (opts) => verifyFlutterwavePayment.__executeServer(opts));
var verifyFlutterwavePayment = createServerFn({ method: "POST" }).validator(verifyPaymentSchema).handler(verifyFlutterwavePayment_createServerFn_handler, async ({ data }) => {
	const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
	if (!secretKey) {
		console.error("[Flutterwave] FLUTTERWAVE_SECRET_KEY is not set in environment variables");
		return {
			ok: false,
			error: "Payment verification is not configured"
		};
	}
	try {
		const response = await fetch(`https://api.flutterwave.com/v3/transactions/${data.transactionId}/verify`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${secretKey}`,
				"Content-Type": "application/json"
			}
		});
		if (!response.ok) {
			const errorText = await response.text();
			console.error(`[Flutterwave] Verify API returned ${response.status}: ${errorText}`);
			return {
				ok: false,
				error: "Payment verification failed. Please contact support."
			};
		}
		const txData = (await response.json()).data;
		if (!txData) return {
			ok: false,
			error: "Invalid response from payment gateway"
		};
		if (txData.status !== "successful") {
			console.warn(`[Flutterwave] Transaction ${data.transactionId} status: ${txData.status}`);
			return {
				ok: false,
				error: `Payment was not successful (status: ${txData.status})`
			};
		}
		if (txData.amount < data.expectedAmount) {
			console.warn(`[Flutterwave] Amount mismatch: expected ₦${data.expectedAmount}, got ₦${txData.amount}`);
			return {
				ok: false,
				error: "Payment amount does not match. Please contact support."
			};
		}
		if (txData.currency !== data.expectedCurrency) {
			console.warn(`[Flutterwave] Currency mismatch: expected ${data.expectedCurrency}, got ${txData.currency}`);
			return {
				ok: false,
				error: "Payment currency mismatch. Please contact support."
			};
		}
		if (txData.tx_ref !== data.txRef) {
			console.warn(`[Flutterwave] tx_ref mismatch: expected ${data.txRef}, got ${txData.tx_ref}`);
			return {
				ok: false,
				error: "Transaction reference mismatch. Please contact support."
			};
		}
		console.log(`[Flutterwave] ✅ Payment verified: ${data.txRef} — ₦${txData.amount} ${txData.currency}`);
		return {
			ok: true,
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
				created_at: txData.created_at
			}
		};
	} catch (err) {
		console.error("[Flutterwave] Verification error:", err);
		return {
			ok: false,
			error: "Network error during payment verification. Please try again."
		};
	}
});
//#endregion
export { getFlutterwavePublicKey_createServerFn_handler, verifyFlutterwavePayment_createServerFn_handler };
