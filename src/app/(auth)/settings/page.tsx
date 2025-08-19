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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Crown,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    analysisComplete: true,
    weeklyTips: false,
    promotions: true,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Profil berhasil diperbarui!");
      setIsLoading(false);
    }, 1500);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast.error("Password baru tidak cocok!");
      return;
    }

    if (profileData.newPassword.length < 8) {
      toast.error("Password minimal 8 karakter!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Password berhasil diubah!");
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [key]: value,
    });
    toast.success("Pengaturan notifikasi diperbarui!");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      toast.error("Fitur hapus akun akan segera tersedia.");
    }
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header isLoggedIn={true} userName="John Doe" />

      <div className="container-centered py-8">
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
          <motion.h1
            variants={fadeInUp}
            className="text-3xl font-bold text-cv-text-primary mb-2"
          >
            Pengaturan Akun
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-cv-text-secondary">
            Kelola profil dan preferensi akun Anda
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-2">
                    <User className="w-5 h-5 text-cv-accent" />
                    Informasi Profil
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Perbarui informasi dasar akun Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cv-text-primary">
                        Nama Lengkap
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cv-text-primary">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary"
                      disabled={isLoading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Password Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cv-accent" />
                    Ubah Password
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Pastikan akun Anda tetap aman dengan password yang kuat
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-cv-text-primary"
                      >
                        Password Saat Ini
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={profileData.currentPassword}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-cv-text-primary"
                      >
                        Password Baru
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={profileData.newPassword}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              newPassword: e.target.value,
                            })
                          }
                          className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-cv-text-primary"
                      >
                        Konfirmasi Password Baru
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={profileData.confirmPassword}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary"
                      disabled={isLoading}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {isLoading ? "Mengubah..." : "Ubah Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary flex items-center gap-2">
                    <Bell className="w-5 h-5 text-cv-accent" />
                    Pengaturan Notifikasi
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Pilih notifikasi yang ingin Anda terima
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-cv-text-primary">
                        Email Updates
                      </Label>
                      <p className="text-sm text-cv-text-secondary">
                        Terima update penting tentang akun Anda
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailUpdates}
                      onCheckedChange={(value) =>
                        handleNotificationChange("emailUpdates", value)
                      }
                    />
                  </div>

                  <Separator className="bg-cv-text-secondary/20" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-cv-text-primary">
                        Analisis Selesai
                      </Label>
                      <p className="text-sm text-cv-text-secondary">
                        Notifikasi ketika analisis CV selesai
                      </p>
                    </div>
                    <Switch
                      checked={notifications.analysisComplete}
                      onCheckedChange={(value) =>
                        handleNotificationChange("analysisComplete", value)
                      }
                    />
                  </div>

                  <Separator className="bg-cv-text-secondary/20" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-cv-text-primary">
                        Tips Mingguan
                      </Label>
                      <p className="text-sm text-cv-text-secondary">
                        Dapatkan tips karier dan CV setiap minggu
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyTips}
                      onCheckedChange={(value) =>
                        handleNotificationChange("weeklyTips", value)
                      }
                    />
                  </div>

                  <Separator className="bg-cv-text-secondary/20" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-cv-text-primary">
                        Promosi & Penawaran
                      </Label>
                      <p className="text-sm text-cv-text-secondary">
                        Informasi tentang fitur baru dan penawaran khusus
                      </p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(value) =>
                        handleNotificationChange("promotions", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card border-cv-error/20">
                <CardHeader>
                  <CardTitle className="text-cv-error flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-cv-text-secondary">
                    Tindakan yang tidak dapat dibatalkan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-cv-error/5 border border-cv-error/20 rounded-lg">
                      <h4 className="text-cv-error font-medium mb-2">
                        Hapus Akun
                      </h4>
                      <p className="text-cv-text-secondary text-sm mb-4">
                        Menghapus akun akan menghilangkan semua data Anda secara
                        permanen, termasuk riwayat analisis dan pengaturan.
                        Tindakan ini tidak dapat dibatalkan.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        className="bg-cv-error hover:bg-cv-error/90"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Akun
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg">
                    Status Akun
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-3 px-3 py-1">
                      Akun Gratis
                    </Badge>
                    <p className="text-cv-text-secondary text-sm">
                      Sisa analisis bulan ini:{" "}
                      <span className="text-cv-accent font-medium">3/5</span>
                    </p>
                  </div>
                  <Button className="w-full btn-primary">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade ke Pro
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cv-success" />
                    Keamanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cv-text-secondary text-sm">
                      Email Terverifikasi
                    </span>
                    <Badge className="bg-cv-success/10 text-cv-success border-cv-success/20">
                      ✓ Ya
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-text-secondary text-sm">
                      Password Terakhir Diubah
                    </span>
                    <span className="text-cv-text-secondary text-sm">
                      30 hari lalu
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-text-secondary text-sm">
                      Login Terakhir
                    </span>
                    <span className="text-cv-text-secondary text-sm">
                      Hari ini
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Billing Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-cv-accent" />
                    Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-cv-text-secondary text-sm">
                    Anda saat ini menggunakan paket gratis. Upgrade untuk
                    mendapatkan fitur premium.
                  </p>
                  <Button variant="outline" className="w-full btn-secondary">
                    Lihat Riwayat Tagihan
                  </Button>
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
