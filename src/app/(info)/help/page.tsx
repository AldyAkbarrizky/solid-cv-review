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
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  HelpCircle,
  FileText,
  Upload,
  Brain,
  CreditCard,
  Shield,
  Settings,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      icon: FileText,
      title: "Memulai",
      description: "Panduan dasar menggunakan AI CV Review",
      color: "text-cv-accent",
    },
    {
      icon: Upload,
      title: "Upload CV",
      description: "Cara upload dan format file yang didukung",
      color: "text-cv-success",
    },
    {
      icon: Brain,
      title: "Analisis AI",
      description: "Memahami hasil analisis dan feedback",
      color: "text-cv-warning",
    },
    {
      icon: CreditCard,
      title: "Billing",
      description: "Paket berlangganan dan pembayaran",
      color: "text-cv-error",
    },
    {
      icon: Shield,
      title: "Keamanan",
      description: "Privasi data dan keamanan akun",
      color: "text-cv-success",
    },
    {
      icon: Settings,
      title: "Pengaturan",
      description: "Mengelola akun dan preferensi",
      color: "text-cv-accent",
    },
  ];

  const faqs = [
    {
      category: "Memulai",
      question: "Bagaimana cara memulai menggunakan AI CV Review?",
      answer:
        "Untuk memulai, daftar akun gratis di halaman registrasi. Setelah login, Anda bisa langsung upload CV dan memasukkan deskripsi pekerjaan untuk mendapatkan analisis pertama Anda.",
    },
    {
      category: "Upload CV",
      question: "Format file apa saja yang didukung untuk upload CV?",
      answer:
        "Kami mendukung format PDF (.pdf) dan Microsoft Word (.docx). Ukuran file maksimal 10MB. Pastikan CV Anda dalam format yang dapat dibaca dan tidak berupa gambar scan.",
    },
    {
      category: "Upload CV",
      question: "Mengapa CV saya gagal diupload?",
      answer:
        "Beberapa kemungkinan: 1) Format file tidak didukung, 2) Ukuran file terlalu besar (>10MB), 3) File rusak atau terproteksi password, 4) Koneksi internet tidak stabil. Coba convert ke PDF dan pastikan ukuran file di bawah 10MB.",
    },
    {
      category: "Analisis AI",
      question: "Apa arti skor kecocokan 0-100?",
      answer:
        "Skor menunjukkan seberapa cocok CV Anda dengan job description: 80-100 (Excellent), 60-79 (Good), 40-59 (Fair), 0-39 (Needs Improvement). Skor dihitung berdasarkan relevansi pengalaman, skills, keywords, dan format CV.",
    },
    {
      category: "Analisis AI",
      question: "Berapa lama proses analisis CV?",
      answer:
        "Analisis biasanya selesai dalam 30-60 detik. Waktu bisa lebih lama jika server sedang sibuk atau CV Anda sangat panjang. Jika lebih dari 5 menit, coba refresh halaman atau hubungi support.",
    },
    {
      category: "Analisis AI",
      question: "Apakah hasil analisis selalu akurat?",
      answer:
        "AI kami terus belajar dan berkembang. Akurasi sekitar 85-90% untuk analisis umum. Namun, hasil tetap perlu interpretasi manusia karena setiap industri dan perusahaan memiliki preferensi berbeda.",
    },
    {
      category: "Billing",
      question: "Apa perbedaan akun Gratis dan Pro?",
      answer:
        "Akun Gratis: 5 analisis/bulan, feedback dasar. Akun Pro: analisis unlimited, feedback mendalam, analisis foto CV, export PDF, riwayat lengkap, dan priority support.",
    },
    {
      category: "Billing",
      question: "Bagaimana cara upgrade ke akun Pro?",
      answer:
        'Klik tombol "Upgrade ke Pro" di dashboard atau halaman pricing. Pilih paket yang sesuai dan lakukan pembayaran. Upgrade akan aktif langsung setelah pembayaran berhasil.',
    },
    {
      category: "Keamanan",
      question: "Apakah CV saya aman dan tidak disalahgunakan?",
      answer:
        "Ya, sangat aman. Kami menerapkan zero-retention policy: CV hanya digunakan untuk sekali analisis dan langsung dihapus. Data dienkripsi AES-256 dan server dilindungi firewall enterprise.",
    },
    {
      category: "Keamanan",
      question: "Siapa saja yang bisa melihat CV saya?",
      answer:
        "Hanya Anda yang bisa melihat CV dan hasil analisis. Tim teknis kami tidak memiliki akses ke konten CV. File CV dihapus otomatis setelah analisis selesai.",
    },
    {
      category: "Pengaturan",
      question: "Bagaimana cara mengubah password akun?",
      answer:
        "Masuk ke halaman Settings > Ubah Password. Masukkan password lama, password baru, dan konfirmasi. Password baru minimal 8 karakter dengan kombinasi huruf dan angka.",
    },
    {
      category: "Pengaturan",
      question: "Bisakah saya menghapus riwayat analisis?",
      answer:
        "Ya, Anda bisa menghapus riwayat analisis satu per satu di halaman History, atau menghapus semua riwayat di halaman Settings. Penghapusan bersifat permanen dan tidak bisa dibatalkan.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-20">
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
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Pusat <span className="gradient-text">Bantuan</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-cv-text-secondary max-w-2xl mx-auto mb-8"
          >
            Temukan jawaban atas pertanyaan Anda atau pelajari cara menggunakan
            AI CV Review
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
              <Input
                placeholder="Cari bantuan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-cv-text-primary mb-8 text-center">
            Kategori Bantuan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${category.color.replace(
                        "text-",
                        "bg-"
                      )}/10`}
                    >
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                      {category.title}
                    </h3>
                    <p className="text-cv-text-secondary text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-cv-text-primary mb-8 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>

          {filteredFaqs.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-cv-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-cv-text-primary mb-2">
                  Tidak ada hasil ditemukan
                </h3>
                <p className="text-cv-text-secondary mb-4">
                  Coba ubah kata kunci pencarian atau hubungi support kami
                </p>
                <Link href="/contact">
                  <Button className="btn-primary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Hubungi Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-cv-text-secondary/20"
                    >
                      <AccordionTrigger className="text-cv-text-primary hover:text-cv-accent text-left">
                        <div className="flex items-start gap-3">
                          <span className="text-cv-accent text-xs font-medium bg-cv-accent/10 px-2 py-1 rounded-full mt-1">
                            {faq.category}
                          </span>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-cv-text-secondary pt-4 pl-16">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-cv-text-primary">
                Tidak menemukan jawaban yang Anda cari?
              </CardTitle>
              <CardDescription className="text-cv-text-secondary">
                Tim support kami siap membantu Anda 24/7
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="btn-primary">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Hubungi Support
                  </Button>
                </Link>
                <Button variant="outline" className="btn-secondary">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
              </div>

              <div className="text-sm text-cv-text-secondary">
                <p>
                  Email:{" "}
                  <span className="text-cv-accent">support@aicvreview.com</span>
                </p>
                <p>Response time: Kurang dari 24 jam</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Articles */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-cv-text-primary mb-8 text-center">
            Artikel Populer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Cara Menulis CV yang ATS-Friendly",
                description:
                  "Tips membuat CV yang mudah dibaca oleh sistem ATS dan AI",
                readTime: "5 menit",
              },
              {
                title: "Mengoptimalkan Keywords di CV",
                description:
                  "Strategi memasukkan keywords yang tepat untuk setiap posisi",
                readTime: "7 menit",
              },
              {
                title: "Format CV yang Disukai Recruiter",
                description:
                  "Panduan lengkap format dan layout CV yang profesional",
                readTime: "6 menit",
              },
            ].map((article, index) => (
              <Card
                key={index}
                className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    {article.title}
                  </h3>
                  <p className="text-cv-text-secondary text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-accent text-sm font-medium">
                      Baca artikel →
                    </span>
                    <span className="text-cv-text-secondary text-xs">
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div> */}
      </div>

      <Footer />
    </div>
  );
}
