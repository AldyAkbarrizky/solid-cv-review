"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  History,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function Dashboard() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [userName, setUserName] = useState("Pengguna");
  const { user } = useAuth();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setCvFile(acceptedFiles[0]);
        toast.success("CV berhasil diunggah!");
      }
    },
    onDropRejected: () => {
      toast.error("Format file tidak didukung. Gunakan PDF atau DOCX.");
    },
  });

  useEffect(() => {
    if (!user?.name) {
      return;
    }
    const fullName = user.name.trim();
    const firstName = fullName.split(" ")[0] || fullName;
    setUserName(firstName);
  }, [user]);

  const handleAnalyze = async () => {
    if (!cvFile) {
      toast.error("Silakan upload CV terlebih dahulu!");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Silakan masukkan deskripsi pekerjaan!");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      setAnalysisProgress(100);
      setAnalysisResult({
        score: 85,
        strengths: [
          "Pengalaman kerja yang relevan dengan posisi yang dilamar",
          "Skill teknis sesuai dengan requirement pekerjaan",
          "Format CV yang profesional dan mudah dibaca",
          "Pencapaian yang terukur dan spesifik",
        ],
        weaknesses: [
          "Kurang menampilkan soft skills yang penting",
          "Tidak ada portfolio atau project yang ditampilkan",
          "Summary atau objective statement bisa lebih kuat",
        ],
        suggestions: [
          "Tambahkan section portfolio atau project terbaru",
          "Perkuat bagian summary dengan value proposition yang jelas",
          "Sertakan sertifikasi atau training yang relevan",
          "Gunakan action verbs yang lebih impactful dalam deskripsi pengalaman",
        ],
        keywords: ["React", "JavaScript", "Node.js", "MongoDB", "Git"],
        missingKeywords: ["TypeScript", "AWS", "Docker", "Testing"],
      });
      setIsAnalyzing(false);
      toast.success("Analisis selesai!");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      <div className="container-centered py-8">
        {/* Welcome Section */}
        <div
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-cv-text-primary mb-2">
            Selamat datang, {userName}! 👋
          </h1>
          <p className="text-cv-text-secondary">
            Status:{" "}
            <Badge variant="secondary" className="ml-2">
              Akun Gratis
            </Badge>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cv-accent" />
                    Analisis CV Anda dalam 30 Detik
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Upload CV dan masukkan deskripsi pekerjaan untuk mendapatkan
                    feedback AI yang komprehensif
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* CV Upload */}
                  <div>
                    <h3 className="text-lg font-medium text-cv-text-primary mb-3">
                      1. Upload CV Anda
                    </h3>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-cv-accent bg-cv-accent/5"
                          : "border-cv-text-secondary/30 hover:border-cv-accent/50"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {cvFile ? (
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="w-8 h-8 text-cv-success" />
                          <div>
                            <p className="text-cv-text-primary font-medium">
                              {cvFile.name}
                            </p>
                            <p className="text-cv-text-secondary text-sm">
                              {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-cv-text-secondary mx-auto mb-4" />
                          <p className="text-cv-text-primary font-medium">
                            {isDragActive
                              ? "Drop file di sini..."
                              : "Drag & drop CV atau klik untuk upload"}
                          </p>
                          <p className="text-cv-text-secondary text-sm mt-2">
                            Mendukung format PDF dan DOCX (Max 10MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-lg font-medium text-cv-text-primary mb-3">
                      2. Deskripsi Pekerjaan
                    </h3>
                    <Textarea
                      placeholder="Paste deskripsi pekerjaan yang Anda targetkan di sini..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[150px] bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                    />
                  </div>

                  {/* Analysis Button */}
                  <Button
                    onClick={handleAnalyze}
                    className="w-full btn-primary text-lg py-3"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-spin" />
                        Menganalisis... {analysisProgress}%
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Analisis Sekarang
                      </>
                    )}
                  </Button>

                  {/* Progress Bar */}
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <Progress value={analysisProgress} className="h-2" />
                      <p className="text-center text-cv-text-secondary text-sm">
                        AI sedang menganalisis CV Anda...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div
                className="space-y-6"
              >
                {/* Score Card */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cv-text-primary">
                      Skor Kecocokan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-cv-accent mb-2">
                        {analysisResult.score}
                      </div>
                      <div className="text-2xl text-cv-text-secondary mb-4">
                        / 100
                      </div>
                      <div className="w-full bg-cv-bg-secondary rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-cv-accent to-cv-success h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${analysisResult.score}%` }}
                        ></div>
                      </div>
                      <p className="text-cv-text-secondary mt-4">
                        {analysisResult.score >= 80
                          ? "Excellent match!"
                          : analysisResult.score >= 60
                          ? "Good match with room for improvement"
                          : "Needs significant improvements"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-cv-success flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Kelebihan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.strengths.map(
                          (strength: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-cv-text-secondary"
                            >
                              <CheckCircle className="w-4 h-4 text-cv-success mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-cv-error flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Area Perbaikan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResult.weaknesses.map(
                          (weakness: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-cv-text-secondary"
                            >
                              <AlertCircle className="w-4 h-4 text-cv-error mt-0.5 flex-shrink-0" />
                              {weakness}
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Suggestions */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cv-warning flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Saran Perbaikan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.suggestions.map(
                        (suggestion: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-cv-text-secondary"
                          >
                            <TrendingUp className="w-4 h-4 text-cv-warning mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Keywords Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-cv-success">
                        Keywords Ditemukan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map(
                          (keyword: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-cv-success/10 text-cv-success border-cv-success/20"
                            >
                              {keyword}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-cv-error">
                        Keywords yang Hilang
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.map(
                          (keyword: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-cv-error/10 text-cv-error border-cv-error/20"
                            >
                              {keyword}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-primary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Laporan
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <History className="w-4 h-4" />
                    Simpan ke Riwayat
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full btn-secondary justify-start"
                  >
                    <Link href="/history" className="flex w-full items-center">
                      <History className="w-4 h-4 mr-2" />
                      Lihat Riwayat
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full btn-secondary justify-start"
                  >
                    <Link href="/pricing" className="flex w-full items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Upgrade ke Pro
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary">
                    Tips Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary text-sm">
                    💡 Gunakan action verbs yang kuat seperti "Meningkatkan",
                    "Mengembangkan", dan "Memimpin" dalam deskripsi pengalaman
                    kerja Anda untuk membuat CV lebih impactful.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
