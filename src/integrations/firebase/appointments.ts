import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./admin";

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

export async function submitAppointmentToFirestore(data: AppointmentData) {
  const docRef = await adminDb.collection("appointment_requests").add({
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
}

export async function getAppointmentRequestsFromFirestore(): Promise<AppointmentRequest[]> {
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
      created_at: createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : null,
      updated_at: updatedAt instanceof Timestamp ? updatedAt.toDate().toISOString() : null,
    });
  });

  return results;
}

export async function updateAppointmentRequestInFirestore(
  id: string,
  status: string,
  notes: string | null,
) {
  await adminDb
    .collection("appointment_requests")
    .doc(id)
    .update({
      status,
      notes: notes || null,
      updated_at: FieldValue.serverTimestamp(),
    });
}
