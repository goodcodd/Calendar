import { z } from "zod"

export const eventFormSchema = z.object({
    name: z.string().min(1, "Required"), // Require at least one character for the event name
    description: z.string().optional(), // Optional string for the event description
    isActive: z.boolean().default(true), // Boolean to indicate if the event is active, default is true
    durationInMinutes: z.coerce
        .number()
        .int()
        .positive("Duration must be greater than zero") // The duration must be a positive number
        .max(60 * 12, `Duration must be less than 12 hours (${60*12} minutes)`),
})