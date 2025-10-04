import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    // Return null instead of a fake object
    return null;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
