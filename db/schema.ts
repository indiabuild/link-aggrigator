import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
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
    lastName: varchar("last_name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).notNull(),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex("email_index").on(users.email),
    };
  }
);

export const links = pgTable("links", {
  id: uuid("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  host: varchar("host", { length: 325 }).notNull(),
  userID: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  views: integer("views").default(1).notNull(),
  votes: integer("votes").default(1).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).notNull(),
});

export type UserType = typeof users.$inferInsert;
export type UserTypeSelect = typeof users.$inferInsert;
export type LinkType = typeof links.$inferInsert;
export type LinkTypeSelect = typeof links.$inferSelect;
