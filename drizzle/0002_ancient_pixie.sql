ALTER TABLE "links" DROP CONSTRAINT "links_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "links" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
