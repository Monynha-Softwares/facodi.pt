import "dotenv/config";
import { clientEnv, serverEnv } from "@/lib/env";

function run() {
  console.info("Client env validated:", Object.keys(clientEnv));
  console.info("Server env validated:", Object.keys(serverEnv));
}

run();
