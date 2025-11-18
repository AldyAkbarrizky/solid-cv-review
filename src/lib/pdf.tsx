"use client";

import React from "react";
import type {
  AnalysisPdfPayload,
  AnalysisSectionDetail,
} from "@/pdf/analysis-report";

type AnalysisReportModule = typeof import("@/pdf/analysis-report");

export type { AnalysisPdfPayload, AnalysisSectionDetail };

export const downloadAnalysisPdf = async (
  payload: AnalysisPdfPayload,
  filename?: string
) => {
  const { pdf } = await import("@react-pdf/renderer");
  const { default: AnalysisReport } =
    (await import("@/pdf/analysis-report")) as AnalysisReportModule;
  const blob = await pdf(<AnalysisReport data={payload} />).toBlob();
  const safeFileName =
    filename ||
    `Hasil_Analisis_${payload.jobTitle.replace(/[\\/:*?"<>|]/g, "_")}.pdf`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = safeFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};
