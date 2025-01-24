import {
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerkUserId").notNull().unique(),
});

export const ActivityTable = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  date: timestamp("date").notNull(),
  time: time("time").notNull(),
  description: text("description"),
  userId: text("userId")
    .references(() => UserTable.clerkUserId)
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const usersRelations = relations(UserTable, ({ many }) => ({
  todos: many(ActivityTable),
}));

export const todosRelations = relations(ActivityTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ActivityTable.userId],
    references: [UserTable.clerkUserId],
  }),
}));
