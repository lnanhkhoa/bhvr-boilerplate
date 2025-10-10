import { createAuthClient } from "better-auth/react";
// import type { InferSessionFromClient } from "better-auth/client";
import { jwtClient } from "better-auth/client/plugins";

import { API_BASE_URL } from "@/configs/env";
const authAPI = `${API_BASE_URL}/api/auth`;

export const authClient = createAuthClient({
  baseURL: authAPI,
  // Better Auth uses cookies by default - no need for manual token management
  plugins: [jwtClient()],
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("authToken") || "", // get the token from localStorage
    },
  },
});

// export type Session = InferSessionFromClient<typeof authClient>;
