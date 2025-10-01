"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fingerprint, Scan, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface BiometricAuthProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function BiometricAuth({ onSuccess, onBack }: BiometricAuthProps) {
  const [authState, setAuthState] = useState<"waiting" | "scanning" | "success" | "error">("waiting");
  const [progress, setProgress] = useState(0);

  const simulateBiometricScan = () => {
    setAuthState("scanning");
    setProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // 90% success rate for demo purposes
          if (Math.random() > 0.1) {
            setAuthState("success");
            setTimeout(() => {
              onSuccess();
            }, 1000);
          } else {
            setAuthState("error");
            setTimeout(() => {
              setAuthState("waiting");
              setProgress(0);
            }, 2000);
          }
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 50);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-card border-border shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center relative overflow-hidden">
            {authState === "scanning" && (
              <div
                className="absolute inset-0 bg-primary-foreground opacity-30 transition-transform duration-100"
                style={{
                  transform: `translateY(${100 - progress}%)`,
                  transformOrigin: 'bottom'
                }}
              />
            )}
            {authState === "success" ? (
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            ) : (
              <Fingerprint className="h-10 w-10 text-primary-foreground" />
            )}
          </div>

          <CardTitle className="text-xl font-bold">
            Biometric Authentication
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {authState === "waiting" && "Touch the sensor to authenticate"}
            {authState === "scanning" && "Scanning biometric data..."}
            {authState === "success" && "Authentication successful"}
            {authState === "error" && "Authentication failed, try again"}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Biometric scanning area */}
          <div className="relative">
            <div className={`
              w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center
              transition-all duration-300 cursor-pointer
              ${authState === "waiting" ? "border-muted-foreground hover:border-primary" : ""}
              ${authState === "scanning" ? "border-primary animate-pulse" : ""}
              ${authState === "success" ? "border-green-500" : ""}
              ${authState === "error" ? "border-destructive" : ""}
            `}
            onClick={authState === "waiting" || authState === "error" ? simulateBiometricScan : undefined}
            >
              {authState === "scanning" && (
                <div className="absolute inset-0 rounded-full">
                  <Scan className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-ping" />
                </div>
              )}

              {authState === "success" && (
                <CheckCircle className="h-12 w-12 text-green-500" />
              )}

              {authState === "error" && (
                <AlertCircle className="h-12 w-12 text-destructive" />
              )}

              {authState === "waiting" && (
                <Fingerprint className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            {/* Progress indicator */}
            {authState === "scanning" && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {Math.round(progress)}%
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Place your finger on the sensor above</p>
            <p className="text-xs">This adds an extra layer of security</p>
          </div>

          {/* Alternative methods (future expansion) */}
          <div className="border-t border-border pt-4">
            <p className="text-xs text-center text-muted-foreground">
              Alternative authentication methods coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}