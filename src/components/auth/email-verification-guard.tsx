"use client";

import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { MailWarning } from "lucide-react";

export default function EmailVerificationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isCheckingAuth, refreshSession } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cv-bg-primary text-cv-text-secondary">
        Memuat...
      </div>
    );
  }

  if (!user || user.emailVerified) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cv-bg-primary flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center glass-card p-8 space-y-4">
        <div className="flex justify-center text-cv-warning">
          <MailWarning className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-cv-text-primary">
          Verifikasi Email Diperlukan
        </h1>
        <p className="text-cv-text-secondary">
          Silakan verifikasi email Anda terlebih dahulu sebelum mengakses fitur
          ini. Kami telah mengirimkan tautan verifikasi ke email Anda.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/verify-email?status=pending" className="btn-primary">
            Buka Halaman Verifikasi
          </Link>
          <button
            type="button"
            onClick={() => refreshSession()}
            className="text-sm text-cv-text-secondary hover:text-cv-text-primary underline"
          >
            Sudah verifikasi? Perbarui status
          </button>
          <Link
            href="/settings"
            className="text-cv-accent hover:underline text-sm"
          >
            Butuh bantuan? Buka halaman pengaturan
          </Link>
        </div>
      </div>
    </div>
  );
}
