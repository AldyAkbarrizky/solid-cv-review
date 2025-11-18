"use client";

import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar,
  Building,
  Target,
  Mail,
  Users,
  Sparkles,
  Award,
  Zap,
  Eye,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { downloadAnalysisPdf } from "@/lib/pdf";
import type { AnalysisSectionDetail } from "@/lib/pdf";

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 80) return "text-cv-success";
  if (score >= 60) return "text-cv-warning";
  return "text-cv-error";
};

const getPrimaryScoreColor = (score: number) => {
  if (score <= 50) return "text-cv-error";
  if (score <= 80) return "text-cv-warning";
  return "text-cv-success";
};

const getPrimaryScoreGradient = (score: number) => {
  if (score <= 50) return "from-cv-error to-cv-error/70";
  if (score <= 80) return "from-cv-warning to-cv-accent";
  return "from-cv-success to-emerald-400";
};

const getScoreBadge = (score: number) => {
  if (score >= 90)
    return {
      text: "Outstanding Match",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
  if (score >= 80)
    return {
      text: "Excellent Match",
      color: "bg-cv-success/10 text-cv-success border-cv-success/20",
    };
  if (score >= 60)
    return {
      text: "Good Match",
      color: "bg-cv-warning/10 text-cv-warning border-cv-warning/20",
    };
  return {
    text: "Needs Improvement",
    color: "bg-cv-error/10 text-cv-error border-cv-error/20",
  };
};

const getSectionLabel = (section: string) => {
  switch (section) {
    case "format":
      return "Format & Layout";
    case "content":
      return "Konten & Relevansi";
    case "keywords":
      return "Keywords";
    case "experience":
      return "Pengalaman";
    default:
      return section;
  }
};

export default function AnalysisDetailContent() {
  const params = useParams();
  const pathname = usePathname();
  const analysisId = params.id;
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const hasInitializedCycle = useRef(false);

  useEffect(() => {
    if (hasInitializedCycle.current) {
      setAnimationCycle((prev) => prev + 1);
    } else {
      hasInitializedCycle.current = true;
    }
  }, [pathname]);

  // Mock data untuk hasil analisis detail
  const analysisResult = {
    id: analysisId,
    jobTitle: "Senior Frontend Developer",
    company: "Tech Startup Indonesia",
    date: "2025-01-15",
    cvFileName: "CV_John_Doe_Frontend.pdf",
    score: 92,
    status: "excellent",
    jobDescription:
      "Kami mencari Senior Frontend Developer yang berpengalaman dengan React, TypeScript, dan modern web technologies. Kandidat ideal memiliki pengalaman 5+ tahun dalam pengembangan aplikasi web skala besar...",
    strengths: [
      "Pengalaman 6 tahun dengan React dan TypeScript sangat sesuai dengan requirement",
      "Portfolio project yang menunjukkan kemampuan teknis yang kuat",
      "Sertifikasi AWS dan Google Cloud menambah nilai plus",
      "Pengalaman memimpin tim development di startup sebelumnya",
      "Kontribusi open source menunjukkan passion dalam teknologi",
    ],
    weaknesses: [
      "Kurang menampilkan pengalaman dengan testing frameworks",
      "Tidak ada mention tentang pengalaman dengan CI/CD pipeline",
      "Soft skills leadership bisa lebih ditonjolkan",
    ],
    suggestions: [
      "Tambahkan section tentang pengalaman dengan Jest, Cypress, atau testing tools lainnya",
      "Sertakan pengalaman setup CI/CD pipeline menggunakan GitHub Actions atau Jenkins",
      "Perkuat bagian leadership dengan contoh konkret project yang dipimpin",
      "Tambahkan metrics atau KPI dari project-project sebelumnya",
      "Sertakan link ke portfolio online atau GitHub profile",
    ],
    keywordAnalysis: {
      found: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Git",
        "Agile",
        "Scrum",
      ],
      missing: ["Testing", "CI/CD", "Docker", "Kubernetes", "GraphQL"],
    },
    sections: {
      format: {
        score: 95,
        feedback: "Format CV sangat profesional dan mudah dibaca",
      },
      content: {
        score: 88,
        feedback: "Konten relevan dengan posisi yang dilamar",
      },
      keywords: {
        score: 85,
        feedback: "Sebagian besar keywords penting sudah ada",
      },
      experience: {
        score: 98,
        feedback: "Pengalaman kerja sangat sesuai dengan requirement",
      },
    },
  };

  const animatedScoreValue = useAnimatedValue(
    analysisResult.score,
    1200,
    0,
    animationCycle
  );
  const scoreProgress = useAnimatedProgress(
    analysisResult.score,
    0,
    animationCycle
  );
  const animatedScore = Math.min(
    Math.round(animatedScoreValue),
    analysisResult.score
  );
  const primaryScoreColor = getPrimaryScoreColor(animatedScore);
  const primaryScoreGradient = getPrimaryScoreGradient(animatedScore);
  const clampedScoreProgress = Math.min(Math.max(scoreProgress, 0), 100);

  const scoreBadge = getScoreBadge(analysisResult.score);
  const formattedDate = new Date(analysisResult.date).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  const metaInfo = [
    {
      label: "Posisi",
      value: analysisResult.jobTitle,
      Icon: Target,
      accent: "text-cv-accent",
    },
    {
      label: "Perusahaan",
      value: analysisResult.company,
      Icon: Building,
      accent: "text-cv-success",
    },
    {
      label: "Tanggal Analisis",
      value: formattedDate,
      Icon: Calendar,
      accent: "text-cv-warning",
    },
    {
      label: "File CV",
      value: analysisResult.cvFileName,
      Icon: FileText,
      accent: "text-cv-accent",
      valueClass: "break-all",
    },
  ];

  const sectionDetailsForPdf: AnalysisSectionDetail[] = Object.entries(
    analysisResult.sections
  ).map(([section, data]) => ({
    title: getSectionLabel(section),
    score: data.score,
    feedback: data.feedback,
  }));

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      await downloadAnalysisPdf(
        {
          jobTitle: analysisResult.jobTitle,
          company: analysisResult.company,
          date: analysisResult.date,
          score: analysisResult.score,
          cvFileName: analysisResult.cvFileName,
          summary:
            "Laporan lengkap hasil analisis CV Anda berikut rekomendasi per bagian.",
          jobDescription: analysisResult.jobDescription,
          sections: sectionDetailsForPdf,
          strengths: analysisResult.strengths,
          weaknesses: analysisResult.weaknesses,
          suggestions: analysisResult.suggestions,
          keywords: analysisResult.keywordAnalysis,
        },
        `Hasil_Analisis_${analysisResult.jobTitle.replace(
          /[\\/:*?"<>|]/g,
          "_"
        )}.pdf`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container-wide py-8 space-y-8">
      {/* Back Button */}
      <Link href="/history">
        <Button variant="outline" className="btn-secondary group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Riwayat
        </Button>
      </Link>

      {/* Hero Section with Score */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cv-bg-secondary via-cv-bg-secondary/80 to-cv-bg-primary border border-cv-text-secondary/20 mt-4 sm:mt-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-cv-accent/5 via-transparent to-cv-success/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-accent/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative p-8 md:p-12 flex flex-col gap-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-cv-accent/20 rounded-2xl flex items-center justify-center">
                <Award className="w-7 h-7 text-cv-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-cv-text-primary">
                  Hasil Analisis CV
                </h1>
                <Badge
                  className={`mt-2 inline-flex items-center gap-2 border ${scoreBadge.color}`}
                >
                  <Star className="w-4 h-4" />
                  {scoreBadge.text}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="gap-2 bg-cv-accent text-cv-bg-primary hover:bg-cv-accent/90 border-none"
                onClick={handleDownloadReport}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4" />
                {isDownloading ? "Menyiapkan..." : "Unduh Hasil"}
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-cv-text-secondary/40 text-cv-text-primary hover:bg-white/5"
              >
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metaInfo.map(({ label, value, Icon, accent, valueClass }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-cv-bg-primary/70 p-4 backdrop-blur"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cv-text-secondary/80">
                        {label}
                      </p>
                      <p
                        className={`text-base font-semibold text-cv-text-primary ${
                          valueClass ?? "break-words"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-cv-bg-primary/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-cv-text-secondary mb-2">
                  Ringkasan Pekerjaan
                </p>
                <p className="text-base text-cv-text-secondary leading-relaxed">
                  {analysisResult.jobDescription}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative flex flex-col items-center text-center">
                <p className="uppercase text-xs tracking-[0.3em] text-cv-text-secondary mb-4">
                  Skor CV
                </p>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cv-accent/20 to-cv-success/20 rounded-full blur-3xl scale-125"></div>
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-cv-bg-secondary to-cv-bg-primary border-4 border-cv-text-secondary/20 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <div>
                      <div
                        className={`text-7xl font-bold mb-2 ${primaryScoreColor}`}
                      >
                        {animatedScore}
                      </div>
                      <div className="text-2xl text-cv-text-secondary font-medium">
                        / 100
                      </div>
                      <div className="mt-4 w-36 h-2 bg-cv-bg-primary rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${primaryScoreGradient} rounded-full`}
                          style={{
                            width: `${clampedScoreProgress}%`,
                            transition: "width 1s ease-out",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-cv-text-secondary text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cv-accent" />
                  Skor ini menunjukkan kecocokan profil Anda yang sangat kuat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Scores */}
      <div>
        <h2 className="text-2xl font-bold text-cv-text-primary mb-6 flex items-center gap-3">
          <Eye className="w-6 h-6 text-cv-accent" />
          Analisis Detail per Bagian
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.entries(analysisResult.sections) as [
            string,
            SectionScoreData
          ][]).map(
            ([section, data], index) => (
              <SectionScoreCard
                key={section}
                sectionKey={section}
                data={data}
                delay={index * 120}
                resetKey={animationCycle}
              />
            )
          )}
        </div>
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div>
          <Card className="glass-card h-full border-cv-success/20">
            <CardHeader>
              <CardTitle className="text-cv-success flex items-center gap-3">
                <div className="w-10 h-10 bg-cv-success/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                Kelebihan CV Anda
              </CardTitle>
              <CardDescription className="text-cv-text-secondary">
                Poin-poin kuat yang sudah Anda miliki
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-cv-success/5 rounded-lg border border-cv-success/10"
                >
                  <CheckCircle className="w-5 h-5 text-cv-success mt-0.5 flex-shrink-0" />
                  <span className="text-cv-text-secondary">{strength}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weaknesses */}
        <div>
          <Card className="glass-card h-full border-cv-error/20">
            <CardHeader>
              <CardTitle className="text-cv-error flex items-center gap-3">
                <div className="w-10 h-10 bg-cv-error/20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                Area yang Perlu Diperbaiki
              </CardTitle>
              <CardDescription className="text-cv-text-secondary">
                Aspek yang bisa ditingkatkan untuk hasil lebih optimal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-cv-error/5 rounded-lg border border-cv-error/10"
                >
                  <AlertCircle className="w-5 h-5 text-cv-error mt-0.5 flex-shrink-0" />
                  <span className="text-cv-text-secondary">{weakness}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggestions */}
      <Card className="glass-card border-cv-warning/20">
        <CardHeader>
          <CardTitle className="text-cv-warning flex items-center gap-3">
            <div className="w-10 h-10 bg-cv-warning/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            Saran Perbaikan Konkret
          </CardTitle>
          <CardDescription className="text-cv-text-secondary">
            Langkah-langkah spesifik untuk meningkatkan skor CV Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResult.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-cv-warning/5 rounded-lg border border-cv-warning/10 hover:bg-cv-warning/10 transition-colors"
              >
                <div className="w-8 h-8 bg-cv-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-cv-warning text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <span className="text-cv-text-secondary">{suggestion}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keywords Analysis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-cv-text-primary flex items-center gap-3">
            <div className="w-10 h-10 bg-cv-accent/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-cv-accent" />
            </div>
            Analisis Keywords
          </CardTitle>
          <CardDescription className="text-cv-text-secondary">
            Keywords yang ditemukan dan yang masih hilang dari CV Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-cv-success font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Keywords Ditemukan (
                {analysisResult.keywordAnalysis.found.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywordAnalysis.found.map((keyword, index) => (
                  <div key={index}>
                    <Badge className="bg-cv-success/10 text-cv-success border-cv-success/20 hover:bg-cv-success/20 transition-colors">
                      {keyword}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-cv-error font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Keywords yang Hilang (
                {analysisResult.keywordAnalysis.missing.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywordAnalysis.missing.map(
                  (keyword, index) => (
                    <div key={index}>
                      <Badge className="bg-cv-error/10 text-cv-error border-cv-error/20 hover:bg-cv-error/20 transition-colors">
                        {keyword}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Tools Action Hub */}
      <Card className="glass-card border-cv-accent/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cv-accent/5 via-transparent to-cv-success/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cv-accent/10 to-transparent rounded-full blur-2xl"></div>

        <CardHeader className="text-center relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cv-accent to-cv-success rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-cv-text-primary">
              Lanjutkan dengan AI Tools
            </CardTitle>
          </div>
          <CardDescription className="text-cv-text-secondary text-lg">
            Manfaatkan hasil analisis ini untuk membuat dokumen karier yang
            lebih kuat
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href={`/summary-generator/${analysisResult.id}`}
              className="group"
            >
              <Card className="glass-card hover:border-cv-success/40 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cv-success/20 to-cv-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-cv-success/30 group-hover:to-cv-success/20 transition-all">
                    <FileText className="w-8 h-8 text-cv-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2 group-hover:text-cv-success transition-colors">
                    Generator Ringkasan
                  </h3>
                  <p className="text-cv-text-secondary text-sm">
                    Buat paragraf ringkasan profesional yang kuat untuk bagian
                    atas CV Anda
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={`/cover-letter-generator/${analysisResult.id}`}
              className="group"
            >
              <Card className="glass-card hover:border-cv-warning/40 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cv-warning/20 to-cv-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-cv-warning/30 group-hover:to-cv-warning/20 transition-all">
                    <Mail className="w-8 h-8 text-cv-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2 group-hover:text-cv-warning transition-colors">
                    Generator Surat Lamaran
                  </h3>
                  <p className="text-cv-text-secondary text-sm">
                    Buat surat lamaran yang personal dan persuasif untuk posisi
                    ini
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href={`/interview-prep/${analysisResult.id}`}
              className="group"
            >
              <Card className="glass-card hover:border-cv-accent/40 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cv-accent/20 to-cv-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-cv-accent/30 group-hover:to-cv-accent/20 transition-all">
                    <Users className="w-8 h-8 text-cv-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2 group-hover:text-cv-accent transition-colors">
                    Persiapan Wawancara
                  </h3>
                  <p className="text-cv-text-secondary text-sm">
                    Dapatkan pertanyaan wawancara dan panduan jawaban yang tepat
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type SectionScoreData = {
  score: number;
  feedback: string;
};

type SectionScoreCardProps = {
  sectionKey: string;
  data: SectionScoreData;
  delay?: number;
  resetKey?: number;
};

const SectionScoreCard = ({
  sectionKey,
  data,
  delay = 0,
  resetKey = 0,
}: SectionScoreCardProps) => {
  const animatedValue = useAnimatedValue(data.score, 900, delay, resetKey);
  const roundedValue = Math.min(Math.round(animatedValue), data.score);
  const progressValue = useAnimatedProgress(data.score, delay, resetKey);

  return (
    <Card className="glass-card hover:scale-[1.02] transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-cv-text-primary capitalize">
            {getSectionLabel(sectionKey)}
          </h3>
          <div className={`text-2xl font-bold ${getScoreColor(roundedValue)}`}>
            {roundedValue}
          </div>
        </div>
        <Progress value={progressValue} className="h-3 mb-3" />
        <p className="text-sm text-cv-text-secondary">{data.feedback}</p>
      </CardContent>
    </Card>
  );
};

const useAnimatedValue = (
  target: number,
  duration = 1000,
  delay = 0,
  resetKey = 0
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const startAnimation = () => {
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(target * progress);

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);
    };

    setValue(0);
    timeoutId = setTimeout(startAnimation, delay);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [target, duration, delay, resetKey]);

  return value;
};

const useAnimatedProgress = (
  target: number,
  delay = 0,
  resetKey = 0
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let frameId = 0;

    setValue(0);

    const start = () => {
      frameId = requestAnimationFrame(() => setValue(target));
    };

    timeoutId = setTimeout(start, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [target, delay, resetKey]);

  return value;
};
