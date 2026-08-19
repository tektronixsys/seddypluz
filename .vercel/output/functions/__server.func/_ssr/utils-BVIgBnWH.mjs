import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BVIgBnWH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(void 0);
var CART_STORAGE_KEY = "seddypluz_cart_items_v1";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isCartOpen, setIsCartOpen] = (0, import_react.useState)(false);
	const [isHydrated, setIsHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(CART_STORAGE_KEY);
			if (stored) setItems(JSON.parse(stored));
		} catch {} finally {
			setIsHydrated(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isHydrated) return;
		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, isHydrated]);
	const addItem = (newItem) => {
		const cartId = `${newItem.productId}-${newItem.variant.toLowerCase().replace(/\s+/g, "-")}`;
		setItems((prev) => {
			if (prev.find((item) => item.cartId === cartId)) return prev.map((item) => item.cartId === cartId ? {
				...item,
				quantity: item.quantity + 1
			} : item);
			return [...prev, {
				...newItem,
				cartId,
				quantity: 1
			}];
		});
		setIsCartOpen(true);
	};
	const removeItem = (cartId) => {
		setItems((prev) => prev.filter((item) => item.cartId !== cartId));
	};
	const updateQuantity = (cartId, quantity) => {
		if (quantity <= 0) {
			removeItem(cartId);
			return;
		}
		setItems((prev) => prev.map((item) => item.cartId === cartId ? {
			...item,
			quantity
		} : item));
	};
	const clearCart = () => {
		setItems([]);
	};
	const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
	const totalPriceFormatted = `₦${totalPrice.toLocaleString()}`;
	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			items,
			addItem,
			removeItem,
			updateQuantity,
			clearCart,
			totalCount,
			totalPrice,
			totalPriceFormatted,
			isCartOpen,
			setIsCartOpen,
			openCart,
			closeCart
		},
		children
	});
}
function useCart() {
	const context = (0, import_react.useContext)(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn as n, useCart as r, CartProvider as t };
