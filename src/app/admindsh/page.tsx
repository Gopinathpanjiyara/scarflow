"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [step, setStep] = useState<"mobile" | "password">("mobile");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState("");

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/verify-mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify mobile number');
      }

      setAdminName(data.name);
      setStep("password");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify mobile number");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ mobile, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect using form submission for more reliable navigation
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = '/admindsh/dashboard';
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : "Failed to login");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            {step === "password" && adminName && (
              <p className="text-gray-600 mt-2">Welcome back, {adminName}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {step === "mobile" ? (
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  className="text-lg tracking-wider"
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-lg"
                  disabled={loading}
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (!loading) {
                      setStep("mobile");
                      setPassword("");
                      setError("");
                    }
                  }}
                  disabled={loading}
                >
                  Back to Mobile Number
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
} 