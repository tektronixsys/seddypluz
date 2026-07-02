import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

interface AppointmentData {
  name: string;
  email: string;
  phone?: string | null;
  service: string;
  appointmentDate: string;
  preferredTime: string;
  notes?: string | null;
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
