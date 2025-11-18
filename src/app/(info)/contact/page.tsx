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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/layout/Header"; // Removed import
import Footer from "@/components/layout/Footer"; // Removed import
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  Bug,
  CreditCard,
  Star,
  Users,
  Zap,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(
        "Pesan Anda berhasil dikirim! Kami akan merespons dalam 24 jam."
      );
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Email untuk pertanyaan umum",
      contact: "support@aicvreview.com",
      responseTime: "< 24 jam",
      color: "text-cv-accent",
    },
    {
      icon: Phone,
      title: "WhatsApp Business",
      description: "Hubungi via WhatsApp",
      contact: "+62 812-3456-7890",
      responseTime: "< 1 jam",
      color: "text-cv-warning",
    },
  ];

  const categories = [
    { value: "general", label: "Pertanyaan Umum", icon: HelpCircle },
    { value: "technical", label: "Masalah Teknis", icon: Bug },
    { value: "billing", label: "Billing & Pembayaran", icon: CreditCard },
    { value: "feedback", label: "Feedback & Saran", icon: Star },
    { value: "partnership", label: "Kemitraan", icon: Users },
    { value: "feature", label: "Request Fitur", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-cv-bg-primary flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container-centered py-20">
          {/* Header */}
          <div
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Hubungi <span className="gradient-text">Tim Kami</span>
            </h1>

            <p
              className="text-xl text-cv-text-secondary max-w-3xl mx-auto leading-relaxed"
            >
              Ada pertanyaan, masalah, atau saran? Tim support kami siap
              membantu Anda 24/7. Pilih cara komunikasi yang paling nyaman untuk
              Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cv-text-primary text-2xl">
                      Kirim Pesan
                    </CardTitle>
                    <CardDescription className="text-cv-text-secondary">
                      Isi form di bawah ini dan kami akan merespons secepat
                      mungkin
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-cv-text-primary"
                          >
                            Nama Lengkap
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            className="bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                            placeholder="Masukkan nama lengkap"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-cv-text-primary"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className="bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                            placeholder="nama@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="category"
                          className="text-cv-text-primary"
                        >
                          Kategori
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value: any) =>
                            handleChange("category", value)
                          }
                        >
                          <SelectTrigger className="bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary">
                            <SelectValue placeholder="Pilih kategori pertanyaan" />
                          </SelectTrigger>
                          <SelectContent className="bg-cv-bg-secondary border-cv-text-secondary/30">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                                className="text-cv-text-primary focus:bg-cv-accent/10"
                              >
                                <div className="flex items-center gap-2">
                                  <category.icon className="w-4 h-4" />
                                  {category.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-cv-text-primary"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            handleChange("subject", e.target.value)
                          }
                          className="bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                          placeholder="Ringkasan singkat masalah atau pertanyaan"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-cv-text-primary"
                        >
                          Pesan
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          className="min-h-[156px] bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                          placeholder="Jelaskan pertanyaan atau masalah Anda secara detail..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Methods & Info */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cv-text-primary">
                      Cara Lain Menghubungi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-cv-bg-secondary/50 rounded-lg border border-cv-text-secondary/10"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-cv-bg-secondary ${method.color}`}
                        >
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-cv-text-primary">
                            {method.title}
                          </h4>
                          <p className="text-sm text-cv-text-secondary mb-1">
                            {method.description}
                          </p>
                          <p className="text-sm font-medium text-cv-accent">
                            {method.contact}
                          </p>
                          <p className="text-xs text-cv-text-secondary/70 mt-1">
                            Waktu Respons: {method.responseTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Office Info */}
              <div>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-cv-text-primary">
                      Info Kantor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-cv-accent mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium text-cv-text-primary">
                          Alamat
                        </h4>
                        <p className="text-sm text-cv-text-secondary">
                          Jl. Digital No. 123, Cyber Tower Lt. 10, Jakarta,
                          Indonesia 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-cv-accent mt-1 shrink-0" />
                      <div>
                        <h4 className="font-medium text-cv-text-primary">
                          Jam Operasional
                        </h4>
                        <p className="text-sm text-cv-text-secondary">
                          Senin - Jumat: 09:00 - 17:00 WIB
                        </p>
                        <p className="text-sm text-cv-text-secondary">
                          Sabtu & Minggu: Tutup
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
