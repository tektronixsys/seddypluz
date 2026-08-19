import { a as toResponse, i as getSession, n as clearSession, o as updateSession, r as getRequestIP, t as H3Event } from "../_libs/h3-v2.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region node_modules/.nitro/vite/services/ssr/assets/request-response-DvjwmdV2.js
var GLOBAL_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage");
var globalObj = globalThis;
if (!globalObj[GLOBAL_EVENT_STORAGE_KEY]) globalObj[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
	return typeof value.then === "function";
}
function getSetCookieValues(headers) {
	const headersWithSetCookie = headers;
	if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
	const value = headers.get("set-cookie");
	return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
	if (response.ok) return;
	const eventSetCookies = getSetCookieValues(event.res.headers);
	if (eventSetCookies.length === 0) return;
	const responseSetCookies = getSetCookieValues(response.headers);
	response.headers.delete("set-cookie");
	for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
	for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
	if (isPromiseLike(value)) return value.then((resolved) => {
		if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
		return resolved;
	});
	if (value instanceof Response) mergeEventResponseHeaders(value, event);
	return value;
}
function requestHandler(handler) {
	return (request, requestOpts) => {
		let h3Event;
		try {
			h3Event = new H3Event(request);
		} catch (error) {
			if (error instanceof URIError) return new Response(null, {
				status: 400,
				statusText: "Bad Request"
			});
			throw error;
		}
		return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
function getRequestIP$1(opts) {
	return getRequestIP(getH3Event(), opts);
}
function getDefaultSessionConfig(config) {
	return {
		name: "start",
		...config
	};
}
/**
* Get the session for the current request
*/
function getSession$1(config) {
	return getSession(getH3Event(), getDefaultSessionConfig(config));
}
/**
* Update the session data for the current request.
*/
function updateSession$1(config, update) {
	return updateSession(getH3Event(), getDefaultSessionConfig(config), update);
}
/**
* Clear the session data for the current request.
*/
function clearSession$1(config) {
	return clearSession(getH3Event(), {
		name: "start",
		...config
	});
}
function getResponse() {
	return getH3Event().res;
}
//#endregion
export { requestHandler as a, getSession$1 as i, getRequestIP$1 as n, updateSession$1 as o, getResponse as r, clearSession$1 as t };
