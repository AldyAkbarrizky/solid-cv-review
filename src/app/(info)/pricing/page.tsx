"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Zap, Crown, Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Pricing() {
  const plans = [
    {
      name: "Gratis",
      price: "Rp 0",
      period: "/bulan",
      description: "Cocok untuk mencoba fitur dasar",
      features: [
        "5 analisis CV per bulan",
        "Skor kecocokan dasar",
        "Feedback umum",
        "Format PDF & DOCX",
        "Support email",
      ],
      limitations: [
        "Tanpa analisis foto CV",
        "Tanpa export laporan",
        "Tanpa riwayat detail",
      ],
      buttonText: "Mulai Gratis",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Professional",
      price: "Rp 99,000",
      period: "/bulan",
      description: "Untuk pencari kerja serius",
      features: [
        "Analisis CV unlimited",
        "Analisis foto CV dengan AI",
        "Feedback mendalam & personal",
        "Export laporan PDF premium",
        "Riwayat analisis lengkap",
        "Template CV yang dioptimasi",
        "Priority support",
      ],
      limitations: [],
      buttonText: "Upgrade Sekarang",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Untuk tim dan perusahaan",
      features: [
        "Semua fitur Professional",
        "Dashboard tim & analytics",
        "Bulk CV analysis",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "24/7 priority support",
      ],
      limitations: [],
      buttonText: "Hubungi Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container-centered">
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
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-2 text-cv-accent bg-cv-accent/10 border-cv-accent/20"
              >
                💎 Paket Berlangganan
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Pilih Paket yang{" "}
              <span className="gradient-text">Tepat untuk Anda</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-cv-text-secondary max-w-3xl mx-auto"
            >
              Dapatkan akses ke fitur-fitur premium dan tingkatkan peluang
              karier Anda
            </motion.p>
          </motion.div>

          {/* Pricing Cards */}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`glass-card h-full relative ${
                    plan.popular ? "ring-2 ring-cv-accent" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-cv-accent text-white px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Paling Populer
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-cv-text-primary mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-cv-text-primary">
                        {plan.price}
                      </span>
                      <span className="text-cv-text-secondary">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription className="text-cv-text-secondary">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-cv-success flex-shrink-0" />
                          <span className="text-cv-text-secondary">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-cv-text-secondary/20">
                        <p className="text-sm font-medium text-cv-text-secondary">
                          Keterbatasan:
                        </p>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div
                            key={limitIndex}
                            className="flex items-center gap-3"
                          >
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-cv-text-secondary/50 rounded-full"></div>
                            </div>
                            <span className="text-cv-text-secondary text-sm">
                              {limitation}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      className={`w-full ${
                        plan.buttonVariant === "default"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                      {plan.name === "Professional" && (
                        <Crown className="ml-2 w-4 h-4" />
                      )}
                      {plan.name === "Gratis" && (
                        <Zap className="ml-2 w-4 h-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-cv-bg-secondary/30">
        <div className="container-centered">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-cv-text-primary mb-4">
              Perbandingan Fitur Lengkap
            </h2>
            <p className="text-cv-text-secondary">
              Lihat perbedaan detail antara setiap paket
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cv-text-secondary/20">
                      <th className="text-left p-4 text-cv-text-primary font-semibold">
                        Fitur
                      </th>
                      <th className="text-center p-4 text-cv-text-primary font-semibold">
                        Gratis
                      </th>
                      <th className="text-center p-4 text-cv-text-primary font-semibold">
                        Professional
                      </th>
                      <th className="text-center p-4 text-cv-text-primary font-semibold">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Analisis CV per bulan", "5", "Unlimited", "Unlimited"],
                      ["Skor kecocokan", "✓", "✓", "✓"],
                      [
                        "Generator ringkasan profesional",
                        "2/bulan",
                        "Unlimited",
                        "Unlimited",
                      ],
                      ["Generator surat lamaran", "✗", "✓", "✓"],
                      ["Persiapan wawancara AI", "✗", "✓", "✓"],
                      ["Feedback detail", "✗", "✓", "✓"],
                      ["Analisis foto CV", "✗", "✓", "✓"],
                      ["Export laporan PDF", "✗", "✓", "✓"],
                      ["Riwayat lengkap", "✗", "✓", "✓"],
                      ["Template CV premium", "✗", "✓", "✓"],
                      ["Dashboard tim", "✗", "✗", "✓"],
                      ["API access", "✗", "✗", "✓"],
                      ["Support 24/7", "✗", "✗", "✓"],
                    ].map(([feature, free, pro, enterprise], index) => (
                      <tr
                        key={index}
                        className="border-b border-cv-text-secondary/10"
                      >
                        <td className="p-4 text-cv-text-secondary">
                          {feature}
                        </td>
                        <td className="p-4 text-center text-cv-text-secondary">
                          {free}
                        </td>
                        <td className="p-4 text-center text-cv-text-secondary">
                          {pro}
                        </td>
                        <td className="p-4 text-center text-cv-text-secondary">
                          {enterprise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-cv-text-primary mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "Bagaimana cara kerja analisis foto CV?",
                answer:
                  "Fitur premium kami menggunakan AI untuk menganalisis layout, design, dan formatting CV Anda secara visual, memberikan saran perbaikan untuk tampilan yang lebih profesional.",
              },
              {
                question: "Apakah data CV saya aman?",
                answer:
                  "Ya, sangat aman. Kami tidak menyimpan CV Anda secara permanen. File hanya digunakan untuk sekali analisis dan kemudian dihapus dari server kami.",
              },
              {
                question: "Bisakah saya upgrade atau downgrade kapan saja?",
                answer:
                  "Tentu saja! Anda bisa mengubah paket berlangganan kapan saja melalui pengaturan akun. Perubahan akan berlaku pada periode billing berikutnya.",
              },
              {
                question: "Apakah ada garansi uang kembali?",
                answer:
                  "Ya, kami menawarkan garansi 30 hari uang kembali untuk semua paket berbayar. Jika tidak puas, Anda bisa meminta refund penuh.",
              },
            ].map((faq, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-cv-text-primary mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-cv-text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
