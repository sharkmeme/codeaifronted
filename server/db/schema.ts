import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  socials: text("socials"),
  projectType: text("project_type").notNull(),
  description: text("description").notNull(),
  extraInfo: text("extra_info"),
  createdAt: timestamp("created_at").defaultNow(),
});
