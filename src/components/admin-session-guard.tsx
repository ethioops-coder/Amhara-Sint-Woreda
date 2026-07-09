"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, LogOut } from "lucide-react";

const IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const WARNING_BEFORE_MS = 60 * 1000;     // Show warning 1 min before expiry
const HEARTBEAT_MS = 60 * 1000;          // Ping server every 1 minute while active

export default function AdminSessionGuard() {
  const router = useRouter();
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const heartbeat = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(async () => {
    try {
      await fetch("/admin/api/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/admin/api/auth", { method: "PUT" });
      const data = await res.json();
      if (!data.valid) {
        logout();
      }
    } catch {}
  }, [logout]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setShowWarning(false);

    // Show warning 1 minute before logout
    idleTimer.current = setTimeout(() => {
      setShowWarning(true);
      setSecondsLeft(60);
      let s = 60;
      countdownRef.current = setInterval(() => {
        s -= 1;
        setSecondsLeft(s);
        if (s <= 0) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          logout();
        }
      }, 1000);
    }, IDLE_TIMEOUT_MS - WARNING_BEFORE_MS);
  }, [logout]);

  useEffect(() => {
    // Listen for user activity
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    const onActivity = () => resetIdleTimer();
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));

    // Start idle timer immediately
    resetIdleTimer();

    // Heartbeat — refresh session cookie while user is active
    heartbeat.current = setInterval(refreshSession, HEARTBEAT_MS);

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (heartbeat.current) clearInterval(heartbeat.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [resetIdleTimer, refreshSession]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Clock className="w-8 h-8 text-amber-600" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Session Expiring</h2>
        <p className="text-gray-500 text-sm mb-4">
          You will be logged out due to inactivity in
        </p>

        {/* Countdown */}
        <div className="text-5xl font-black text-amber-600 mb-2 tabular-nums">
          {secondsLeft}
        </div>
        <p className="text-gray-400 text-xs mb-6">seconds</p>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-1000"
            style={{ width: `${(secondsLeft / 60) * 100}%` }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={logout}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout Now
          </button>
          <button
            onClick={dismissWarning}
            className="flex-1 px-4 py-2.5 bg-[#0B3D2E] hover:bg-[#145A44] text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
}
