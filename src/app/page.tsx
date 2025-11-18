"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cv-accent/10 via-transparent to-cv-bg-primary"></div>
        <div className="container-centered py-20 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-2 text-cv-accent bg-cv-accent/10 border-cv-accent/20 gap-2"
              >
                <Sparkles className="w-4 h-4 text-cv-warning" />
                Powered by Artificial Intelligence
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Optimasi CV Anda dengan{" "}
              <span className="gradient-text">
                <br />
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-xl text-cv-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Dapatkan analisis mendalam tentang CV Anda dan tingkatkan peluang
              lolos seleksi kerja. AI kami memberikan feedback konkret dalam
              hitungan detik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="btn-primary px-8 py-3 text-lg">
                  Mulai Analisis Gratis
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-centered">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih AI CV Review?
            </h2>
            <p className="text-cv-text-secondary text-lg max-w-3xl mx-auto">
              Teknologi AI terdepan yang membantu Anda mendapatkan pekerjaan
              impian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Analisis AI Cerdas",
                description:
                  "Algoritma machine learning yang menganalisis CV Anda terhadap ribuan job description untuk memberikan feedback yang tepat sasaran.",
              },
              {
                icon: FileText,
                title: "Ringkasan Profesional",
                description:
                  "AI membuat beberapa pilihan paragraf ringkasan profesional yang singkat dan berdampak untuk bagian atas CV Anda.",
              },
              {
                icon: Mail,
                title: "Generator Surat Lamaran",
                description:
                  "Buat draf surat lamaran yang personal dan persuasif dengan menggabungkan kekuatan CV Anda dengan requirement pekerjaan.",
              },
              {
                icon: Target,
                title: "Skor Kecocokan Real-time",
                description:
                  "Dapatkan skor 0-100 yang menunjukkan seberapa cocok CV Anda dengan posisi yang ditargetkan, lengkap dengan penjelasan detail.",
              },
              {
                icon: Users,
                title: "Persiapan Wawancara AI",
                description:
                  "Dapatkan pertanyaan wawancara yang disesuaikan dengan posisi, lengkap dengan panduan jawaban yang baik dan yang harus dihindari.",
              },
              {
                icon: TrendingUp,
                title: "Saran Perbaikan Konkret",
                description:
                  "Rekomendasi spesifik untuk meningkatkan CV Anda, dari keyword yang hilang hingga struktur yang lebih optimal.",
              },
              {
                icon: Clock,
                title: "Hasil Dalam 30 Detik",
                description:
                  "Tidak perlu menunggu lama. Analisis komprehensif CV Anda selesai dalam hitungan detik.",
              },
              {
                icon: Shield,
                title: "Data Aman & Privat",
                description:
                  "CV Anda tidak disimpan permanen. Kami hanya menggunakan data untuk sekali analisis dan kemudian menghapusnya.",
              },
              {
                icon: Users,
                title: "Dipercaya 10,000+ User",
                description:
                  "Bergabung dengan ribuan profesional yang telah meningkatkan karier mereka dengan bantuan AI kami.",
              },
            ].map((feature, index) => (
              <div key={index}>
                <Card className="glass-card h-full hover:scale-105 transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-cv-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cv-accent/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-cv-accent" />
                    </div>
                    <CardTitle className="text-cv-text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cv-text-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-cv-bg-secondary/30">
        <div className="container-centered">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cara Kerja Sederhana
            </h2>
            <p className="text-cv-text-secondary text-lg">
              Hanya 3 langkah untuk mendapatkan feedback CV yang komprehensif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload CV",
                description:
                  "Unggah file CV Anda dalam format PDF atau DOCX. Proses upload cepat dan aman.",
              },
              {
                step: "02",
                title: "Input Job Description",
                description:
                  "Masukkan deskripsi pekerjaan yang Anda targetkan untuk analisis yang lebih akurat.",
              },
              {
                step: "03",
                title: "Dapatkan Feedback",
                description:
                  "Terima skor kecocokan dan feedback detail dalam 30 detik. Siap untuk diperbaiki!",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cv-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-cv-text-primary">
                  {step.title}
                </h3>
                <p className="text-cv-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-centered">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-cv-text-secondary text-lg">
              Testimoni dari para profesional yang telah merasakan manfaatnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Wijaya",
                role: "Software Engineer",
                avatar: "/api/placeholder/60/60",
                rating: 5,
                comment:
                  "Feedback dari AI CV Review sangat membantu! Saya berhasil lolos interview di 3 perusahaan tech setelah memperbaiki CV sesuai saran yang diberikan.",
              },
              {
                name: "Budi Santoso",
                role: "Marketing Manager",
                avatar: "/api/placeholder/60/60",
                rating: 5,
                comment:
                  "Skor kecocokan yang diberikan sangat akurat. Sekarang saya lebih percaya diri saat melamar kerja karena tahu CV saya sudah optimal.",
              },
              {
                name: "Maya Kusuma",
                role: "Data Analyst",
                avatar: "/api/placeholder/60/60",
                rating: 5,
                comment:
                  "Interface-nya user friendly dan hasilnya cepat. AI-nya benar-benar memahami apa yang dicari recruiter. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div key={index}>
                <Card className="glass-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-cv-accent/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-cv-accent font-semibold text-lg">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-cv-text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-cv-text-secondary">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-cv-warning fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-cv-text-secondary italic">
                      "{testimonial.comment}"
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cv-accent/10 via-cv-bg-secondary/50 to-cv-accent/10">
        <div className="container-centered text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Meningkatkan Peluang Karier Anda?
            </h2>
            <p className="text-cv-text-secondary text-lg mb-8 max-w-3xl mx-auto">
              Bergabunglah dengan ribuan profesional yang telah mengoptimalkan
              CV mereka dan mendapatkan pekerjaan impian.
            </p>
            <div>
              <Link href="/register">
                <Button size="lg" className="btn-primary px-8 py-3 text-lg">
                  Mulai Gratis Sekarang
                  <CheckCircle className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
