"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Ghost, Lock, AlertTriangle } from "lucide-react";

interface DialerScreenProps {
  onSuccess: (isPanic?: boolean) => void;
}

export function DialerScreen({ onSuccess }: DialerScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Secret codes
  const SECRET_CODE = "#0666#";
  const PANIC_CODES = ["#911#", "#555#"];
  const maxAttempts = 3;
  const lockDuration = 5 * 60 * 1000; // 5 minutes

  const dialpadKeys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"]
  ];

  const handleKeyPress = (key: string) => {
    if (isLocked) return;

    const newValue = inputValue + key;
    setInputValue(newValue);

    // Auto-check when we have a complete code pattern
    if (newValue.startsWith("#") && newValue.endsWith("#") && newValue.length >= 4) {
      checkCode(newValue);
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  const checkCode = (code: string) => {
    if (code === SECRET_CODE) {
      onSuccess(false);
    } else if (PANIC_CODES.includes(code)) {
      onSuccess(true);
    } else {
      // Invalid code
      setAttempts(prev => prev + 1);
      setInputValue("");

      if (attempts + 1 >= maxAttempts) {
        setIsLocked(true);
        setLockTimeRemaining(lockDuration / 1000);

        // Start countdown
        const interval = setInterval(() => {
          setLockTimeRemaining(prev => {
            if (prev <= 1) {
              setIsLocked(false);
              setAttempts(0);
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-card border-border shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Ghost className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            GHOULISH
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Secure Communication Portal
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Display */}
          <div className="relative">
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="text-2xl font-mono tracking-widest h-8">
                {isLocked ? (
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <Lock className="h-5 w-5" />
                    <span className="text-lg">{formatTime(lockTimeRemaining)}</span>
                  </div>
                ) : (
                  <span>{inputValue || "Enter Code"}</span>
                )}
              </div>
            </div>

            {attempts > 0 && !isLocked && (
              <div className="mt-2 flex items-center justify-center gap-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{attempts}/{maxAttempts} attempts</span>
              </div>
            )}
          </div>

          {/* Dialpad */}
          <div className="grid grid-cols-3 gap-3">
            {dialpadKeys.flat().map((key) => (
              <Button
                key={key}
                variant="outline"
                size="lg"
                className="h-14 text-xl font-semibold bg-secondary hover:bg-accent disabled:opacity-50"
                onClick={() => handleKeyPress(key)}
                disabled={isLocked}
              >
                {key}
              </Button>
            ))}
          </div>

          {/* Clear button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleClear}
            disabled={isLocked || !inputValue}
          >
            Clear
          </Button>

          {/* Security indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Encrypted</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-1">
              <Ghost className="h-3 w-3" />
              <span>Stealth Mode</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}