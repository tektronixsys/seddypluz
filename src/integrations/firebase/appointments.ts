import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

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
  const docRef = await addDoc(collection(db, "appointment_requests"), {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    service: data.service,
    appointment_date: data.appointmentDate,
    preferred_time: data.preferredTime,
    notes: data.notes || null,
    status: "pending",
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });

  return docRef.id;
}

export async function getAppointmentRequestsFromFirestore(): Promise<AppointmentRequest[]> {
  const q = query(collection(db, "appointment_requests"), orderBy("created_at", "desc"));
  const querySnapshot = await getDocs(q);
  const results: AppointmentRequest[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
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
      created_at: data.created_at ? (typeof data.created_at.toDate === "function" ? data.created_at.toDate().toISOString() : data.created_at) : null,
      updated_at: data.updated_at ? (typeof data.updated_at.toDate === "function" ? data.updated_at.toDate().toISOString() : data.updated_at) : null,
    });
  });
  return results;
}

export async function updateAppointmentRequestInFirestore(id: string, status: string, notes: string | null) {
  const docRef = doc(db, "appointment_requests", id);
  await updateDoc(docRef, {
    status,
    notes: notes || null,
    updated_at: serverTimestamp(),
  });
}
