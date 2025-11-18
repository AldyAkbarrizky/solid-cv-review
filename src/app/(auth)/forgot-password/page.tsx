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
import Header from "@/components/layout/Header";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email wajib diisi.");
      setStatusMessage({
        type: "error",
        text: "Harap isi email Anda terlebih dahulu.",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({
      type: "info",
      text: "Sedang mengirim instruksi reset password...",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsEmailSent(true);
        const msg =
          result?.data?.message || "Email reset password telah dikirim!";
        toast.success(msg);
        setStatusMessage({ type: "success", text: msg });
      } else {
        const msg =
          result?.message || "Gagal mengirim email reset password.";
        toast.error(msg);
        setStatusMessage({ type: "error", text: msg });
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
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

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-cv-bg-primary">
        <Header />

        <div className="container mx-auto px-4 py-20">
          <div
            className="max-w-md mx-auto"
          >
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                {statusMessage && (
                  <div
                    className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
                      statusMessage.type === "error"
                        ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                        : "border-cv-success/40 bg-cv-success/10 text-cv-success"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}
                <div className="w-16 h-16 bg-cv-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-cv-success" />
                </div>

                <h2 className="text-2xl font-bold text-cv-text-primary mb-4">
                  Email Terkirim!
                </h2>

                <p className="text-cv-text-secondary mb-6">
                  Kami telah mengirim link reset password ke email{" "}
                  <strong>{email}</strong>. Silakan cek inbox atau folder spam
                  Anda.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => setIsEmailSent(false)}
                    variant="outline"
                    className="w-full btn-secondary"
                  >
                    Kirim Ulang Email
                  </Button>

                  <Link href="/login">
                    <Button className="w-full btn-primary">
                      Kembali ke Login
                    </Button>
                  </Link>
                </div>

                <p className="text-cv-text-secondary text-sm mt-6">
                  Tidak menerima email? Cek folder spam atau hubungi support
                  kami.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary">
      <Header />

      <div className="flex-grow flex items-center justify-center mx-auto px-4 py-20">
        <div
          className="max-w-md mx-auto"
        >
          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-cv-text-primary">
                Lupa Password?
              </CardTitle>
              <CardDescription className="text-cv-text-secondary">
                Masukkan email Anda dan kami akan mengirim link untuk reset
                password
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
                  <Label htmlFor="email" className="text-cv-text-primary">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Mengirim..." : "Kirim Link Reset"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-cv-accent hover:underline font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-cv-text-secondary text-sm">
                  Belum punya akun?{" "}
                  <Link
                    href="/register"
                    className="text-cv-accent hover:underline font-medium"
                  >
                    Daftar gratis
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
