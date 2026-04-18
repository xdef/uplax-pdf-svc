import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Add other server-only variables here
    BROWSER_ENDPOINT: z.url(),
    REPORTS_ENDPOINT: z.url(),
  },
  client: {},
  runtimeEnv: {
    BROWSER_ENDPOINT: process.env.BROWSER_ENDPOINT,
    REPORTS_ENDPOINT: process.env.REPORTS_ENDPOINT,
  },
  emptyStringAsUndefined: true,
});
