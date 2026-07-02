import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  submitAppointmentToFirestore,
  getAppointmentRequestsFromFirestore,
  updateAppointmentRequestInFirestore,
} from "@/integrations/firebase/appointments";

const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  notes: z.string().max(1000, "Note is too long").optional().or(z.literal("")),
});

export const submitAppointment = createServerFn({ method: "POST" })
  .validator(appointmentSchema)
  .handler(async ({ data }) => {
    try {
      await submitAppointmentToFirestore(data);
      return { ok: true };
    } catch (error) {
      console.error("Appointment submission failed:", error);
      throw new Error("Unable to submit your request. Please try again shortly.");
    }
  });

export const getAppointments = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const appointments = await getAppointmentRequestsFromFirestore();
      return appointments;
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      throw new Error("Unable to fetch appointment requests.");
    }
  });

const updateSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "declined", "completed"]),
  notes: z.string().max(1000).nullable(),
});

export const updateAppointmentStatus = createServerFn({ method: "POST" })
  .validator(updateSchema)
  .handler(async ({ data }) => {
    try {
      await updateAppointmentRequestInFirestore(data.id, data.status, data.notes);
      return { ok: true };
    } catch (error) {
      console.error("Failed to update appointment:", error);
      throw new Error("Unable to update appointment request.");
    }
  });
