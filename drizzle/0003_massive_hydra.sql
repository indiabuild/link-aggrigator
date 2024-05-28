ALTER TABLE "links" ALTER COLUMN "views" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "votes" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "user_name" text DEFAULT '' NOT NULL;