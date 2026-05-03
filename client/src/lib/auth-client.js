import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://prepnova.onrender.com",
});

// Export commonly used hooks and methods
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  forgetPassword,
  resetPassword,
} = authClient;
