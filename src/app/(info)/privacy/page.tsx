"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, Trash2, FileText, Mail } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Privacy() {
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
            Kebijakan <span className="gradient-text">Privasi</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-cv-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Kami berkomitmen melindungi privasi dan keamanan data Anda. Pelajari
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
            pribadi Anda.
          </motion.p>

          <motion.p variants={fadeInUp} className="text-cv-text-secondary mt-4">
            Terakhir diperbarui: 15 Januari 2025
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Data Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <FileText className="w-6 h-6 text-cv-accent" />
                  Data yang Kami Kumpulkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Informasi Akun
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>
                      Nama lengkap dan alamat email yang Anda berikan saat
                      registrasi
                    </li>
                    <li>
                      Password yang dienkripsi dengan standar keamanan tinggi
                    </li>
                    <li>Preferensi pengaturan akun dan notifikasi</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Data Analisis
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>
                      File CV yang Anda upload (hanya untuk sekali proses
                      analisis)
                    </li>
                    <li>Deskripsi pekerjaan yang Anda masukkan</li>
                    <li>Hasil analisis dan feedback yang dihasilkan AI</li>
                    <li>Riwayat analisis untuk referensi Anda</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Data Teknis
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>Alamat IP dan informasi browser untuk keamanan</li>
                    <li>Log aktivitas untuk mencegah penyalahgunaan</li>
                    <li>Cookie untuk meningkatkan pengalaman pengguna</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <Eye className="w-6 h-6 text-cv-accent" />
                  Bagaimana Kami Menggunakan Data Anda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Tujuan Utama
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>Menyediakan layanan analisis CV dengan AI</li>
                    <li>Menyimpan riwayat analisis untuk akses mudah</li>
                    <li>
                      Mengirim notifikasi terkait layanan (jika diaktifkan)
                    </li>
                    <li>Meningkatkan kualitas layanan berdasarkan feedback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Komunikasi
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>Mengirim email konfirmasi dan update penting</li>
                    <li>Memberikan tips karier (jika Anda berlangganan)</li>
                    <li>Menginformasikan fitur baru dan pembaruan layanan</li>
                  </ul>
                </div>

                <div className="bg-cv-accent/5 border border-cv-accent/20 rounded-lg p-4">
                  <p className="text-cv-text-secondary">
                    <strong className="text-cv-accent">Penting:</strong> Kami
                    TIDAK PERNAH menjual, menyewakan, atau membagikan data
                    pribadi Anda kepada pihak ketiga untuk tujuan komersial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <Shield className="w-6 h-6 text-cv-success" />
                  Keamanan Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Enkripsi & Perlindungan
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>Semua data dienkripsi menggunakan standar AES-256</li>
                    <li>Koneksi HTTPS untuk semua komunikasi</li>
                    <li>
                      Server dilindungi dengan firewall tingkat enterprise
                    </li>
                    <li>Monitoring keamanan 24/7 untuk deteksi ancaman</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Akses Terbatas
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>
                      Hanya tim teknis yang berwenang dapat mengakses sistem
                    </li>
                    <li>Semua akses dicatat dan diaudit secara berkala</li>
                    <li>Karyawan menandatangani perjanjian kerahasiaan</li>
                  </ul>
                </div>

                <div className="bg-cv-success/5 border border-cv-success/20 rounded-lg p-4">
                  <p className="text-cv-text-secondary">
                    <strong className="text-cv-success">Sertifikasi:</strong>{" "}
                    Sistem kami mematuhi standar keamanan internasional ISO
                    27001 dan GDPR untuk perlindungan data maksimal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CV File Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-cv-warning/20">
              <CardHeader>
                <CardTitle className="text-cv-warning flex items-center gap-3">
                  <Lock className="w-6 h-6" />
                  Kebijakan Khusus File CV
                </CardTitle>
                <CardDescription className="text-cv-text-secondary">
                  Perlindungan khusus untuk dokumen CV Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-cv-warning/5 border border-cv-warning/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-cv-warning mb-2">
                    Zero Retention Policy
                  </h3>
                  <p className="text-cv-text-secondary mb-3">
                    File CV yang Anda upload TIDAK disimpan secara permanen di
                    server kami.
                  </p>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>
                      File CV hanya digunakan untuk sekali proses analisis
                    </li>
                    <li>
                      Setelah analisis selesai, file langsung dihapus dari
                      server
                    </li>
                    <li>
                      Hanya hasil analisis (teks feedback) yang disimpan untuk
                      riwayat
                    </li>
                    <li>
                      Tidak ada backup atau salinan file CV yang tersimpan
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Proses Analisis
                  </h3>
                  <ol className="list-decimal list-inside text-cv-text-secondary space-y-1">
                    <li>File CV diupload dan dienkripsi</li>
                    <li>AI memproses dan menganalisis konten</li>
                    <li>Hasil analisis disimpan dalam format teks</li>
                    <li>File CV asli dihapus otomatis dalam 1 jam</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <Trash2 className="w-6 h-6 text-cv-accent" />
                  Penyimpanan & Penghapusan Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Periode Penyimpanan
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>
                      <strong>Data Akun:</strong> Selama akun aktif + 30 hari
                      setelah penghapusan
                    </li>
                    <li>
                      <strong>Riwayat Analisis:</strong> Selama akun aktif atau
                      hingga Anda menghapusnya
                    </li>
                    <li>
                      <strong>File CV:</strong> Maksimal 1 jam (dihapus otomatis
                      setelah analisis)
                    </li>
                    <li>
                      <strong>Log Teknis:</strong> 90 hari untuk tujuan keamanan
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                    Hak Penghapusan
                  </h3>
                  <ul className="list-disc list-inside text-cv-text-secondary space-y-1">
                    <li>Anda dapat menghapus riwayat analisis kapan saja</li>
                    <li>Penghapusan akun akan menghapus semua data terkait</li>
                    <li>Permintaan penghapusan diproses dalam 48 jam</li>
                    <li>Konfirmasi penghapusan akan dikirim via email</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <Shield className="w-6 h-6 text-cv-accent" />
                  Hak-Hak Anda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                      Hak Akses
                    </h3>
                    <ul className="list-disc list-inside text-cv-text-secondary space-y-1 text-sm">
                      <li>Melihat data pribadi yang kami simpan</li>
                      <li>Mengunduh riwayat analisis Anda</li>
                      <li>Meminta penjelasan tentang penggunaan data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                      Hak Kontrol
                    </h3>
                    <ul className="list-disc list-inside text-cv-text-secondary space-y-1 text-sm">
                      <li>Mengubah atau memperbarui data pribadi</li>
                      <li>Mengatur preferensi notifikasi</li>
                      <li>Membatasi penggunaan data tertentu</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                      Hak Penghapusan
                    </h3>
                    <ul className="list-disc list-inside text-cv-text-secondary space-y-1 text-sm">
                      <li>Menghapus riwayat analisis tertentu</li>
                      <li>Menghapus seluruh akun dan data</li>
                      <li>Meminta penghapusan data tertentu</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-cv-text-primary mb-2">
                      Hak Portabilitas
                    </h3>
                    <ul className="list-disc list-inside text-cv-text-secondary space-y-1 text-sm">
                      <li>Mengekspor data dalam format standar</li>
                      <li>Memindahkan data ke layanan lain</li>
                      <li>Mendapatkan salinan data pribadi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-cv-text-primary flex items-center gap-3">
                  <Mail className="w-6 h-6 text-cv-accent" />
                  Hubungi Kami
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-cv-text-secondary">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini
                  atau ingin menggunakan hak-hak Anda terkait data pribadi,
                  silakan hubungi kami:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-cv-text-primary mb-2">
                      Data Protection Officer
                    </h3>
                    <p className="text-cv-text-secondary text-sm">
                      Email:{" "}
                      <span className="text-cv-accent">
                        privacy@aicvreview.com
                      </span>
                      <br />
                      Response time: 48 jam kerja
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-cv-text-primary mb-2">
                      Customer Support
                    </h3>
                    <p className="text-cv-text-secondary text-sm">
                      Email:{" "}
                      <span className="text-cv-accent">
                        support@aicvreview.com
                      </span>
                      <br />
                      Response time: 24 jam kerja
                    </p>
                  </div>
                </div>

                <div className="bg-cv-bg-secondary/50 border border-cv-text-secondary/20 rounded-lg p-4">
                  <p className="text-cv-text-secondary text-sm">
                    <strong>Catatan:</strong> Kebijakan privasi ini dapat
                    berubah sewaktu-waktu. Kami akan memberitahu Anda melalui
                    email atau notifikasi di aplikasi jika ada perubahan
                    signifikan.
                  </p>
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
