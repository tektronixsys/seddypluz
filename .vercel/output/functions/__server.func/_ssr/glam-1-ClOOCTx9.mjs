import { o as __toESM } from "../_runtime.mjs";
import { E as isRedirect, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CI6xlSqI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as stringType, i as objectType, n as literalType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glam-1-ClOOCTx9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var appointmentSchema = objectType({
	name: stringType().trim().min(2, "Name is required").max(120, "Name is too long"),
	email: stringType().trim().email("Invalid email address").max(255, "Email is too long"),
	phone: stringType().trim().max(30, "Phone number is too long").optional().or(literalType("")),
	service: stringType().min(1, "Please select a service"),
	appointmentDate: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
	preferredTime: stringType().min(1, "Please select a preferred time"),
	notes: stringType().max(1e3, "Note is too long").optional().or(literalType(""))
});
var submitAppointment = createServerFn({ method: "POST" }).validator(appointmentSchema).handler(createSsrRpc("ce7677abd6caebd06ebdbb21d32341d5caf0816b2ab131eee4838b60850d5f48"));
var adminLoginSchema = objectType({
	username: stringType().trim().min(1, "Username is required"),
	password: stringType().min(1, "Password is required")
});
var adminLogin = createServerFn({ method: "POST" }).validator(adminLoginSchema).handler(createSsrRpc("a46a6776bde8bb49b90118fa489625828da4fe7f38cd3d7c4a6e07c544db30ed"));
var adminLogout = createServerFn({ method: "POST" }).handler(createSsrRpc("81899034c88e4092891618dd6738a1e3559657fba76c666f392f912c81348b09"));
var getAdminAuthStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("2f003a68e48c399b4980a42bc31609538a9daaac45e25bb14ca930eff3e56c4e"));
var getAppointments = createServerFn({ method: "GET" }).handler(createSsrRpc("73989417b0a1406e4108381bd7a15b8389e5116d3ef59a509bcb9bdd49ff7c8e"));
var updateSchema = objectType({
	id: stringType(),
	status: enumType([
		"pending",
		"confirmed",
		"declined",
		"completed"
	]),
	notes: stringType().max(1e3).nullable().optional()
});
var updateAppointmentStatus = createServerFn({ method: "POST" }).validator(updateSchema).handler(createSsrRpc("a5fca539933c77d8ff0f1a8f653747728eb2d6e01ed04c706950ffbbab72f5af"));
var hero_bride_default = "/assets/hero-bride-b-nqMjTU.jpg";
var gele_1_default = "/assets/gele-1-D4CKlVMd.jpg";
var bridal_after_default = "/assets/bridal_after-YORINwyN.png";
var glam_1_default = "/assets/glam-1-BUXQjcv6.jpg";
//#endregion
export { getAdminAuthStatus as a, hero_bride_default as c, useServerFn as d, gele_1_default as i, submitAppointment as l, adminLogout as n, getAppointments as o, bridal_after_default as r, glam_1_default as s, adminLogin as t, updateAppointmentStatus as u };
