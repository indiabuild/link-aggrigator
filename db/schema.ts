import {
  pgEnum,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgEnum("categories", ["manufacturing", "research"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    firstName: varchar("frist_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }).notNull(),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex("email_index").on(users.email),
    };
  }
);

export type UserType = typeof users.$inferInsert;
