CREATE TABLE IF NOT EXISTS "links" (
	"id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"host" varchar(325) NOT NULL,
	"votes" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "frist_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
