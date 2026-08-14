import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./admin";

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
  const db = getAdminDb();
  if (db) {
    try {
      const docRef = await db.collection("appointment_requests").add({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        appointment_date: data.appointmentDate,
        preferred_time: data.preferredTime,
        notes: data.notes || null,
        status: "pending",
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn("Firestore submit failed, falling back to local store:", err);
    }
  }

  // Fallback to in-memory store
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
  const db = getAdminDb();
  if (db) {
    try {
      const querySnapshot = await db
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
          created_at: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : null,
          updated_at: updatedAt instanceof Timestamp ? updatedAt.toDate().toISOString() : null,
        });
      });

      return results;
    } catch (err) {
      console.warn("Firestore fetch failed, returning in-memory store:", err);
    }
  }

  return [...mockAppointmentsStore];
}

export async function updateAppointmentRequestInFirestore(
  id: string,
  status: string,
  notes: string | null,
): Promise<void> {
  const db = getAdminDb();
  if (db) {
    try {
      await db
        .collection("appointment_requests")
        .doc(id)
        .update({
          status,
          notes: notes || null,
          updated_at: FieldValue.serverTimestamp(),
        });
      return;
    } catch (err) {
      console.warn("Firestore update failed, updating in-memory store:", err);
    }
  }

  // Update in-memory fallback store
  const target = mockAppointmentsStore.find((a) => a.id === id);
  if (target) {
    target.status = status as AppointmentRequest["status"];
    target.notes = notes || null;
    target.updated_at = new Date().toISOString();
  }
}
