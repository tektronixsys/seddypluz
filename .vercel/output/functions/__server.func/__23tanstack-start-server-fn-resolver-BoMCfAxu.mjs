//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BoMCfAxu.js
var manifest = {
	"032e544c4c9f913b4b3eac810729ab5a0ce05755ad1899ca9a4e9e559a5ad275": {
		functionName: "getFlutterwavePublicKey_createServerFn_handler",
		importer: () => import("./_ssr/payment.functions-BzWaXkCi.mjs")
	},
	"2f003a68e48c399b4980a42bc31609538a9daaac45e25bb14ca930eff3e56c4e": {
		functionName: "getAdminAuthStatus_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	},
	"4935a90486418bbce42518105a158fdb0bb6274a0fa79ec27262285214a9a14f": {
		functionName: "verifyFlutterwavePayment_createServerFn_handler",
		importer: () => import("./_ssr/payment.functions-BzWaXkCi.mjs")
	},
	"73989417b0a1406e4108381bd7a15b8389e5116d3ef59a509bcb9bdd49ff7c8e": {
		functionName: "getAppointments_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	},
	"81899034c88e4092891618dd6738a1e3559657fba76c666f392f912c81348b09": {
		functionName: "adminLogout_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	},
	"a46a6776bde8bb49b90118fa489625828da4fe7f38cd3d7c4a6e07c544db30ed": {
		functionName: "adminLogin_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	},
	"a5fca539933c77d8ff0f1a8f653747728eb2d6e01ed04c706950ffbbab72f5af": {
		functionName: "updateAppointmentStatus_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	},
	"ce7677abd6caebd06ebdbb21d32341d5caf0816b2ab131eee4838b60850d5f48": {
		functionName: "submitAppointment_createServerFn_handler",
		importer: () => import("./_ssr/appointments.functions-Bvf0t-00.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
