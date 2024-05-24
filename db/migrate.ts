import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

config({
  path: ".env.local",
});

const databaseURL = drizzle(
  postgres(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`,
    {
      max: 1,
    }
  )
);

async function main() {
  try {
    await migrate(databaseURL, { migrationsFolder: "./drizzle" });

    console.log("Database Migration Complete");
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

main();
