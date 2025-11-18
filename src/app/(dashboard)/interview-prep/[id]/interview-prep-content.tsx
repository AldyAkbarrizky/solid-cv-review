"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Brain,
  Code,
  MessageSquare,
  RefreshCw,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function InterviewPrepContent() {
  const params = useParams();
  const analysisId = params.id;
  const [isGenerating, setIsGenerating] = useState(false);

  const questionCategories = [
    {
      id: "behavioral",
      title: "Pertanyaan Perilaku (Behavioral)",
      icon: Users,
      color: "text-cv-accent",
      description:
        "Pertanyaan tentang pengalaman kerja dan situasi yang pernah dihadapi",
      questions: [
        {
          id: 1,
          question:
            "Ceritakan tentang proyek yang paling menantang yang pernah Anda kerjakan.",
          goodAnswer: {
            structure: "Gunakan metode STAR (Situation, Task, Action, Result)",
            keyPoints: [
              "Jelaskan konteks proyek dan mengapa menantang",
              "Sebutkan peran spesifik Anda dalam proyek",
              "Detail tindakan konkret yang Anda ambil",
              "Quantify hasil yang dicapai (angka, persentase, impact)",
            ],
            example:
              "Saat memimpin pengembangan platform e-commerce, kami menghadapi deadline ketat 3 bulan dengan tim baru. Saya mengorganisir sprint planning, implementasi CI/CD, dan berhasil deliver tepat waktu dengan 99.9% uptime.",
          },
          badAnswer: {
            examples: [
              "Semua proyek saya menantang, sulit memilih satu.",
              "Proyek tersulit adalah ketika rekan kerja tidak kooperatif.",
              "Saya tidak pernah menghadapi proyek yang benar-benar sulit.",
            ],
            whyBad: [
              "Tidak spesifik dan tidak memberikan insight tentang kemampuan",
              "Menyalahkan orang lain menunjukkan kurangnya ownership",
              "Terkesan kurang pengalaman atau tidak jujur",
            ],
          },
        },
        {
          id: 2,
          question: "Bagaimana Anda menangani konflik dalam tim?",
          goodAnswer: {
            structure: "Fokus pada resolusi dan pembelajaran",
            keyPoints: [
              "Tunjukkan kemampuan komunikasi dan empati",
              "Jelaskan pendekatan sistematis dalam menyelesaikan konflik",
              "Sebutkan hasil positif dari penanganan konflik",
              "Demonstrasikan growth mindset",
            ],
            example:
              "Ketika ada perbedaan pendapat tentang arsitektur sistem, saya mengadakan meeting khusus, mendengarkan semua perspektif, dan memfasilitasi diskusi teknis yang objektif hingga mencapai konsensus.",
          },
          badAnswer: {
            examples: [
              "Saya menghindari konflik sebisa mungkin.",
              "Biasanya saya yang benar, jadi saya tegaskan posisi saya.",
              "Saya laporkan ke manager untuk diselesaikan.",
            ],
            whyBad: [
              "Menunjukkan kurangnya leadership dan problem-solving skills",
              "Terkesan arogan dan tidak kolaboratif",
              "Tidak menunjukkan inisiatif dan kemampuan resolusi mandiri",
            ],
          },
        },
      ],
    },
    {
      id: "technical",
      title: "Pertanyaan Teknis",
      icon: Code,
      color: "text-cv-success",
      description: "Pertanyaan tentang keahlian teknis dan implementasi",
      questions: [
        {
          id: 3,
          question:
            "Jelaskan perbedaan antara React hooks dan class components, dan kapan menggunakan masing-masing.",
          goodAnswer: {
            structure: "Berikan penjelasan teknis yang jelas dan praktis",
            keyPoints: [
              "Jelaskan konsep dasar dengan akurat",
              "Berikan contoh use case yang relevan",
              "Sebutkan pros dan cons masing-masing",
              "Tunjukkan pemahaman tentang best practices",
            ],
            example:
              "Hooks memungkinkan functional components menggunakan state dan lifecycle. Hooks lebih concise, mudah di-test, dan mendukung custom hooks untuk reusability. Class components masih berguna untuk error boundaries dan legacy code.",
          },
          badAnswer: {
            examples: [
              "Hooks lebih baru jadi lebih baik dari class components.",
              "Saya selalu pakai hooks karena lebih simple.",
              "Tidak ada perbedaan signifikan, hanya syntax yang beda.",
            ],
            whyBad: [
              "Oversimplifikasi tanpa pemahaman mendalam",
              "Tidak menunjukkan pertimbangan teknis yang matang",
              "Salah secara faktual dan menunjukkan kurangnya pemahaman",
            ],
          },
        },
      ],
    },
    {
      id: "company",
      title: "Pertanyaan Spesifik Perusahaan",
      icon: Target,
      color: "text-cv-warning",
      description: "Pertanyaan tentang motivasi dan pengetahuan perusahaan",
      questions: [
        {
          id: 4,
          question: "Mengapa Anda tertarik bekerja di perusahaan kami?",
          goodAnswer: {
            structure: "Tunjukkan research dan alignment yang genuine",
            keyPoints: [
              "Sebutkan aspek spesifik perusahaan yang menarik",
              "Hubungkan dengan career goals dan values pribadi",
              "Tunjukkan pemahaman tentang industri dan kompetitor",
              "Jelaskan kontribusi yang bisa diberikan",
            ],
            example:
              "Saya tertarik dengan visi perusahaan dalam democratizing financial services. Pengalaman saya dalam fintech dan passion untuk inclusive technology sejalan dengan mission ini. Saya ingin berkontribusi dalam scaling platform yang impact-nya langsung terasa masyarakat.",
          },
          badAnswer: {
            examples: [
              "Perusahaan ini terkenal dan gaji yang ditawarkan menarik.",
              "Saya butuh pekerjaan dan posisi ini sesuai skill saya.",
              "Lokasi kantor dekat dengan rumah saya.",
            ],
            whyBad: [
              "Fokus pada benefit pribadi, bukan value yang bisa diberikan",
              "Terkesan desperate dan tidak selective",
              "Alasan yang superficial dan tidak menunjukkan commitment",
            ],
          },
        },
      ],
    },
  ];

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      toast.success("Pertanyaan wawancara baru berhasil dibuat!");
      setIsGenerating(false);
    }, 2000);
  };

  const getCategoryIcon = (category: any) => {
    const IconComponent = category.icon;
    return <IconComponent className={`w-5 h-5 ${category.color}`} />;
  };

  return (
    <div className="container-wide py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href={`/analysis/${analysisId}`}>
          <Button variant="outline" className="btn-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Hasil Analisis
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-cv-success" />
            <h1 className="text-3xl font-bold text-cv-text-primary">
              Persiapan Wawancara AI
            </h1>
          </div>
          <p className="text-cv-text-secondary max-w-3xl mx-auto">
            AI telah menyiapkan pertanyaan wawancara yang disesuaikan dengan
            posisi Senior Frontend Developer dan CV Anda. Setiap pertanyaan
            dilengkapi dengan panduan jawaban yang baik dan contoh yang harus
            dihindari.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="btn-primary"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Membuat Pertanyaan Baru...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Pertanyaan Baru
              </>
            )}
          </Button>
          <Button variant="outline" className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Download Panduan PDF
          </Button>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {questionCategories.map((category, index) => (
            <Card key={category.id} className="glass-card">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getCategoryIcon(category)}
                </div>
                <CardTitle className="text-cv-text-primary text-lg">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-cv-text-secondary text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-cv-accent/10 text-cv-accent border-cv-accent/20"
                >
                  {category.questions.length} Pertanyaan
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Questions by Category */}
        <div className="space-y-8">
          {questionCategories.map((category, categoryIndex) => (
            <div key={category.id}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-3">
                    {getCategoryIcon(category)}
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((q, qIndex) => (
                      <AccordionItem
                        key={q.id}
                        value={`question-${q.id}`}
                        className="border-cv-text-secondary/20"
                      >
                        <AccordionTrigger className="text-cv-text-primary hover:text-cv-accent text-left">
                          <div className="flex items-start gap-3">
                            <Badge
                              variant="secondary"
                              className="bg-cv-accent/10 text-cv-accent border-cv-accent/20 mt-1"
                            >
                              Q{qIndex + 1}
                            </Badge>
                            <span className="flex-1">{q.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-6 space-y-6">
                          {/* Good Answer Section */}
                          <div className="bg-cv-success/5 border border-cv-success/20 rounded-lg p-6">
                            <h4 className="text-cv-success font-semibold mb-4 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5" />✅ Panduan
                              Jawaban yang Baik
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <h5 className="text-cv-text-primary font-medium mb-2">
                                  Struktur Jawaban:
                                </h5>
                                <p className="text-cv-text-secondary text-sm">
                                  {q.goodAnswer.structure}
                                </p>
                              </div>

                              <div>
                                <h5 className="text-cv-text-primary font-medium mb-2">
                                  Poin-poin Kunci:
                                </h5>
                                <ul className="space-y-1">
                                  {q.goodAnswer.keyPoints.map(
                                    (point, pointIndex) => (
                                      <li
                                        key={pointIndex}
                                        className="flex items-start gap-2 text-cv-text-secondary text-sm"
                                      >
                                        <CheckCircle className="w-3 h-3 text-cv-success mt-0.5 flex-shrink-0" />
                                        {point}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h5 className="text-cv-text-primary font-medium mb-2">
                                  Contoh Jawaban:
                                </h5>
                                <div className="bg-cv-bg-secondary/50 border border-cv-text-secondary/20 rounded p-3">
                                  <p className="text-cv-text-secondary text-sm italic">
                                    "{q.goodAnswer.example}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bad Answer Section */}
                          <div className="bg-cv-error/5 border border-cv-error/20 rounded-lg p-6">
                            <h4 className="text-cv-error font-semibold mb-4 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5" />❌ Contoh
                              Jawaban yang Harus Dihindari
                            </h4>

                            <div className="space-y-4">
                              <div>
                                <h5 className="text-cv-text-primary font-medium mb-2">
                                  Contoh Jawaban Buruk:
                                </h5>
                                <ul className="space-y-2">
                                  {q.badAnswer.examples.map(
                                    (example, exampleIndex) => (
                                      <li
                                        key={exampleIndex}
                                        className="bg-cv-bg-secondary/50 border border-cv-error/20 rounded p-2"
                                      >
                                        <p className="text-cv-text-secondary text-sm italic">
                                          "{example}"
                                        </p>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h5 className="text-cv-text-primary font-medium mb-2">
                                  Mengapa Jawaban Ini Buruk:
                                </h5>
                                <ul className="space-y-1">
                                  {q.badAnswer.whyBad.map(
                                    (reason, reasonIndex) => (
                                      <li
                                        key={reasonIndex}
                                        className="flex items-start gap-2 text-cv-text-secondary text-sm"
                                      >
                                        <AlertTriangle className="w-3 h-3 text-cv-error mt-0.5 flex-shrink-0" />
                                        {reason}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* General Tips */}
        <div className="mt-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-cv-text-primary flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-cv-warning" />
                💡 Tips Umum Wawancara
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-cv-success mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Do's (Yang Harus Dilakukan)
                  </h4>
                  <ul className="space-y-2 text-cv-text-secondary text-sm">
                    <li>• Riset perusahaan dan industri secara mendalam</li>
                    <li>• Siapkan pertanyaan untuk pewawancara</li>
                    <li>• Gunakan metode STAR untuk pertanyaan behavioral</li>
                    <li>• Berikan contoh konkret dengan data/angka</li>
                    <li>• Tunjukkan antusiasme dan curiosity</li>
                    <li>• Follow up dengan thank you email</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cv-error mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Don'ts (Yang Harus Dihindari)
                  </h4>
                  <ul className="space-y-2 text-cv-text-secondary text-sm">
                    <li>• Datang terlambat atau tidak prepared</li>
                    <li>• Berbicara negatif tentang employer sebelumnya</li>
                    <li>• Memberikan jawaban yang terlalu umum</li>
                    <li>• Fokus hanya pada salary dan benefit</li>
                    <li>• Tidak mengajukan pertanyaan balik</li>
                    <li>• Berbohong atau melebih-lebihkan pengalaman</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-cv-text-primary">
                🚀 Setelah Persiapan Wawancara
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 btn-secondary flex items-center gap-3"
                >
                  <Brain className="w-6 h-6 text-cv-accent" />
                  <div className="text-left">
                    <div className="font-medium text-cv-text-primary">
                      Mock Interview
                    </div>
                    <div className="text-xs text-cv-text-secondary">
                      Latihan wawancara dengan AI (Coming Soon)
                    </div>
                  </div>
                </Button>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 btn-secondary flex items-center gap-3"
                  >
                    <MessageSquare className="w-6 h-6 text-cv-success" />
                    <div className="text-left">
                      <div className="font-medium text-cv-text-primary">
                        Analisis CV Baru
                      </div>
                      <div className="text-xs text-cv-text-secondary">
                        Mulai analisis untuk posisi lain
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
