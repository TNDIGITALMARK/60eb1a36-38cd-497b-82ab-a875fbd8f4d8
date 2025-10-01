"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Eye,
  EyeOff,
  Clock,
  Smartphone,
  AlertTriangle,
  Settings,
  Lock,
  Trash2
} from "lucide-react";
import { ghoulishSecurity } from "@/lib/ghoulish/security";

interface StealthConfigProps {
  onClose: () => void;
}

export function StealthConfig({ onClose }: StealthConfigProps) {
  const [config, setConfig] = useState({
    autoDelete: true,
    autoDeleteTime: 72, // hours
    panicCodes: ["#911#", "#555#"],
    newPanicCode: "",
    stealthMode: true,
    biometricAuth: true,
    screenRecordingDetection: true,
    fakeConversations: true,
    autoLockTime: 5, // minutes
    customTheme: "ghoulish"
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Load configuration from secure storage
    const savedTheme = ghoulishSecurity.getCustomTheme();
    setConfig(prev => ({ ...prev, customTheme: savedTheme }));
  }, []);

  const handleSave = () => {
    // Save configuration to secure storage
    ghoulishSecurity.setCustomTheme(config.customTheme as any);

    // Apply theme immediately
    document.body.className = config.customTheme;

    onClose();
  };

  const addPanicCode = () => {
    if (config.newPanicCode && !config.panicCodes.includes(config.newPanicCode)) {
      setConfig(prev => ({
        ...prev,
        panicCodes: [...prev.panicCodes, prev.newPanicCode],
        newPanicCode: ""
      }));
    }
  };

  const removePanicCode = (code: string) => {
    setConfig(prev => ({
      ...prev,
      panicCodes: prev.panicCodes.filter(c => c !== code)
    }));
  };

  const handleWipeData = () => {
    if (confirm("Are you sure you want to permanently delete all data? This cannot be undone.")) {
      const storage = ghoulishSecurity.getSecureStorage();
      storage.clear();
      alert("All data has been permanently deleted.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto-delete settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Auto-delete messages
              </Label>
              <Switch
                checked={config.autoDelete}
                onCheckedChange={(checked) =>
                  setConfig(prev => ({ ...prev, autoDelete: checked }))
                }
              />
            </div>
            {config.autoDelete && (
              <div className="ml-6">
                <Label htmlFor="autoDeleteTime">Delete after (hours)</Label>
                <Input
                  id="autoDeleteTime"
                  type="number"
                  value={config.autoDeleteTime}
                  onChange={(e) =>
                    setConfig(prev => ({ ...prev, autoDeleteTime: parseInt(e.target.value) }))
                  }
                  className="w-20 mt-1"
                  min="1"
                  max="168"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Panic codes */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Panic Codes
            </Label>
            <div className="space-y-2">
              {config.panicCodes.map((code, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Badge variant="destructive">{code}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePanicCode(code)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Add new panic code (e.g., #999#)"
                  value={config.newPanicCode}
                  onChange={(e) =>
                    setConfig(prev => ({ ...prev, newPanicCode: e.target.value }))
                  }
                  onKeyPress={(e) => e.key === "Enter" && addPanicCode()}
                />
                <Button onClick={addPanicCode} size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Stealth features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Stealth mode
              </Label>
              <Switch
                checked={config.stealthMode}
                onCheckedChange={(checked) =>
                  setConfig(prev => ({ ...prev, stealthMode: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Biometric authentication
              </Label>
              <Switch
                checked={config.biometricAuth}
                onCheckedChange={(checked) =>
                  setConfig(prev => ({ ...prev, biometricAuth: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Screen recording detection
              </Label>
              <Switch
                checked={config.screenRecordingDetection}
                onCheckedChange={(checked) =>
                  setConfig(prev => ({ ...prev, screenRecordingDetection: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Advanced Settings
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>

        {showAdvanced && (
          <CardContent className="space-y-6">
            {/* Auto-lock timer */}
            <div className="space-y-2">
              <Label htmlFor="autoLockTime">Auto-lock after (minutes)</Label>
              <Input
                id="autoLockTime"
                type="number"
                value={config.autoLockTime}
                onChange={(e) =>
                  setConfig(prev => ({ ...prev, autoLockTime: parseInt(e.target.value) }))
                }
                className="w-20"
                min="1"
                max="60"
              />
            </div>

            {/* Theme selection */}
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex gap-2">
                {["ghoulish", "dark", "darker"].map((theme) => (
                  <Button
                    key={theme}
                    variant={config.customTheme === theme ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConfig(prev => ({ ...prev, customTheme: theme }))}
                    className="capitalize"
                  >
                    {theme}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Danger zone */}
            <div className="space-y-3">
              <Label className="text-destructive font-semibold">Danger Zone</Label>
              <div className="p-4 border border-destructive rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete all messages, contacts, and configuration.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleWipeData}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Wipe All Data
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          Save Settings
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}