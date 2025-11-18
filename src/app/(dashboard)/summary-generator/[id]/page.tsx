"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SummaryGeneratorContent from "./summary-generator-content";

function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary items-center justify-center">
      <p className="text-cv-text-secondary">Loading...</p>
    </div>
  );
}

export default function SummaryGeneratorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary">
      <Header />
      <Suspense fallback={<Loading />}>
        <SummaryGeneratorContent />
      </Suspense>
      <Footer />
    </div>
  );
}