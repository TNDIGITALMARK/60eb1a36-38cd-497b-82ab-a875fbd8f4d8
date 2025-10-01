"use client";

import { useState, useEffect } from "react";
import { DialerScreen } from "@/components/ghoulish/DialerScreen";
import { BiometricAuth } from "@/components/ghoulish/BiometricAuth";
import { MainMessagingInterface } from "@/components/ghoulish/MainMessagingInterface";

type AppState = "dialer" | "biometric" | "messaging" | "panic";

export default function GhoulishApp() {
  const [appState, setAppState] = useState<AppState>("dialer");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);

  // Auto-lock after 5 minutes of inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setAppState("dialer");
        setIsAuthenticated(false);
      }, 5 * 60 * 1000); // 5 minutes
    };

    if (isAuthenticated) {
      resetTimer();
      const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
      events.forEach((event) => {
        document.addEventListener(event, resetTimer, true);
      });

      return () => {
        clearTimeout(inactivityTimer);
        events.forEach((event) => {
          document.removeEventListener(event, resetTimer, true);
        });
      };
    }
  }, [isAuthenticated]);

  const handleDialerSuccess = (isPanic: boolean = false) => {
    if (isPanic) {
      setIsPanicMode(true);
      setAppState("messaging");
      setIsAuthenticated(true);
    } else {
      setAppState("biometric");
    }
  };

  const handleBiometricSuccess = () => {
    setIsAuthenticated(true);
    setAppState("messaging");
  };

  const handleLogout = () => {
    setAppState("dialer");
    setIsAuthenticated(false);
    setIsPanicMode(false);
  };

  return (
    <div className="ghoulish min-h-screen bg-background text-foreground overflow-hidden">
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-ghoulish-shadow via-background to-ghoulish-shadow opacity-50"></div>

        <div className="relative z-10 w-full max-w-md mx-4">
          {appState === "dialer" && (
            <DialerScreen onSuccess={handleDialerSuccess} />
          )}
          {appState === "biometric" && (
            <BiometricAuth onSuccess={handleBiometricSuccess} onBack={() => setAppState("dialer")} />
          )}
          {appState === "messaging" && (
            <MainMessagingInterface
              isPanicMode={isPanicMode}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}