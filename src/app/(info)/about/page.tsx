"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Brain, Shield, Target, Users, Clock, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container-centered">
          <div
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Tentang <span className="gradient-text">AI CV Review</span>
            </h1>

            <p
              className="text-xl text-cv-text-secondary max-w-3xl mx-auto leading-relaxed"
            >
              Kami adalah platform AI terdepan yang membantu para pencari kerja
              mengoptimalkan CV mereka dan meningkatkan peluang lolos seleksi di
              perusahaan impian.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cv-bg-secondary/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-cv-text-primary flex items-center gap-3">
                    <Target className="w-8 h-8 text-cv-accent" />
                    Misi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary leading-relaxed">
                    Demokratisasi akses ke feedback CV berkualitas tinggi
                    melalui teknologi AI. Kami percaya setiap orang berhak
                    mendapatkan kesempatan yang setara untuk menampilkan potensi
                    terbaik mereka kepada recruiter dan hiring manager.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-cv-text-primary flex items-center gap-3">
                    <Brain className="w-8 h-8 text-cv-accent" />
                    Visi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary leading-relaxed">
                    Menjadi platform #1 di Indonesia untuk optimasi CV dengan
                    AI, membantu jutaan profesional mendapatkan pekerjaan yang
                    sesuai dengan kemampuan dan aspirasi karier mereka.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cv-text-primary mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-cv-text-secondary text-lg max-w-2xl mx-auto">
              Teknologi terdepan dan pengalaman yang tidak tertandingi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI Technology",
                description:
                  "Menggunakan natural language processing dan machine learning terbaru untuk analisis yang akurat dan mendalam.",
              },
              {
                icon: Users,
                title: "10,000+ Users",
                description:
                  "Dipercaya oleh ribuan profesional dari berbagai industri di seluruh Indonesia.",
              },
              {
                icon: Clock,
                title: "Hasil Instan",
                description:
                  "Feedback komprehensif dalam hitungan detik, tidak perlu menunggu berhari-hari.",
              },
              {
                icon: Shield,
                title: "Data Security",
                description:
                  "Keamanan data terjamin dengan enkripsi tingkat enterprise dan kebijakan zero-retention.",
              },
              {
                icon: Award,
                title: "Proven Results",
                description:
                  "85% pengguna melaporkan peningkatan response rate dari recruiter setelah menggunakan layanan kami.",
              },
              {
                icon: Target,
                title: "Personalized",
                description:
                  "Setiap feedback disesuaikan dengan industri, level karier, dan target posisi yang spesifik.",
              },
            ].map((feature, index) => (
              <div
                key={index}
              >
                <Card className="glass-card h-full text-center group hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-cv-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cv-accent/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-cv-accent" />
                    </div>
                    <CardTitle className="text-xl font-bold text-cv-text-primary">
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

      {/* Technology Stack */}
      <section className="py-20 bg-cv-bg-secondary/30">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cv-text-primary mb-4">
              Teknologi yang Kami Gunakan
            </h2>
            <p className="text-cv-text-secondary text-lg max-w-2xl mx-auto">
              Powered by cutting-edge AI and modern web technologies
            </p>
          </div>

          <div>
            <Card className="glass-card max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-cv-text-primary mb-4">
                      AI & Machine Learning
                    </h3>
                    <ul className="space-y-2 text-cv-text-secondary">
                      <li>• Natural Language Processing (NLP)</li>
                      <li>• Computer Vision untuk analisis layout</li>
                      <li>• Machine Learning untuk pattern recognition</li>
                      <li>• Deep Learning untuk sentiment analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-cv-text-primary mb-4">
                      Infrastructure
                    </h3>
                    <ul className="space-y-2 text-cv-text-secondary">
                      <li>• Cloud-native architecture</li>
                      <li>• Microservices dengan high availability</li>
                      <li>• Real-time processing capabilities</li>
                      <li>• Enterprise-grade security</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cv-text-primary mb-4">
              Privasi & Keamanan Data
            </h2>
            <p className="text-cv-text-secondary text-lg max-w-2xl mx-auto">
              Komitmen kami terhadap keamanan dan privasi data Anda
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-3">
                    <Shield className="w-6 h-6 text-cv-success" />
                    Zero Data Retention Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary">
                    CV dan dokumen yang Anda upload tidak disimpan secara
                    permanen di server kami. File hanya digunakan untuk sekali
                    proses analisis dan langsung dihapus setelah hasil
                    dikirimkan kepada Anda.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-3">
                    <Shield className="w-6 h-6 text-cv-success" />
                    Enterprise-Grade Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary">
                    Semua data dienkripsi end-to-end dengan standar AES-256.
                    Server kami dilindungi dengan firewall tingkat enterprise
                    dan monitoring 24/7 untuk memastikan keamanan maksimal.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-3">
                    <Shield className="w-6 h-6 text-cv-success" />
                    Compliance & Sertifikasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cv-text-secondary">
                    Kami mematuhi standar internasional untuk perlindungan data
                    pribadi termasuk GDPR dan ISO 27001. Sistem kami secara
                    rutin diaudit oleh pihak ketiga untuk memastikan compliance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-cv-bg-secondary/30">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-cv-text-primary mb-4">
              Hubungi Kami
            </h2>
            <p className="text-cv-text-secondary">
              Ada pertanyaan? Kami siap membantu Anda
            </p>
          </div>

          <div
            className="max-w-2xl mx-auto"
          >
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-cv-text-primary mb-2">
                      Email Support
                    </h3>
                    <p className="text-cv-accent">support@aicvreview.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-cv-text-primary mb-2">
                      Business Inquiries
                    </h3>
                    <p className="text-cv-accent">business@aicvreview.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-cv-text-primary mb-2">
                      Response Time
                    </h3>
                    <p className="text-cv-text-secondary">
                      Kami akan merespons dalam 24 jam kerja
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
