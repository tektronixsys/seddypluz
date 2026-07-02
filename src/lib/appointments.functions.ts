import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitAppointmentToFirestore } from "@/integrations/firebase/appointments";

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
