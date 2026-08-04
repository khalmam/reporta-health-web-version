import { useCallback } from "react";
import { useRouter } from "next/router";

import { useUserCredentialsStore } from "@store/authStore.store";

/**
 * Returns a guard that runs `action` only when the user is logged in.
 * Anonymous users are sent to the login page and brought back to the
 * page they came from once they are authenticated.
 */
export default function useRequireAuth() {
  const router = useRouter();

  return useCallback(
    (action) => {
      const { isAuthenticated } = useUserCredentialsStore.getState();

      if (!isAuthenticated) {
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
        return false;
      }

      !!action && action();
      return true;
    },
    [router]
  );
}
