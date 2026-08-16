import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cachedApp: App | null = null;
let cachedDb: Firestore | null = null;

export function getFirebaseAdminApp(): App | null {
  if (cachedApp) return cachedApp;
  if (getApps().length > 0) {
    cachedApp = getApps()[0];
    return cachedApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  let rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (
    rawPrivateKey &&
    ((rawPrivateKey.startsWith('"') && rawPrivateKey.endsWith('"')) ||
      (rawPrivateKey.startsWith("'") && rawPrivateKey.endsWith("'")))
  ) {
    rawPrivateKey = rawPrivateKey.slice(1, -1);
  }
  const privateKey = rawPrivateKey?.replace(/\\n/g, "\n");

  const hasValidKey =
    privateKey &&
    privateKey.includes("BEGIN PRIVATE KEY") &&
    !privateKey.includes("YOUR_KEY") &&
    projectId &&
    !projectId.includes("your-firebase-project-id") &&
    clientEmail &&
    !clientEmail.includes("firebase-adminsdk-xxxxx");

  if (hasValidKey) {
    try {
      cachedApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
      return cachedApp;
    } catch (err) {
      console.warn("Firebase Admin cert initialization warning:", err);
    }
  }

  try {
    cachedApp = initializeApp();
    return cachedApp;
  } catch {
    return null;
  }
}

export function getAdminDb(): Firestore | null {
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
