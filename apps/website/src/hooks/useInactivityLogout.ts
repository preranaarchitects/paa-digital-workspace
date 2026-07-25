import { useEffect, useRef } from "react";
import { supabase } from "../services/authService";

/**
 * Monitors user interaction and triggers a secure logout sequence
 * after a specified duration of total inactivity.
 */
export function useInactivityLogout(timeoutMinutes: number = 15): void {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const durationMs = timeoutMinutes * 60 * 1000;

  useEffect(() => {
    const triggerSessionTermination = async () => {
      try {
        // 1. Terminate the active authorization tokens globally
        await supabase.auth.signOut();
      } catch (err) {
        console.error("Session logout error:", err);
      } finally {
        // 2. Clear out application space and boot to main portal entry
        window.location.href = "https://preranaarchitects.com/login?session=expired";
      }
    };

    const refreshActivityTimer = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(triggerSessionTermination, durationMs);
    };

    // Actions that qualify as organic user movement
    const userActions = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    // Bind event listeners to tracking layer
    userActions.forEach((action) => {
      window.addEventListener(action, refreshActivityTimer);
    });

    // Start the tracking countdown clock cycle immediately on mount
    refreshActivityTimer();

    // Clean up tracking configurations when the view scope is exited
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      userActions.forEach((action) => {
        window.removeEventListener(action, refreshActivityTimer);
      });
    };
  }, [durationMs]); // Enforces safety if timeoutMinutes ever changes dynamically
}