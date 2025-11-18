"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      const msg = "Password baru dan konfirmasi tidak cocok.";
      toast.error(msg);
      setStatusMessage({ type: "error", text: msg });
      return;
    }
    if (formData.newPassword.length < 8) {
      const msg = "Password minimal 8 karakter.";
      toast.error(msg);
      setStatusMessage({ type: "error", text: msg });
      return;
    }
    setIsLoading(true);
    setStatusMessage({
      type: "info",
      text: "Sedang menyimpan password baru Anda...",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.newPassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const msg =
          result.message || "Password berhasil direset! Silakan masuk.";
        toast.success(msg);
        setStatusMessage({ type: "success", text: msg });
        router.push("/login");
      } else {
        const msg =
          result.message || "Gagal mereset password. Silakan coba lagi.";
        toast.error(msg);
        setStatusMessage({ type: "error", text: msg });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const msg = "Terjadi kesalahan. Silakan coba lagi.";
      toast.error(msg);
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
      setStatusMessage((current) =>
        current?.type === "info" ? null : current
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-narrow w-full">
      <div className="mx-auto max-w-md">
        <Card className="glass-card py-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-cv-text-primary">
              Reset Password Anda
            </CardTitle>
            <CardDescription className="text-cv-text-secondary">
              Masukkan password baru Anda di bawah ini
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {statusMessage && (
                <div
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    statusMessage.type === "error"
                      ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                      : statusMessage.type === "success"
                      ? "border-cv-success/40 bg-cv-success/10 text-cv-success"
                      : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-cv-text-primary">
                  Password Baru
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-cv-text-primary"
                >
                  Konfirmasi Password Baru
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi password baru"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Mereset..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
