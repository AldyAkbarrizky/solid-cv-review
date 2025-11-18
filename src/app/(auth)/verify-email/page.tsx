"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, MailCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

type ViewState = "pending" | "processing" | "success" | "error";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoading />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailLoading() {
  return (
    <div className="min-h-screen bg-cv-bg-primary flex flex-col">
      <Header />
      <main className="flex-1 container-centered flex items-center justify-center py-12 text-cv-text-secondary">
        Memuat halaman verifikasi...
      </main>
      <Footer />
    </div>
  );
}

function VerifyEmailContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const statusParam = params.get("status");
  const email = params.get("email");
  const [status, setStatus] = useState<ViewState>(
    token ? "processing" : "pending"
  );
  const [message, setMessage] = useState<string>("");
  const [resendEmail, setResendEmail] = useState(email ?? "");
  const [isResending, setIsResending] = useState(false);
  const { refreshSession } = useAuth();

  useEffect(() => {
    if (token) {
      const verify = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );
          const result = await response.json();
          if (response.ok) {
            setStatus("success");
            setMessage(
              result?.data?.message ||
                result?.message ||
                "Email berhasil diverifikasi!"
            );
          } else {
            setStatus("error");
            setMessage(result?.message || "Token tidak valid atau kadaluarsa.");
          }
        } catch (error) {
          console.error("Failed to verify email:", error);
          setStatus("error");
          setMessage("Terjadi kesalahan saat verifikasi. Coba lagi nanti.");
        }
      };
      verify();
    } else if (statusParam === "pending") {
      setStatus("pending");
      setMessage(
        "Kami telah mengirimkan email verifikasi. Silakan cek inbox Anda."
      );
    }
  }, [token, statusParam]);

  useEffect(() => {
    if (status === "success") {
      refreshSession?.();
    }
  }, [status, refreshSession]);

  const renderIcon = () => {
    if (status === "success")
      return <CheckCircle className="w-10 h-10 text-cv-success" />;
    if (status === "error")
      return <XCircle className="w-10 h-10 text-cv-error" />;
    return <MailCheck className="w-10 h-10 text-cv-accent" />;
  };

  const primaryAction = () => {
    if (status === "success") {
      router.push("/login");
    } else if (status === "pending") {
      router.refresh();
    } else {
      router.push("/verify-email?status=pending");
    }
  };

  const handleResend = async () => {
    if (!resendEmail) {
      setMessage(
        "Masukkan email yang terdaftar untuk mengirim ulang verifikasi."
      );
      return;
    }
    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: resendEmail }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage(
          result?.data?.message ||
            result?.message ||
            "Email verifikasi telah dikirim ulang."
        );
        setStatus("pending");
      } else {
        setStatus("error");
        setMessage(result?.message || "Gagal mengirim ulang email.");
      }
    } catch (error) {
      console.error("Failed to resend verification:", error);
      setStatus("error");
      setMessage("Terjadi kesalahan saat mengirim ulang email.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary flex flex-col">
      <Header />
      <main className="flex-1 container-centered flex items-center justify-center py-12">
        <div className="glass-card max-w-xl w-full p-8 text-center space-y-6">
          <div className="flex justify-center">{renderIcon()}</div>
          <div>
            <h1 className="text-2xl font-semibold text-cv-text-primary mb-2">
              {status === "success"
                ? "Email Terverifikasi"
                : status === "error"
                ? "Verifikasi Gagal"
                : "Verifikasi Email"}
            </h1>
            <p className="text-cv-text-secondary">
              {message ||
                "Periksa email Anda dan klik tautan verifikasi untuk melanjutkan."}
            </p>
            {email && status === "pending" && (
              <p className="text-sm text-cv-text-secondary mt-2">
                Email terkirim ke <span className="font-semibold">{email}</span>
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Button className="btn-primary w-full" onClick={primaryAction}>
              {status === "success"
                ? "Masuk Sekarang"
                : status === "error"
                ? "Kembali ke Halaman Verifikasi"
                : "Saya Sudah Verifikasi"}
            </Button>
            {status !== "success" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                Kembali ke Login
              </Button>
            )}
            {status !== "success" && (
              <div className="space-y-2 text-left">
                <p className="text-sm text-cv-text-secondary">
                  Belum menerima email? Masukkan email Anda dan kirim ulang.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="email@contoh.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleResend}
                    disabled={isResending}
                  >
                    {isResending ? "Mengirim..." : "Kirim Ulang"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
