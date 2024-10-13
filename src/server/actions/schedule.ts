"use server";

import { db } from "@/drizzle/db";
import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema";
import { scheduleFormSchema } from "@/schema/schedule";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { BatchItem } from "drizzle-orm/batch";
import { z } from "zod";

export async function saveSchedule(
  unsafeData: z.infer<typeof scheduleFormSchema>
) {
  try {
    // Authenticate user and check if they are logged in
    const { userId } = auth();
    if (!userId) {
      console.error("User is not authenticated.");
      return { error: true, message: "User not authenticated" };
    }

    // Validate incoming data using Zod schema
    const { success, data } = scheduleFormSchema.safeParse(unsafeData);
    if (!success) {
      console.error("Invalid schedule data:", data);
      return { error: true, message: "Invalid schedule data" };
    }

    const { availabilities, ...scheduleData } = data;

    const [{ id: scheduleId }] = await db
      .insert(ScheduleTable)
      .values({ ...scheduleData, clerkUserId: userId })
      .onConflictDoUpdate({
        target: ScheduleTable.clerkUserId,
        set: scheduleData,
      })
      .returning({ id: ScheduleTable.id });

    const statements: [BatchItem<"pg">] = [
      db
        .delete(ScheduleAvailabilityTable)
        .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId)),
    ];

    if (availabilities.length > 0) {
      statements.push(
        db.insert(ScheduleAvailabilityTable).values(
          availabilities.map((availability) => ({
            ...availability,
            scheduleId,
          }))
        )
      );
    }

    await db.batch(statements);

    console.log("Schedule saved successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error saving schedule:", error);
    return { error: true, message: "Internal server error" };
  }
}
