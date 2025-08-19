"use client";

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
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { useParams } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export default function AnalysisDetail() {
  const params = useParams();
  const analysisId = params.id;

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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-cv-success";
    if (score >= 60) return "text-cv-warning";
    return "text-cv-error";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-emerald-400 via-cv-success to-cv-accent";
    if (score >= 80) return "from-cv-success to-cv-accent";
    if (score >= 60) return "from-cv-warning to-cv-accent";
    return "from-cv-error to-cv-warning";
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

  const scoreBadge = getScoreBadge(analysisResult.score);

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header isLoggedIn={true} userName="John Doe" />

      <div className="container-wide py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/history">
            <Button variant="outline" className="btn-secondary group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Riwayat
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section with Score */}
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
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cv-bg-secondary via-cv-bg-secondary/80 to-cv-bg-primary border border-cv-text-secondary/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cv-accent/5 via-transparent to-cv-success/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-accent/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Info */}
                <motion.div variants={slideInLeft} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cv-accent/20 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-cv-accent" />
                      </div>
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-cv-text-primary">
                          Hasil Analisis CV
                        </h1>
                        <Badge className={scoreBadge.color}>
                          <Star className="w-3 h-3 mr-1" />
                          {scoreBadge.text}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-cv-text-secondary">
                        <Target className="w-5 h-5 text-cv-accent" />
                        <span className="text-lg font-medium text-cv-text-primary">
                          {analysisResult.jobTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-cv-text-secondary">
                        <Building className="w-5 h-5 text-cv-success" />
                        <span>{analysisResult.company}</span>
                      </div>
                      <div className="flex items-center gap-3 text-cv-text-secondary">
                        <Calendar className="w-5 h-5 text-cv-warning" />
                        <span>
                          {new Date(analysisResult.date).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="btn-secondary group">
                      <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Bagikan
                    </Button>
                    <Button className="btn-primary group">
                      <Download className="w-4 h-4 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                      Download Laporan
                    </Button>
                  </div>
                </motion.div>

                {/* Right Side - Score Display */}
                <motion.div
                  variants={slideInRight}
                  className="flex justify-center"
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cv-accent/20 to-cv-success/20 rounded-full blur-2xl scale-150"></div>

                    {/* Score Circle */}
                    <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-cv-bg-secondary to-cv-bg-primary border-4 border-cv-text-secondary/20 flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className={`text-7xl font-bold mb-2 ${getScoreColor(
                            analysisResult.score
                          )}`}
                        >
                          {analysisResult.score}
                        </div>
                        <div className="text-2xl text-cv-text-secondary font-medium">
                          / 100
                        </div>
                        <div className="mt-4 w-32 h-2 bg-cv-bg-primary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisResult.score}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className={`h-full bg-gradient-to-r ${getScoreGradient(
                              analysisResult.score
                            )} rounded-full`}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Scores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-cv-text-primary mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-cv-accent" />
            Analisis Detail per Bagian
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(analysisResult.sections).map(
              ([section, data], index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="glass-card hover:scale-105 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-cv-text-primary capitalize">
                          {section === "format"
                            ? "Format & Layout"
                            : section === "content"
                            ? "Konten & Relevansi"
                            : section === "keywords"
                            ? "Keywords"
                            : section === "experience"
                            ? "Pengalaman"
                            : section}
                        </h3>
                        <div
                          className={`text-2xl font-bold ${getScoreColor(
                            data.score
                          )}`}
                        >
                          {data.score}
                        </div>
                      </div>
                      <Progress value={data.score} className="h-3 mb-3" />
                      <p className="text-sm text-cv-text-secondary">
                        {data.feedback}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-cv-success/5 rounded-lg border border-cv-success/10"
                  >
                    <CheckCircle className="w-5 h-5 text-cv-success mt-0.5 flex-shrink-0" />
                    <span className="text-cv-text-secondary">{strength}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-cv-error/5 rounded-lg border border-cv-error/10"
                  >
                    <AlertCircle className="w-5 h-5 text-cv-error mt-0.5 flex-shrink-0" />
                    <span className="text-cv-text-secondary">{weakness}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-cv-warning/5 rounded-lg border border-cv-warning/10 hover:bg-cv-warning/10 transition-colors"
                  >
                    <div className="w-8 h-8 bg-cv-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-cv-warning text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-cv-text-secondary">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Keywords Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
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
                    {analysisResult.keywordAnalysis.found.map(
                      (keyword, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.05 }}
                        >
                          <Badge className="bg-cv-success/10 text-cv-success border-cv-success/20 hover:bg-cv-success/20 transition-colors">
                            {keyword}
                          </Badge>
                        </motion.div>
                      )
                    )}
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
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.05 }}
                        >
                          <Badge className="bg-cv-error/10 text-cv-error border-cv-error/20 hover:bg-cv-error/20 transition-colors">
                            {keyword}
                          </Badge>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Tools Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-12"
        >
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
                <Link href={`/summary-generator/${analysisResult.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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
                          Buat paragraf ringkasan profesional yang kuat untuk
                          bagian atas CV Anda
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>

                <Link href={`/cover-letter-generator/${analysisResult.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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
                          Buat surat lamaran yang personal dan persuasif untuk
                          posisi ini
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>

                <Link href={`/interview-prep/${analysisResult.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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
                          Dapatkan pertanyaan wawancara dan panduan jawaban yang
                          tepat
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
