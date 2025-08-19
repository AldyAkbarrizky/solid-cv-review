"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FileText,
  Calendar,
  TrendingUp,
  Search,
  Eye,
  Download,
  Trash2,
  Mail,
  Users,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterScore, setFilterScore] = useState("all");

  // Mock data untuk riwayat analisis
  const analysisHistory = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "Tech Startup Indonesia",
      date: "2025-01-15",
      score: 92,
      status: "excellent",
      cvFileName: "CV_John_Doe_Frontend.pdf",
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "E-commerce Giant",
      date: "2025-01-12",
      score: 78,
      status: "good",
      cvFileName: "CV_John_Doe_PM.pdf",
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Design Agency",
      date: "2025-01-10",
      score: 65,
      status: "needs-improvement",
      cvFileName: "CV_John_Doe_Designer.pdf",
    },
    {
      id: 4,
      jobTitle: "Full Stack Developer",
      company: "Fintech Company",
      date: "2025-01-08",
      score: 88,
      status: "excellent",
      cvFileName: "CV_John_Doe_Fullstack.pdf",
    },
    {
      id: 5,
      jobTitle: "Data Scientist",
      company: "AI Research Lab",
      date: "2025-01-05",
      score: 71,
      status: "good",
      cvFileName: "CV_John_Doe_DataScience.pdf",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-cv-success";
    if (score >= 60) return "text-cv-warning";
    return "text-cv-error";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return (
          <Badge className="bg-cv-success/10 text-cv-success border-cv-success/20">
            Excellent
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-cv-warning/10 text-cv-warning border-cv-warning/20">
            Good
          </Badge>
        );
      case "needs-improvement":
        return (
          <Badge className="bg-cv-error/10 text-cv-error border-cv-error/20">
            Needs Improvement
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredHistory = analysisHistory.filter((item) => {
    const matchesSearch =
      item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterScore === "all" ||
      (filterScore === "excellent" && item.score >= 80) ||
      (filterScore === "good" && item.score >= 60 && item.score < 80) ||
      (filterScore === "needs-improvement" && item.score < 60);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header isLoggedIn={true} userName="John Doe" />

      <div className="container-centered py-8">
        {/* Header Section */}
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
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold text-cv-text-primary mb-2"
          >
            Riwayat Analisis CV
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-cv-text-secondary">
            Lihat semua analisis CV yang pernah Anda lakukan
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                  <Input
                    placeholder="Cari berdasarkan posisi atau perusahaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterScore === "all" ? "default" : "outline"}
                    onClick={() => setFilterScore("all")}
                    className={
                      filterScore === "all" ? "btn-primary" : "btn-secondary"
                    }
                  >
                    Semua
                  </Button>
                  <Button
                    variant={
                      filterScore === "excellent" ? "default" : "outline"
                    }
                    onClick={() => setFilterScore("excellent")}
                    className={
                      filterScore === "excellent"
                        ? "btn-primary"
                        : "btn-secondary"
                    }
                  >
                    Excellent
                  </Button>
                  <Button
                    variant={filterScore === "good" ? "default" : "outline"}
                    onClick={() => setFilterScore("good")}
                    className={
                      filterScore === "good" ? "btn-primary" : "btn-secondary"
                    }
                  >
                    Good
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cv-accent mb-2">
                {analysisHistory.length}
              </div>
              <p className="text-cv-text-secondary">Total Analisis</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cv-success mb-2">
                {Math.round(
                  analysisHistory.reduce((acc, item) => acc + item.score, 0) /
                    analysisHistory.length
                )}
              </div>
              <p className="text-cv-text-secondary">Rata-rata Skor</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cv-warning mb-2">
                {analysisHistory.filter((item) => item.score >= 80).length}
              </div>
              <p className="text-cv-text-secondary">Skor Excellent</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* History List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredHistory.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-cv-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-cv-text-primary mb-2">
                  Tidak ada hasil ditemukan
                </h3>
                <p className="text-cv-text-secondary">
                  Coba ubah kata kunci pencarian atau filter yang digunakan
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-card hover:scale-[1.02] transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-cv-accent" />
                          <h3 className="text-lg font-semibold text-cv-text-primary">
                            {item.jobTitle}
                          </h3>
                          {getStatusBadge(item.status)}
                        </div>

                        <p className="text-cv-text-secondary mb-2">
                          {item.company}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-cv-text-secondary">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span
                              className={`font-semibold ${getScoreColor(
                                item.score
                              )}`}
                            >
                              {item.score}/100
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/analysis/${item.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="btn-secondary"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </Link>

                        <div className="flex items-center gap-1">
                          <Link href={`/summary-generator/${item.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn-secondary p-2"
                              title="Generator Ringkasan"
                            >
                              <FileText className="w-4 h-4 text-cv-success" />
                            </Button>
                          </Link>
                          <Link href={`/cover-letter-generator/${item.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn-secondary p-2"
                              title="Generator Surat Lamaran"
                            >
                              <Mail className="w-4 h-4 text-cv-warning" />
                            </Button>
                          </Link>
                          <Link href={`/interview-prep/${item.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn-secondary p-2"
                              title="Persiapan Wawancara"
                            >
                              <Users className="w-4 h-4 text-cv-accent" />
                            </Button>
                          </Link>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="btn-secondary"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-cv-error hover:text-cv-error"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Empty State for New Users */}
        {analysisHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <FileText className="w-24 h-24 text-cv-text-secondary mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-cv-text-primary mb-4">
                  Belum ada riwayat analisis
                </h3>
                <p className="text-cv-text-secondary mb-6 max-w-md mx-auto">
                  Mulai analisis CV pertama Anda untuk melihat riwayat di sini.
                  Semua hasil analisis akan tersimpan dan bisa diakses kapan
                  saja.
                </p>
                <Link href="/dashboard">
                  <Button className="btn-primary">
                    Mulai Analisis Pertama
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
