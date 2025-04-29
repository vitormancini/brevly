import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$default(() => uuidv7()),
  link: text("link").notNull(),
  shortLink: text("shorLink").notNull().unique(),
  accessCount: integer("access_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
