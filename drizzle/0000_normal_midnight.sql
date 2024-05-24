DO $$ BEGIN
 CREATE TYPE "public"."categories" AS ENUM('manufacturing', 'research');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"frist_name" varchar(256),
	"last_name" varchar(256),
	"email" varchar(256),
	"image" varchar(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_index" ON "users" ("email");