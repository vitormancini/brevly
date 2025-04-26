CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"shorLink" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_shorLink_unique" UNIQUE("shorLink")
);
