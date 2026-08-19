import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as stringType, i as objectType, n as literalType, t as enumType } from "../_libs/zod.mjs";
import { i as getSession$1, n as getRequestIP$1, o as updateSession$1, t as clearSession$1 } from "./request-response-DvjwmdV2.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as Timestamp, i as FieldValue, n as getApps, o as getFirestore, r as initializeApp, t as cert } from "../_libs/firebase-admin+[...].mjs";
import { a as updateDoc, c as doc, i as query, l as getFirestore$1, n as getDocs, o as Timestamp$1, r as orderBy, s as collection, t as addDoc, u as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import { c as initializeApp$1, n as isSupported, t as getAnalytics } from "../_libs/@firebase/analytics+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/appointments.functions-Bvf0t-00.js
var cachedApp = null;
var cachedDb = null;
function getFirebaseAdminApp() {
	if (cachedApp) return cachedApp;
	if (getApps().length > 0) {
		cachedApp = getApps()[0];
		return cachedApp;
	}
	const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
	let rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
	if (rawPrivateKey && (rawPrivateKey.startsWith("\"") && rawPrivateKey.endsWith("\"") || rawPrivateKey.startsWith("'") && rawPrivateKey.endsWith("'"))) rawPrivateKey = rawPrivateKey.slice(1, -1);
	const privateKey = rawPrivateKey?.replace(/\\n/g, "\n");
	if (privateKey && privateKey.includes("BEGIN PRIVATE KEY") && !privateKey.includes("YOUR_KEY") && projectId && !projectId.includes("your-firebase-project-id") && clientEmail && !clientEmail.includes("firebase-adminsdk-xxxxx")) try {
		cachedApp = initializeApp({
			credential: cert({
				projectId,
				clientEmail,
				privateKey
			}),
			projectId
		});
		return cachedApp;
	} catch (err) {
		console.warn("Firebase Admin cert initialization warning:", err);
	}
	try {
		cachedApp = initializeApp();
		return cachedApp;
	} catch {
		return null;
	}
}
function getAdminDb() {
	if (cachedDb) return cachedDb;
	const app = getFirebaseAdminApp();
	if (!app) return null;
	try {
		cachedDb = getFirestore(app);
		return cachedDb;
	} catch (err) {
		console.warn("Firestore Admin instance warning:", err);
		return null;
	}
}
var app = initializeApp$1({
	apiKey: "AIzaSyCjCI7Z_KB4WLtEAIqZQ700dif1g3d3rS0",
	authDomain: "seddypluz.firebaseapp.com",
	projectId: "seddypluz",
	storageBucket: "seddypluz.firebasestorage.app",
	messagingSenderId: "717844264438",
	appId: "1:717844264438:web:06f8b001bc78b4e7c283d7",
	measurementId: "G-LLGXNNQ41R"
});
var db = getFirestore$1(app);
typeof window !== "undefined" && isSupported().then((yes) => yes ? getAnalytics(app) : null);
var mockAppointmentsStore = [
	{
		id: "apt_001",
		name: "Zainab Al-Hassan",
		email: "zainab.alhassan@gmail.com",
		phone: "+2348162292997",
		service: "Bridal Makeup",
		appointment_date: "2026-08-22",
		preferred_time: "10:00 AM",
		notes: "Traditional white wedding & regal reception look. Requested 18H HD Base.",
		status: "confirmed",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5 * 24)).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "apt_002",
		name: "Fatima Balarabe",
		email: "fatima.balarabe@yahoo.com",
		phone: "+2348031234567",
		service: "Gele Styling",
		appointment_date: "2026-08-25",
		preferred_time: "02:00 PM",
		notes: "Avant-Garde Infinity Pleated Gele for sister's coronation ceremony.",
		status: "pending",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5 * 12)).toISOString(),
		updated_at: null
	},
	{
		id: "apt_003",
		name: "Amina Yusuf",
		email: "amina.yusuf@outlook.com",
		phone: "+2348149876543",
		service: "Professional Glam",
		appointment_date: "2026-08-28",
		preferred_time: "11:30 AM",
		notes: "Camera-calibrated portrait glam for 30th birthday editorial photoshoot.",
		status: "pending",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5 * 6)).toISOString(),
		updated_at: null
	},
	{
		id: "apt_004",
		name: "Halima Abubakar",
		email: "halima.abubakar@gmail.com",
		phone: "+2348098765432",
		service: "Beauty Masterclasses",
		appointment_date: "2026-09-02",
		preferred_time: "09:00 AM",
		notes: "1-on-1 intensive 3-day bridal artistry and HD skin-prep masterclass.",
		status: "confirmed",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5 * 48)).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
async function submitAppointmentToFirestore(data) {
	const adminDb = getAdminDb();
	if (adminDb) try {
		return (await adminDb.collection("appointment_requests").add({
			name: data.name,
			email: data.email,
			phone: data.phone || null,
			service: data.service,
			appointment_date: data.appointmentDate,
			preferred_time: data.preferredTime,
			notes: data.notes || null,
			status: "pending",
			created_at: FieldValue.serverTimestamp(),
			updated_at: FieldValue.serverTimestamp()
		})).id;
	} catch (err) {
		console.warn("Firebase Admin SDK submit failed, trying client SDK:", err);
	}
	if (db) try {
		return (await addDoc(collection(db, "appointment_requests"), {
			name: data.name,
			email: data.email,
			phone: data.phone || null,
			service: data.service,
			appointment_date: data.appointmentDate,
			preferred_time: data.preferredTime,
			notes: data.notes || null,
			status: "pending",
			created_at: serverTimestamp(),
			updated_at: serverTimestamp()
		})).id;
	} catch (err) {
		console.warn("Firebase Client SDK submit failed, falling back to in-memory store:", err);
	}
	const id = `apt_${Date.now()}`;
	mockAppointmentsStore.unshift({
		id,
		name: data.name,
		email: data.email,
		phone: data.phone || null,
		service: data.service,
		appointment_date: data.appointmentDate,
		preferred_time: data.preferredTime,
		notes: data.notes || null,
		status: "pending",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return id;
}
async function getAppointmentRequestsFromFirestore() {
	const adminDb = getAdminDb();
	if (adminDb) try {
		const querySnapshot = await adminDb.collection("appointment_requests").orderBy("created_at", "desc").get();
		const results = [];
		querySnapshot.forEach((docSnapshot) => {
			const data = docSnapshot.data();
			const createdAt = data.created_at;
			const updatedAt = data.updated_at;
			results.push({
				id: docSnapshot.id,
				name: data.name || "",
				email: data.email || "",
				phone: data.phone || null,
				service: data.service || "",
				appointment_date: data.appointment_date || "",
				preferred_time: data.preferred_time || "",
				notes: data.notes || null,
				status: data.status || "pending",
				created_at: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : typeof createdAt === "string" ? createdAt : null,
				updated_at: updatedAt instanceof Timestamp ? updatedAt.toDate().toISOString() : typeof updatedAt === "string" ? updatedAt : null
			});
		});
		return results;
	} catch (err) {
		console.warn("Firebase Admin SDK fetch failed, attempting client SDK:", err);
	}
	if (db) try {
		const querySnapshot = await getDocs(query(collection(db, "appointment_requests"), orderBy("created_at", "desc")));
		const results = [];
		querySnapshot.forEach((docSnap) => {
			const data = docSnap.data();
			const createdAt = data.created_at;
			const updatedAt = data.updated_at;
			results.push({
				id: docSnap.id,
				name: data.name || "",
				email: data.email || "",
				phone: data.phone || null,
				service: data.service || "",
				appointment_date: data.appointment_date || "",
				preferred_time: data.preferred_time || "",
				notes: data.notes || null,
				status: data.status || "pending",
				created_at: createdAt instanceof Timestamp$1 ? createdAt.toDate().toISOString() : typeof createdAt === "string" ? createdAt : null,
				updated_at: updatedAt instanceof Timestamp$1 ? updatedAt.toDate().toISOString() : typeof updatedAt === "string" ? updatedAt : null
			});
		});
		if (results.length > 0) return results;
	} catch (err) {
		console.warn("Firebase Client SDK fetch blocked or failed:", err);
	}
	return [...mockAppointmentsStore];
}
async function updateAppointmentRequestInFirestore(id, status, notes) {
	const adminDb = getAdminDb();
	if (adminDb) try {
		await adminDb.collection("appointment_requests").doc(id).update({
			status,
			notes: notes || null,
			updated_at: FieldValue.serverTimestamp()
		});
		return;
	} catch (err) {
		console.warn("Firebase Admin SDK update failed:", err);
	}
	if (db) try {
		await updateDoc(doc(db, "appointment_requests", id), {
			status,
			notes: notes || null,
			updated_at: serverTimestamp()
		});
		return;
	} catch (err) {
		console.warn("Firebase Client SDK update blocked or failed:", err);
	}
	const target = mockAppointmentsStore.find((a) => a.id === id);
	if (target) {
		target.status = status;
		target.notes = notes || null;
		target.updated_at = (/* @__PURE__ */ new Date()).toISOString();
	}
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
var submitAppointment_createServerFn_handler = createServerRpc({
	id: "ce7677abd6caebd06ebdbb21d32341d5caf0816b2ab131eee4838b60850d5f48",
	name: "submitAppointment",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => submitAppointment.__executeServer(opts));
var submitAppointment = createServerFn({ method: "POST" }).validator(appointmentSchema).handler(submitAppointment_createServerFn_handler, async ({ data }) => {
	try {
		await submitAppointmentToFirestore(data);
		return { ok: true };
	} catch (error) {
		console.error("Appointment submission failed:", error);
		throw new Error("Unable to submit your request. Please try again shortly.");
	}
});
function getAdminSessionConfig() {
	const maxAgeSeconds = 3600 * 8;
	return {
		name: "seddypluz_admin_session",
		password: process.env.ADMIN_SESSION_SECRET || "3f8c1a7e9b2d4f6a0c5e8d1b7a9f3c6d2e4a8f1b5c7d9e0a3f6b2c8d1e4a7f9",
		maxAge: maxAgeSeconds,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			secure: true,
			maxAge: maxAgeSeconds
		}
	};
}
var loginAttemptsByIp = /* @__PURE__ */ new Map();
var LOGIN_WINDOW_MS = 900 * 1e3;
var MAX_LOGIN_ATTEMPTS = 5;
var LOCKOUT_MS = 1800 * 1e3;
var MAX_TRACKED_IPS = 2e3;
function getClientIpKey() {
	return getRequestIP$1({ xForwardedFor: true }) ?? "unknown";
}
function pruneRateLimitStore(now) {
	if (loginAttemptsByIp.size <= MAX_TRACKED_IPS) return;
	for (const [key, state] of loginAttemptsByIp) if (now - state.lastSeenAt > LOCKOUT_MS) loginAttemptsByIp.delete(key);
}
function checkRateLimit(ipKey, now) {
	const state = loginAttemptsByIp.get(ipKey);
	if (!state) return {
		blocked: false,
		retryAfterSeconds: 0
	};
	if (state.lockUntil > now) return {
		blocked: true,
		retryAfterSeconds: Math.max(1, Math.ceil((state.lockUntil - now) / 1e3))
	};
	if (now - state.windowStartedAt > LOGIN_WINDOW_MS) {
		loginAttemptsByIp.delete(ipKey);
		return {
			blocked: false,
			retryAfterSeconds: 0
		};
	}
	return {
		blocked: false,
		retryAfterSeconds: 0
	};
}
function recordFailedAttempt(ipKey, now) {
	const current = loginAttemptsByIp.get(ipKey);
	if (!current || now - current.windowStartedAt > LOGIN_WINDOW_MS) {
		loginAttemptsByIp.set(ipKey, {
			attempts: 1,
			windowStartedAt: now,
			lockUntil: 0,
			lastSeenAt: now
		});
		return;
	}
	const nextAttempts = current.attempts + 1;
	const lockUntil = nextAttempts >= MAX_LOGIN_ATTEMPTS ? now + LOCKOUT_MS : 0;
	loginAttemptsByIp.set(ipKey, {
		attempts: nextAttempts,
		windowStartedAt: current.windowStartedAt,
		lockUntil,
		lastSeenAt: now
	});
}
function resetAttempts(ipKey) {
	loginAttemptsByIp.delete(ipKey);
}
async function requireAdminSession() {
	if ((await getSession$1(getAdminSessionConfig())).data.isAdmin !== true) throw new Error("Unauthorized");
}
var SUPER_ADMIN_PROFILES = {
	ajuhlouis: {
		name: "Ajuh Louis",
		role: "Super Admin",
		password: "aju080ABC&"
	},
	seddypluz: {
		name: "Seddypluz",
		role: "Studio Super Admin",
		password: "seddypluz@2026#"
	}
};
var adminLoginSchema = objectType({
	username: stringType().trim().min(1, "Username is required"),
	password: stringType().min(1, "Password is required")
});
var adminLogin_createServerFn_handler = createServerRpc({
	id: "a46a6776bde8bb49b90118fa489625828da4fe7f38cd3d7c4a6e07c544db30ed",
	name: "adminLogin",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => adminLogin.__executeServer(opts));
var adminLogin = createServerFn({ method: "POST" }).validator(adminLoginSchema).handler(adminLogin_createServerFn_handler, async ({ data }) => {
	const now = Date.now();
	const ipKey = getClientIpKey();
	pruneRateLimitStore(now);
	const rateLimit = checkRateLimit(ipKey, now);
	if (rateLimit.blocked) throw new Error(`Too many login attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`);
	const inputUserKey = data.username.toLowerCase().trim();
	const profile = SUPER_ADMIN_PROFILES[inputUserKey];
	const fallbackUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
	const fallbackPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSCODE || "spz-admin-2026-VD9qL7mR3xP2Kf8N";
	let isValid = false;
	let resolvedDisplayName = data.username;
	let resolvedRole = "Super Admin";
	if (profile && data.password === profile.password) {
		isValid = true;
		resolvedDisplayName = profile.name;
		resolvedRole = profile.role;
	} else if ((inputUserKey === fallbackUsername || inputUserKey === "admin") && data.password === fallbackPassword) {
		isValid = true;
		resolvedDisplayName = "Admin";
		resolvedRole = "Administrator";
	}
	if (!isValid) {
		recordFailedAttempt(ipKey, now);
		throw new Error("Unauthorized: Invalid username or password.");
	}
	resetAttempts(ipKey);
	await updateSession$1(getAdminSessionConfig(), {
		isAdmin: true,
		username: resolvedDisplayName,
		role: resolvedRole,
		authenticatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	return {
		ok: true,
		username: resolvedDisplayName,
		role: resolvedRole
	};
});
var adminLogout_createServerFn_handler = createServerRpc({
	id: "81899034c88e4092891618dd6738a1e3559657fba76c666f392f912c81348b09",
	name: "adminLogout",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => adminLogout.__executeServer(opts));
var adminLogout = createServerFn({ method: "POST" }).handler(adminLogout_createServerFn_handler, async () => {
	await clearSession$1(getAdminSessionConfig());
	return { ok: true };
});
var getAdminAuthStatus_createServerFn_handler = createServerRpc({
	id: "2f003a68e48c399b4980a42bc31609538a9daaac45e25bb14ca930eff3e56c4e",
	name: "getAdminAuthStatus",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => getAdminAuthStatus.__executeServer(opts));
var getAdminAuthStatus = createServerFn({ method: "GET" }).handler(getAdminAuthStatus_createServerFn_handler, async () => {
	const session = await getSession$1(getAdminSessionConfig());
	return {
		authenticated: session.data.isAdmin === true,
		user: session.data.username || (session.data.isAdmin ? "Admin" : void 0),
		role: session.data.role || (session.data.isAdmin ? "Super Admin" : void 0)
	};
});
var getAppointments_createServerFn_handler = createServerRpc({
	id: "73989417b0a1406e4108381bd7a15b8389e5116d3ef59a509bcb9bdd49ff7c8e",
	name: "getAppointments",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => getAppointments.__executeServer(opts));
var getAppointments = createServerFn({ method: "GET" }).handler(getAppointments_createServerFn_handler, async () => {
	await requireAdminSession();
	try {
		return await getAppointmentRequestsFromFirestore();
	} catch (error) {
		console.error("Failed to fetch appointments:", error);
		throw new Error("Unable to fetch appointment requests.");
	}
});
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
var updateAppointmentStatus_createServerFn_handler = createServerRpc({
	id: "a5fca539933c77d8ff0f1a8f653747728eb2d6e01ed04c706950ffbbab72f5af",
	name: "updateAppointmentStatus",
	filename: "src/lib/appointments.functions.ts"
}, (opts) => updateAppointmentStatus.__executeServer(opts));
var updateAppointmentStatus = createServerFn({ method: "POST" }).validator(updateSchema).handler(updateAppointmentStatus_createServerFn_handler, async ({ data }) => {
	await requireAdminSession();
	try {
		await updateAppointmentRequestInFirestore(data.id, data.status, data.notes ?? null);
		return { ok: true };
	} catch (error) {
		console.error("Failed to update appointment:", error);
		throw new Error("Unable to update appointment request.");
	}
});
//#endregion
export { adminLogin_createServerFn_handler, adminLogout_createServerFn_handler, getAdminAuthStatus_createServerFn_handler, getAppointments_createServerFn_handler, submitAppointment_createServerFn_handler, updateAppointmentStatus_createServerFn_handler };
