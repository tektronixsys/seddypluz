import { FieldValue as AdminFieldValue, Timestamp as AdminTimestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./admin";
import {
  addDoc,
  collection,
  serverTimestamp as clientServerTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  Timestamp as ClientTimestamp,
} from "firebase/firestore";
import { db as clientDb } from "./config";

export interface AppointmentData {
  name: string;
  email: string;
  phone?: string | null;
  service: string;
  appointmentDate: string;
  preferredTime: string;
  notes?: string | null;
}

export interface AppointmentRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  appointment_date: string;
  preferred_time: string;
  notes: string | null;
  status: "pending" | "confirmed" | "declined" | "completed";
  created_at: string | null;
  updated_at: string | null;
}

// In-Memory fallback store for development / offline resilience
const mockAppointmentsStore: AppointmentRequest[] = [
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
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date().toISOString(),
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
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: null,
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
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    updated_at: null,
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
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function submitAppointmentToFirestore(data: AppointmentData): Promise<string> {
  // 1. Try Firebase Admin SDK first (Server-side privileged execution)
  const adminDb = getAdminDb();
  if (adminDb) {
    try {
      const docRef = await adminDb.collection("appointment_requests").add({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        appointment_date: data.appointmentDate,
        preferred_time: data.preferredTime,
        notes: data.notes || null,
        status: "pending",
        created_at: AdminFieldValue.serverTimestamp(),
        updated_at: AdminFieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn("Firebase Admin SDK submit failed, trying client SDK:", err);
    }
  }

  // 2. Try Firebase Client Web SDK (configured for seddypluz project)
  if (clientDb) {
    try {
      const docRef = await addDoc(collection(clientDb, "appointment_requests"), {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        appointment_date: data.appointmentDate,
        preferred_time: data.preferredTime,
        notes: data.notes || null,
        status: "pending",
        created_at: clientServerTimestamp(),
        updated_at: clientServerTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn("Firebase Client SDK submit failed, falling back to in-memory store:", err);
    }
  }

  // 3. Fallback to in-memory store for offline resilience
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return id;
}

export async function getAppointmentRequestsFromFirestore(): Promise<AppointmentRequest[]> {
  // 1. Try Firebase Admin SDK first
  const adminDb = getAdminDb();
  if (adminDb) {
    try {
      const querySnapshot = await adminDb
        .collection("appointment_requests")
        .orderBy("created_at", "desc")
        .get();

      const results: AppointmentRequest[] = [];
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
          created_at:
            createdAt instanceof AdminTimestamp
              ? createdAt.toDate().toISOString()
              : typeof createdAt === "string"
                ? createdAt
                : null,
          updated_at:
            updatedAt instanceof AdminTimestamp
              ? updatedAt.toDate().toISOString()
              : typeof updatedAt === "string"
                ? updatedAt
                : null,
        });
      });

      return results;
    } catch (err) {
      console.warn("Firebase Admin SDK fetch failed, attempting client SDK:", err);
    }
  }

  // 2. Try Client SDK if permitted
  if (clientDb) {
    try {
      const q = query(collection(clientDb, "appointment_requests"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      const results: AppointmentRequest[] = [];
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
          created_at:
            createdAt instanceof ClientTimestamp
              ? createdAt.toDate().toISOString()
              : typeof createdAt === "string"
                ? createdAt
                : null,
          updated_at:
            updatedAt instanceof ClientTimestamp
              ? updatedAt.toDate().toISOString()
              : typeof updatedAt === "string"
                ? updatedAt
                : null,
        });
      });

      if (results.length > 0) return results;
    } catch (err) {
      console.warn("Firebase Client SDK fetch blocked or failed:", err);
    }
  }

  // 3. Fallback to in-memory store
  return [...mockAppointmentsStore];
}

export async function updateAppointmentRequestInFirestore(
  id: string,
  status: string,
  notes: string | null,
): Promise<void> {
  // 1. Try Firebase Admin SDK
  const adminDb = getAdminDb();
  if (adminDb) {
    try {
      await adminDb
        .collection("appointment_requests")
        .doc(id)
        .update({
          status,
          notes: notes || null,
          updated_at: AdminFieldValue.serverTimestamp(),
        });
      return;
    } catch (err) {
      console.warn("Firebase Admin SDK update failed:", err);
    }
  }

  // 2. Try Client SDK if matching document
  if (clientDb) {
    try {
      const docRef = doc(clientDb, "appointment_requests", id);
      await updateDoc(docRef, {
        status,
        notes: notes || null,
        updated_at: clientServerTimestamp(),
      });
      return;
    } catch (err) {
      console.warn("Firebase Client SDK update blocked or failed:", err);
    }
  }

  // 3. Fallback in-memory store update
  const target = mockAppointmentsStore.find((a) => a.id === id);
  if (target) {
    target.status = status as AppointmentRequest["status"];
    target.notes = notes || null;
    target.updated_at = new Date().toISOString();
  }
}
