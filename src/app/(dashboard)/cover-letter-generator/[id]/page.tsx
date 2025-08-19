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
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Copy,
  Download,
  RefreshCw,
  Mail,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  FileText,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function CoverLetterGenerator() {
  const params = useParams();
  const analysisId = params.id;
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState(`Kepada Yth. Tim Rekrutmen,

Saya menulis untuk menyatakan minat saya terhadap posisi Senior Frontend Developer di Tech Startup Indonesia. Dengan pengalaman 6+ tahun dalam pengembangan aplikasi web menggunakan React dan TypeScript, saya yakin dapat memberikan kontribusi signifikan bagi tim Anda.

Dalam peran sebelumnya di PT Digital Solutions, saya berhasil memimpin tim development untuk mengembangkan platform e-commerce yang melayani 100,000+ pengguna aktif. Proyek ini menghasilkan peningkatan conversion rate sebesar 35% dan mengurangi loading time hingga 60%. Keahlian saya dalam React ecosystem, performance optimization, dan modern web technologies sangat selaras dengan requirement yang Anda cari.

Yang membuat saya tertarik dengan posisi ini adalah visi perusahaan untuk menggunakan teknologi dalam menyelesaikan masalah nyata. Pengalaman saya dalam mengimplementasi CI/CD pipeline dan automated testing akan membantu tim dalam mencapai target development yang ambisius. Saya juga memiliki passion dalam mentoring junior developers, yang sejalan dengan budaya kolaboratif yang Anda junjung tinggi.

Saya sangat antusias untuk mendiskusikan bagaimana pengalaman dan keahlian saya dapat berkontribusi pada kesuksesan Tech Startup Indonesia. Terima kasih atas waktu dan pertimbangan Anda.

Hormat saya,
John Doe`);

  const [tips] = useState([
    {
      type: "success",
      title: "Kekuatan Surat Lamaran Ini",
      points: [
        "Menyebutkan nama perusahaan secara spesifik",
        "Menggunakan data kuantitatif (35% conversion rate, 60% loading time)",
        "Menghubungkan pengalaman dengan requirement pekerjaan",
        "Menunjukkan research tentang perusahaan dan budayanya",
      ],
    },
  ]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Surat lamaran baru berhasil dibuat!");
      setIsGenerating(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success("Surat lamaran berhasil disalin!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([coverLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cover-letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Surat lamaran berhasil didownload!");
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header isLoggedIn={true} userName="John Doe" />

      <div className="container-centered py-8">
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
              <Mail className="w-8 h-8 text-cv-warning" />
              <h1 className="text-3xl font-bold text-cv-text-primary">
                Generator Surat Lamaran
              </h1>
            </div>
            <p className="text-cv-text-secondary max-w-2xl mx-auto">
              AI telah membuat draf surat lamaran yang personal dengan
              menggabungkan kekuatan CV Anda dengan requirement dari job
              description yang dianalisis.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3"
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
                    Generate Ulang
                  </>
                )}
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="btn-secondary"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Teks
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download .txt
              </Button>
              <Button variant="outline" className="btn-secondary">
                <Save className="w-4 h-4 mr-2" />
                Simpan Draft
              </Button>
            </motion.div>

            {/* Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card min-h-[600px]">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Draf Surat Lamaran untuk Posisi Senior Frontend Developer
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Edit sesuai kebutuhan Anda. Surat lamaran ini sudah
                    disesuaikan dengan CV dan job description.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[550px] bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary font-mono text-sm leading-relaxed"
                    placeholder="Surat lamaran Anda akan muncul di sini..."
                  />

                  <div className="mt-4 flex items-center justify-between text-sm text-cv-text-secondary">
                    <div className="flex items-center gap-4">
                      <span>📊 {coverLetter.split(" ").length} kata</span>
                      <span>
                        📄 {coverLetter.split("\n\n").length} paragraf
                      </span>
                      <span>
                        ⏱️ ~{Math.ceil(coverLetter.split(" ").length / 200)}{" "}
                        menit baca
                      </span>
                    </div>
                    <div className="text-cv-success">✓ Auto-saved</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Analysis */}
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle
                      className={`text-lg flex items-center gap-2 ${
                        tip.type === "success"
                          ? "text-cv-success"
                          : "text-cv-warning"
                      }`}
                    >
                      {tip.type === "success" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Lightbulb className="w-5 h-5" />
                      )}
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tip.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start gap-2 text-cv-text-secondary text-sm"
                        >
                          {tip.type === "success" ? (
                            <CheckCircle className="w-3 h-3 text-cv-success mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-cv-warning mt-0.5 flex-shrink-0" />
                          )}
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg">
                    💡 Tips Cepat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-cv-text-secondary">
                  <div>
                    <strong className="text-cv-text-primary">
                      Struktur Ideal:
                    </strong>
                    <p>Pembuka → Pengalaman Relevan → Motivasi → Penutup</p>
                  </div>
                  <div>
                    <strong className="text-cv-text-primary">
                      Panjang Optimal:
                    </strong>
                    <p>300-400 kata (1 halaman A4)</p>
                  </div>
                  <div>
                    <strong className="text-cv-text-primary">Tone:</strong>
                    <p>
                      Profesional namun personal, antusias tapi tidak berlebihan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg">
                    🚀 Langkah Selanjutnya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/interview-prep/${analysisId}`}>
                    <Button
                      variant="outline"
                      className="w-full btn-secondary flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Persiapan Wawancara
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
