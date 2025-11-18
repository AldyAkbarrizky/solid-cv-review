"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "./login-form";

function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary items-center justify-center">
      <p className="text-cv-text-secondary">Loading...</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cv-bg-primary">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
