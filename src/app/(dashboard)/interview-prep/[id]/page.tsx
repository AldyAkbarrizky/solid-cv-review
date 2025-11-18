"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InterviewPrepContent from "./interview-prep-content";

function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary items-center justify-center">
      <p className="text-cv-text-secondary">Loading...</p>
    </div>
  );
}

export default function InterviewPrepPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cv-bg-primary">
      <Header />
      <Suspense fallback={<Loading />}>
        <InterviewPrepContent />
      </Suspense>
      <Footer />
    </div>
  );
}