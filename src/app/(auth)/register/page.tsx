"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordError("Password tidak cocok!");
    } else {
      setPasswordError(null);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTermsError(null);

    if (passwordError) {
      setStatusMessage({
        type: "error",
        text: passwordError,
      });
      return;
    }

    if (!acceptTerms) {
      setTermsError("Anda harus menyetujui syarat dan ketentuan.");
      setStatusMessage({
        type: "error",
        text: "Harap setujui syarat dan ketentuan untuk melanjutkan.",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({
      type: "info",
      text: "Sedang mendaftarkan akun Anda...",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirm: formData.confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const msg =
          result?.data?.message ||
          result?.message ||
          "Akun berhasil dibuat! Silakan verifikasi email Anda.";
        toast.success(msg);
        setStatusMessage({
          type: "success",
          text: "Akun berhasil dibuat! Silakan verifikasi email Anda.",
        });
        router.push(
          `/verify-email?status=pending&email=${encodeURIComponent(
            formData.email
          )}`
        );
      } else {
        const msg =
          result.message || "Gagal mendaftar. Silakan coba lagi.";
        toast.error(msg);
        setStatusMessage({ type: "error", text: msg });
      }
    } catch (error) {
      console.error("Error registering:", error);
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
    <div className="flex flex-col min-h-screen bg-cv-bg-primary">
      <Header />

      <main className="flex-grow flex items-center justify-center">
        <div className="container-narrow w-full">
          <div
            className="max-w-md mx-auto"
          >
            <Card className="glass-card py-5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-cv-text-primary">
                  Daftar Akun Baru
                </CardTitle>
                <CardDescription className="text-cv-text-secondary">
                  Mulai analisis CV Anda secara gratis
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
                    <Label htmlFor="name" className="text-cv-text-primary">
                      Nama Lengkap
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cv-text-primary">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-cv-text-primary">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                        required
                        minLength={8}
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
                      Konfirmasi Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password"
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
                    {passwordError && (
                      <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => {
                        setAcceptTerms(checked === true);
                        if (checked) {
                          setTermsError(null);
                        }
                      }}
                      className="border-cv-text-secondary/30 mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm text-cv-text-secondary"
                      >
                        Saya setuju dengan{" "}
                        <Link
                          href="/privacy"
                          className="text-cv-accent hover:underline"
                        >
                          syarat dan ketentuan
                        </Link>
                      </Label>
                      {termsError && (
                        <p className="text-sm text-red-500">{termsError}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary"
                    disabled={isLoading || passwordError !== null}
                  >
                    {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-cv-text-secondary">
                    Sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="text-cv-accent hover:underline font-medium"
                    >
                      Masuk di sini
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
