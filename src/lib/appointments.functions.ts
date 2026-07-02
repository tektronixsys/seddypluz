import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

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
    const { error } = await supabase.from("appointment_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      appointment_date: data.appointmentDate,
      preferred_time: data.preferredTime,
      notes: data.notes || null,
    });

    if (error) {
      console.error("Appointment submission failed:", error);
      throw new Error("Unable to submit your request. Please try again shortly.");
    }

    return { ok: true };
  });
