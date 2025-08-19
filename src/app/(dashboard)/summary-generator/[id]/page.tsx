"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Copy,
  RefreshCw,
  CheckCircle,
  FileText,
  Sparkles,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function SummaryGenerator() {
  const params = useParams();
  const analysisId = params.id;
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaries, setSummaries] = useState([
    {
      id: 1,
      title: "Versi Profesional",
      content:
        "Senior Frontend Developer dengan 6+ tahun pengalaman mengembangkan aplikasi web skala enterprise menggunakan React, TypeScript, dan modern JavaScript frameworks. Terbukti berhasil memimpin tim development dan meningkatkan performa aplikasi hingga 40%. Memiliki keahlian kuat dalam UI/UX design, testing automation, dan implementasi best practices dalam software development lifecycle.",
      style: "professional",
    },
    {
      id: 2,
      title: "Versi Achievement-Focused",
      content:
        "Accomplished Frontend Developer yang telah berhasil mengdelivery 15+ proyek web aplikasi dengan tingkat kepuasan klien 98%. Expertise dalam React ecosystem dengan track record meningkatkan conversion rate hingga 35% melalui optimasi user experience. Passionate dalam mentoring junior developers dan berkontribusi pada open-source projects dengan 500+ GitHub stars.",
      style: "achievement",
    },
    {
      id: 3,
      title: "Versi Technical-Focused",
      content:
        "Experienced Frontend Engineer dengan deep expertise dalam React, TypeScript, Next.js, dan modern web technologies. Specialized dalam performance optimization, responsive design, dan accessibility compliance (WCAG 2.1). Proven ability dalam architecting scalable frontend solutions dan implementing CI/CD pipelines untuk automated testing dan deployment.",
      style: "technical",
    },
  ]);

  const handleCopy = (content: string, title: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${title} berhasil disalin!`);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Ringkasan baru berhasil dibuat!");
      setIsGenerating(false);
    }, 2000);
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case "professional":
        return "bg-cv-accent/10 text-cv-accent border-cv-accent/20";
      case "achievement":
        return "bg-cv-success/10 text-cv-success border-cv-success/20";
      case "technical":
        return "bg-cv-warning/10 text-cv-warning border-cv-warning/20";
      default:
        return "bg-cv-text-secondary/10 text-cv-text-secondary border-cv-text-secondary/20";
    }
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header isLoggedIn={true} userName="John Doe" />

      <div className="container-narrow py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href={`/analysis/${analysisId}`}>
            <Button variant="outline" className="btn-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Hasil Analisis
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-cv-accent" />
              <h1 className="text-3xl font-bold text-cv-text-primary">
                Generator Ringkasan Profesional
              </h1>
            </div>
            <p className="text-cv-text-secondary max-w-2xl mx-auto">
              AI telah menganalisis CV Anda dan membuat beberapa pilihan
              ringkasan profesional yang dapat Anda gunakan di bagian atas CV
              untuk memberikan kesan pertama yang kuat.
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="btn-primary"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Membuat Ulang...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Buat Versi Baru
                </>
              )}
            </Button>
            <Button variant="outline" className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Download Semua
            </Button>
          </motion.div>

          {/* Summary Options */}
          <div className="space-y-6">
            {summaries.map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-cv-accent" />
                        <CardTitle className="text-cv-text-primary">
                          {summary.title}
                        </CardTitle>
                        <Badge className={getStyleColor(summary.style)}>
                          {summary.style === "professional"
                            ? "Profesional"
                            : summary.style === "achievement"
                            ? "Fokus Pencapaian"
                            : "Fokus Teknis"}
                        </Badge>
                      </div>
                      <Button
                        onClick={() =>
                          handleCopy(summary.content, summary.title)
                        }
                        size="sm"
                        className="btn-primary"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Salin
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-cv-bg-secondary/50 border border-cv-text-secondary/20 rounded-lg p-4">
                      <p className="text-cv-text-primary leading-relaxed">
                        {summary.content}
                      </p>
                    </div>

                    <div className="mt-4 text-sm text-cv-text-secondary">
                      <div className="flex items-center gap-4">
                        <span>
                          📊 Panjang: {summary.content.split(" ").length} kata
                        </span>
                        <span>
                          ⏱️ Waktu baca: ~
                          {Math.ceil(summary.content.split(" ").length / 200)}{" "}
                          menit
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-2">
                  💡 Tips Menggunakan Ringkasan Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cv-success mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Yang Harus Dilakukan
                    </h4>
                    <ul className="text-cv-text-secondary text-sm space-y-1">
                      <li>
                        • Letakkan di bagian paling atas CV, setelah informasi
                        kontak
                      </li>
                      <li>• Sesuaikan dengan posisi yang dilamar</li>
                      <li>• Gunakan kata kunci dari job description</li>
                      <li>• Fokus pada value yang bisa Anda berikan</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cv-error mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Yang Harus Dihindari
                    </h4>
                    <ul className="text-cv-text-secondary text-sm space-y-1">
                      <li>• Jangan terlalu panjang (maksimal 3-4 kalimat)</li>
                      <li>• Hindari klise seperti "hard worker"</li>
                      <li>• Jangan menyebutkan gaji atau benefit</li>
                      <li>• Hindari informasi personal yang tidak relevan</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary">
                  🚀 Langkah Selanjutnya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href={`/cover-letter-generator/${analysisId}`}>
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 btn-secondary flex items-center gap-3"
                    >
                      <FileText className="w-6 h-6 text-cv-warning" />
                      <div className="text-left">
                        <div className="font-medium text-cv-text-primary">
                          Buat Surat Lamaran
                        </div>
                        <div className="text-xs text-cv-text-secondary">
                          Generate cover letter yang personal
                        </div>
                      </div>
                    </Button>
                  </Link>

                  <Link href={`/interview-prep/${analysisId}`}>
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 btn-secondary flex items-center gap-3"
                    >
                      <Sparkles className="w-6 h-6 text-cv-success" />
                      <div className="text-left">
                        <div className="font-medium text-cv-text-primary">
                          Persiapan Wawancara
                        </div>
                        <div className="text-xs text-cv-text-secondary">
                          Latihan Q&A dengan AI
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
