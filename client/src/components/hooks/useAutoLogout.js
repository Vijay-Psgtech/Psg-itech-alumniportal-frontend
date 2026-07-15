import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Auto-logs the user out after `timeoutMs` of inactivity.
// Default: 15 minutes. Pass a custom value if needed: useAutoLogout(30 * 60 * 1000)
export default function useAutoLogout(timeoutMs = 15 * 60 * 1000) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
      navigate("/admin/login", { replace: true });
    }, timeoutMs);
  }, [logout, navigate, timeoutMs]);

  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    resetTimer();
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer, { passive: true }),
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer),
      );
    };
  }, [resetTimer]);
}