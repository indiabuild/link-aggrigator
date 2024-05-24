import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { getConnString } from "./conn";

const client = postgres(getConnString(), {
  max: 1,
});

const db = drizzle(client, { schema });

export default db;
