"use client";

import EmailVerificationGuard from "@/components/auth/email-verification-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmailVerificationGuard>{children}</EmailVerificationGuard>;
}
