// Import necessary utilities and types
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { relations } from "drizzle-orm";
import { pgTable, uuid, text, integer, boolean, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

// Define common columns for createdAt and updatedAt
const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

// Define the EventTable schema    
export const EventTable = pgTable("events", { 
    id: uuid("id").primaryKey().defaultRandom(), // Unique identifier for each event
    name: text("name").notNull(), // Event name as a non-nullable text
    description: text("description"),
    durationInMinutes: integer("durationInMinutes").notNull(), // Event duration, must be a non-null integer
    clerkUserId: text("clerkUserId").notNull(), // Identifier for the user associated with this event, non-nullable
    isActive: boolean("isActive").notNull().default(true),
    createdAt,
    updatedAt
}, table => ({
    clerkUserIdIndex: index("clerkUserIdIndex").on(table.clerkUserId)
}))

// Define the ScheduleTable schema
export const ScheduleTable = pgTable("schedules", {
    id: uuid("id").primaryKey().defaultRandom(), // Unique identifier for each schedule
    timezone: text("timezone").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    createdAt,
    updatedAt
})

export const ScheduleRelations = relations(ScheduleTable, ({many}) => ({
    availabilities: many(ScheduleAvailabilityTable) // Define a one-to-many relationship to ScheduleAvailabilityTable
}))

// Enumerate days of the week using previously defined constants
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER)

// Define the ScheduleAvailabilityTable schema
export const ScheduleAvailabilityTable = pgTable("schedulesAvailabilities", {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId").notNull().references(() => ScheduleTable.id, { onDelete: "cascade" }),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
})

export const ScheduleAvailabilityRelations = relations
(ScheduleAvailabilityTable, ({ one }) => ({
    schedule: one(ScheduleTable, { // Define a many-to-one relationship back to ScheduleTable
        fields: [ScheduleAvailabilityTable.scheduleId],
        references: [ScheduleTable.id]
    })
}))