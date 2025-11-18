"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  MessageSquare,
  FileText,
  Upload,
  Brain,
  CreditCard,
  Shield,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Semua", icon: HelpCircle },
    { id: "getting-started", name: "Memulai", icon: FileText },
    { id: "upload", name: "Upload CV", icon: Upload },
    { id: "analysis", name: "Analisis AI", icon: Brain },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "security", name: "Keamanan", icon: Shield },
    { id: "settings", name: "Pengaturan", icon: Settings },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "Bagaimana cara memulai menggunakan AI CV Review?",
      answer:
        'Untuk memulai: 1) Daftar akun gratis di halaman registrasi, 2) Verifikasi email Anda, 3) Login ke dashboard, 4) Upload CV dan masukkan job description, 5) Klik "Analisis Sekarang" dan tunggu hasilnya. Proses ini hanya membutuhkan waktu 2-3 menit.',
    },
    {
      id: 2,
      category: "getting-started",
      question: "Apakah AI CV Review benar-benar gratis?",
      answer:
        "Ya! Akun gratis memberikan 5 analisis CV per bulan dengan feedback dasar. Untuk fitur premium seperti analisis unlimited, feedback mendalam, dan analisis foto CV, Anda bisa upgrade ke paket Pro mulai dari Rp 99.000/bulan.",
    },
    {
      id: 3,
      category: "upload",
      question: "Format file apa saja yang didukung untuk upload CV?",
      answer:
        "Kami mendukung format PDF (.pdf) dan Microsoft Word (.docx). Ukuran file maksimal 10MB. Pastikan CV Anda dalam format yang dapat dibaca (bukan scan gambar) agar AI dapat menganalisis dengan optimal.",
    },
    {
      id: 4,
      category: "upload",
      question: "Mengapa CV saya gagal diupload?",
      answer:
        "Beberapa kemungkinan penyebab: 1) Format file tidak didukung (gunakan PDF/DOCX), 2) Ukuran file terlalu besar (maksimal 10MB), 3) File terproteksi password, 4) CV berupa scan gambar (gunakan file text), 5) Koneksi internet tidak stabil. Coba convert ke PDF dan pastikan file dapat dibaca.",
    },
    {
      id: 5,
      category: "upload",
      question: "Bisakah saya upload CV dalam bahasa Indonesia?",
      answer:
        "Tentu saja! AI kami mendukung analisis CV dalam bahasa Indonesia dan Inggris. Sistem akan otomatis mendeteksi bahasa dan memberikan feedback yang sesuai dengan konteks pasar kerja Indonesia.",
    },
    {
      id: 6,
      category: "analysis",
      question: "Apa arti skor kecocokan 0-100?",
      answer:
        "Skor menunjukkan tingkat kecocokan CV dengan job description: 90-100 (Perfect Match), 80-89 (Excellent), 70-79 (Very Good), 60-69 (Good), 50-59 (Fair), di bawah 50 (Needs Major Improvement). Skor dihitung berdasarkan relevansi pengalaman, skills match, keywords, format, dan struktur CV.",
    },
    {
      id: 7,
      category: "analysis",
      question: "Berapa lama proses analisis CV?",
      answer:
        "Analisis biasanya selesai dalam 30-60 detik. Waktu bisa lebih lama (hingga 2 menit) jika: 1) CV sangat panjang (>5 halaman), 2) Server sedang sibuk, 3) Job description sangat detail. Jika lebih dari 5 menit, coba refresh halaman atau hubungi support.",
    },
    {
      id: 8,
      category: "analysis",
      question: "Apakah hasil analisis selalu akurat?",
      answer:
        "AI kami memiliki tingkat akurasi 85-90% berdasarkan ribuan data CV dan job description. Namun, hasil tetap perlu interpretasi manusia karena: 1) Setiap industri memiliki standar berbeda, 2) Preferensi recruiter bervariasi, 3) Konteks perusahaan unik. Gunakan hasil sebagai panduan, bukan keputusan final.",
    },
    {
      id: 9,
      category: "analysis",
      question: "Apa itu analisis foto CV dan bagaimana cara kerjanya?",
      answer:
        "Fitur premium yang menganalisis aspek visual CV Anda menggunakan Computer Vision AI: 1) Layout dan design, 2) Keterbacaan font, 3) Penggunaan warna, 4) Spacing dan alignment, 5) Professional appearance. Fitur ini membantu memastikan CV Anda tidak hanya bagus kontennya, tapi juga tampilannya.",
    },
    {
      id: 10,
      category: "billing",
      question: "Apa perbedaan akun Gratis dan Pro?",
      answer:
        "Gratis: 5 analisis/bulan, feedback dasar, skor kecocokan, support email. Pro (Rp 99k/bulan): Analisis unlimited, feedback mendalam & personal, analisis foto CV, export PDF premium, riwayat lengkap, template CV optimized, priority support 24/7.",
    },
    {
      id: 11,
      category: "billing",
      question: "Bagaimana cara upgrade ke akun Pro?",
      answer:
        'Mudah! 1) Klik "Upgrade ke Pro" di dashboard, 2) Pilih paket (bulanan/tahunan), 3) Isi data pembayaran, 4) Konfirmasi pembayaran. Upgrade aktif langsung setelah pembayaran berhasil. Kami menerima transfer bank, e-wallet, dan kartu kredit.',
    },
    {
      id: 12,
      category: "billing",
      question: "Apakah ada garansi uang kembali?",
      answer:
        "Ya! Kami menawarkan garansi 30 hari uang kembali untuk semua paket berbayar. Jika tidak puas dengan layanan, hubungi support dalam 30 hari untuk refund penuh tanpa pertanyaan.",
    },
    {
      id: 13,
      category: "security",
      question: "Apakah CV saya aman dan tidak disalahgunakan?",
      answer:
        "Sangat aman! Kami menerapkan Zero Retention Policy: 1) CV hanya digunakan untuk sekali analisis, 2) File dihapus otomatis dalam 1 jam, 3) Tidak ada backup atau salinan, 4) Data dienkripsi AES-256, 5) Server dilindungi firewall enterprise, 6) Compliance dengan GDPR dan ISO 27001.",
    },
    {
      id: 14,
      category: "security",
      question: "Siapa saja yang bisa melihat CV saya?",
      answer:
        "Hanya Anda! Tim kami tidak memiliki akses ke konten CV. Proses analisis sepenuhnya otomatis oleh AI. File CV dihapus setelah analisis, hanya hasil feedback (tanpa konten CV asli) yang disimpan untuk riwayat Anda.",
    },
    {
      id: 15,
      category: "security",
      question: "Bagaimana jika akun saya diretas?",
      answer:
        "Keamanan akun adalah prioritas. Jika mencurigai akun diretas: 1) Segera ubah password, 2) Logout dari semua device, 3) Hubungi support immediately, 4) Cek riwayat login di Settings. Kami akan membantu mengamankan akun dan investigasi aktivitas mencurigakan.",
    },
    {
      id: 16,
      category: "settings",
      question: "Bagaimana cara mengubah password akun?",
      answer:
        'Masuk ke Settings > Ubah Password. Masukkan password lama, password baru (minimal 8 karakter dengan kombinasi huruf, angka, dan simbol), lalu konfirmasi. Klik "Ubah Password" dan Anda akan logout otomatis untuk login ulang dengan password baru.',
    },
    {
      id: 17,
      category: "settings",
      question: "Bisakah saya menghapus riwayat analisis?",
      answer:
        "Ya! Anda bisa: 1) Hapus satu per satu di halaman History dengan klik ikon trash, 2) Hapus semua riwayat di Settings > Hapus Semua Riwayat. Penghapusan bersifat permanen dan tidak bisa dibatalkan, jadi pastikan Anda sudah download laporan yang diperlukan.",
    },
    {
      id: 18,
      category: "settings",
      question: "Bagaimana cara menghapus akun secara permanen?",
      answer:
        "Di Settings > Danger Zone > Hapus Akun. Konfirmasi dengan memasukkan password. Penghapusan akun akan: 1) Hapus semua data pribadi, 2) Hapus riwayat analisis, 3) Cancel subscription aktif, 4) Tidak bisa dibatalkan. Proses selesai dalam 48 jam dan Anda akan menerima konfirmasi email.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>

          <p
            className="text-xl text-cv-text-secondary max-w-2xl mx-auto mb-8"
          >
            Temukan jawaban lengkap untuk semua pertanyaan tentang AI CV Review
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
              <Input
                placeholder="Cari pertanyaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "btn-primary"
                      : "btn-secondary"
                  } flex items-center gap-2`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div>
            {filteredFaqs.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  <HelpCircle className="w-16 h-16 text-cv-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-cv-text-primary mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-cv-text-secondary mb-4">
                    Coba ubah kata kunci pencarian atau pilih kategori lain
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setSearchTerm("")}
                      variant="outline"
                      className="btn-secondary"
                    >
                      Reset Pencarian
                    </Button>
                    <Link href="/contact">
                      <Button className="btn-primary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Hubungi Support
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="mb-4 text-cv-text-secondary text-sm">
                    Menampilkan {filteredFaqs.length} dari {faqs.length}{" "}
                    pertanyaan
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.id}
                        value={`item-${faq.id}`}
                        className="border-cv-text-secondary/20"
                      >
                        <AccordionTrigger className="text-cv-text-primary hover:text-cv-accent text-left">
                          <div className="flex items-start gap-3 w-full">
                            <span className="text-cv-accent text-xs font-medium bg-cv-accent/10 px-2 py-1 rounded-full mt-1 flex-shrink-0">
                              {categories.find((cat) => cat.id === faq.category)
                                ?.name || "FAQ"}
                            </span>
                            <span className="flex-1">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-cv-text-secondary pt-4 pl-16 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Still Need Help */}
          <div
            className="mt-16"
          >
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-cv-text-primary mb-4">
                  Masih Butuh Bantuan?
                </h3>
                <p className="text-cv-text-secondary mb-6 max-w-2xl mx-auto">
                  Jika Anda tidak menemukan jawaban yang dicari, jangan ragu
                  untuk menghubungi tim support kami. Kami siap membantu 24/7!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="btn-primary">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Hubungi Support
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="outline" className="btn-secondary">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Pusat Bantuan
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 text-sm text-cv-text-secondary">
                  <p>
                    📧 Email:{" "}
                    <span className="text-cv-accent">
                      support@aicvreview.com
                    </span>
                  </p>
                  <p>⏱️ Response time: Kurang dari 24 jam</p>
                  <p>💬 Live chat tersedia 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
