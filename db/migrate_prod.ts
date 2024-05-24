import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getConnString } from "./conn";

config({
  path: ".env.prod",
});

const databaseURL = drizzle(
  postgres(getConnString(), {
    ssl: true,
    max: 1,
  })
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
