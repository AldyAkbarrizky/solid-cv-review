"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
import { authFetch } from "@/lib/auth-client";
import { useAuth } from "@/context/auth-context";

type StatusMessage = {
  type: "success" | "error" | "info";
  text: string;
};

type NotificationSettings = {
  emailUpdates: boolean;
  analysisComplete: boolean;
  weeklyTips: boolean;
  promotions: boolean;
};

type AccountInfo = {
  plan: string;
  usage: {
    limit: number;
    used: number;
  };
  emailVerified: boolean;
  lastPasswordChange?: string | null;
  lastLoginAt?: string | null;
};

export default function Settings() {
  const { refreshSession } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailUpdates: true,
    analysisComplete: true,
    weeklyTips: false,
    promotions: true,
  });

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    plan: "Akun Gratis",
    usage: {
      limit: 5,
      used: 0,
    },
    emailVerified: true,
    lastPasswordChange: null,
    lastLoginAt: null,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notificationLoadingKey, setNotificationLoadingKey] = useState<
    keyof NotificationSettings | null
  >(null);
  const [isFetching, setIsFetching] = useState(true);
  const [pageStatus, setPageStatus] = useState<StatusMessage | null>(null);
  const [profileStatus, setProfileStatus] = useState<StatusMessage | null>(
    null
  );
  const [passwordStatus, setPasswordStatus] = useState<StatusMessage | null>(
    null
  );
  const [notificationStatus, setNotificationStatus] =
    useState<StatusMessage | null>(null);

  const formatDate = (value?: string | null) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const remainingAnalyses = Math.max(
    accountInfo.usage.limit - accountInfo.usage.used,
    0
  );
  const usageLabel = `${remainingAnalyses}/${accountInfo.usage.limit}`;

  const isProfileDisabled = isFetching || profileLoading;
  const isPasswordDisabled = isFetching || passwordLoading;

  const loadSettings = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await authFetch("/settings/me");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal memuat pengaturan.");
      }

      const user = result.data?.user;
      const prefs = result.data?.notifications;
      const account = result.data?.account;

      setProfileData((prev) => ({
        ...prev,
        name: user?.name ?? "",
        email: user?.email ?? "",
      }));

      setNotifications({
        emailUpdates: Boolean(prefs?.emailUpdates),
        analysisComplete: Boolean(prefs?.analysisComplete),
        weeklyTips: Boolean(prefs?.weeklyTips),
        promotions: Boolean(prefs?.promotions),
      });

      setAccountInfo({
        plan: account?.plan ?? "Akun Gratis",
        usage: {
          limit: account?.usage?.limit ?? 5,
          used: account?.usage?.used ?? 0,
        },
        emailVerified: account?.emailVerified ?? true,
        lastPasswordChange: account?.lastPasswordChange ?? null,
        lastLoginAt: account?.lastLoginAt ?? null,
      });
    } catch (error: any) {
      console.error("Failed to load settings:", error);
      const msg = error?.message || "Gagal memuat pengaturan.";
      setPageStatus({ type: "error", text: msg });
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileStatus({
      type: "info",
      text: "Menyimpan perubahan profil...",
    });

    try {
      const response = await authFetch("/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal memperbarui profil.");
      }

      const msg = result?.data?.message || "Profil berhasil diperbarui!";
      setProfileStatus({ type: "success", text: msg });
      await refreshSession();
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      const msg = error?.message || "Gagal memperbarui profil.";
      setProfileStatus({ type: "error", text: msg });
    } finally {
      setProfileLoading(false);
      setProfileStatus((current) =>
        current?.type === "info" ? null : current
      );
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profileData.newPassword !== profileData.confirmPassword) {
      const msg = "Password baru tidak cocok!";
      setPasswordStatus({ type: "error", text: msg });
      return;
    }

    if (profileData.newPassword.length < 8) {
      const msg = "Password minimal 8 karakter!";
      setPasswordStatus({ type: "error", text: msg });
      return;
    }

    setPasswordLoading(true);
    setPasswordStatus({
      type: "info",
      text: "Memvalidasi password Anda...",
    });

    try {
      const response = await authFetch("/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: profileData.currentPassword,
          newPassword: profileData.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal mengubah password.");
      }

      const msg =
        result?.data?.message || "Password berhasil diubah!";
      setPasswordStatus({ type: "success", text: msg });
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Failed to update password:", error);
      const msg = error?.message || "Gagal mengubah password.";
      setPasswordStatus({ type: "error", text: msg });
    } finally {
      setPasswordLoading(false);
      setPasswordStatus((current) =>
        current?.type === "info" ? null : current
      );
    }
  };

  const handleNotificationChange = async (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    const previousValue = notifications[key];
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
    setNotificationLoadingKey(key);
    setNotificationStatus({
      type: "info",
      text: "Menyimpan pengaturan notifikasi...",
    });

    try {
      const response = await authFetch("/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [key]: value }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal memperbarui notifikasi.");
      }

      const msg =
        result?.data?.message || "Pengaturan notifikasi diperbarui!";
      setNotificationStatus({ type: "success", text: msg });
    } catch (error: any) {
      console.error("Failed to update notification preference:", error);
      setNotifications((prev) => ({
        ...prev,
        [key]: previousValue,
      }));
      const msg = error?.message || "Gagal memperbarui notifikasi.";
      setNotificationStatus({ type: "error", text: msg });
    }
    setNotificationLoadingKey(null);
    setNotificationStatus((current) =>
      current?.type === "info" ? null : current
    );
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      setPageStatus({
        type: "info",
        text: "Fitur hapus akun akan segera tersedia.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cv-bg-primary">
      <Header />

      <div className="container-centered py-8">
        {/* Header */}
        <div
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold text-cv-text-primary mb-2"
          >
            Pengaturan Akun
          </h1>
          <p className="text-cv-text-secondary">
            Kelola profil dan preferensi akun Anda
          </p>
        </div>

        {isFetching && (
          <div className="mb-6 rounded-xl border border-cv-text-secondary/20 bg-cv-bg-secondary/40 px-4 py-3 text-sm text-cv-text-secondary">
            Memuat pengaturan akun...
          </div>
        )}

        {(!accountInfo.emailVerified && !isFetching) && (
          <div className="mb-6 rounded-xl border border-cv-warning/40 bg-cv-warning/10 px-4 py-3 text-sm text-cv-warning flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <span>
              Email Anda belum diverifikasi. Silakan cek inbox dan lakukan verifikasi
              untuk membuka semua fitur.
            </span>
            <Link
              href="/verify-email?status=pending"
              className="text-cv-warning underline"
            >
              Buka Halaman Verifikasi
            </Link>
          </div>
        )}

        {pageStatus && (
          <div
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              pageStatus.type === "error"
                ? "border-cv-error/30 bg-cv-error/10 text-cv-error"
                : pageStatus.type === "success"
                ? "border-cv-success/30 bg-cv-success/10 text-cv-success"
                : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
            }`}
          >
            {pageStatus.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <div>
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
                    {profileStatus && (
                      <div
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          profileStatus.type === "error"
                            ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                            : profileStatus.type === "success"
                            ? "border-cv-success/40 bg-cv-success/10 text-cv-success"
                            : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
                        }`}
                      >
                        {profileStatus.text}
                      </div>
                    )}
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
                          disabled={isProfileDisabled}
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
                          disabled={isProfileDisabled}
                          className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary"
                        />
                      </div>
                    </div>

                      <Button
                        type="submit"
                        className="btn-primary"
                        disabled={isProfileDisabled}
                      >
                      <Save className="w-4 h-4 mr-2" />
                      {profileLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Password Settings */}
            <div>
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
                    {passwordStatus && (
                      <div
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          passwordStatus.type === "error"
                            ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                            : passwordStatus.type === "success"
                            ? "border-cv-success/40 bg-cv-success/10 text-cv-success"
                            : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
                        }`}
                      >
                        {passwordStatus.text}
                      </div>
                    )}
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
                          disabled={isPasswordDisabled}
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
                          disabled={isPasswordDisabled}
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
                          disabled={isPasswordDisabled}
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
                      disabled={isPasswordDisabled}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {passwordLoading ? "Mengubah..." : "Ubah Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Notification Settings */}
            <div>
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
                      disabled={
                        isFetching || notificationLoadingKey === "emailUpdates"
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
                      disabled={
                        isFetching ||
                        notificationLoadingKey === "analysisComplete"
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
                      disabled={
                        isFetching ||
                        notificationLoadingKey === "weeklyTips"
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
                      disabled={
                        isFetching ||
                        notificationLoadingKey === "promotions"
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <div>
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-cv-text-primary text-lg">
                    Status Akun
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notificationStatus && (
                    <div
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        notificationStatus.type === "error"
                          ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                          : notificationStatus.type === "success"
                          ? "border-cv-success/40 bg-cv-success/10 text-cv-success"
                          : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
                      }`}
                    >
                      {notificationStatus.text}
                    </div>
                  )}
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-3 px-3 py-1">
                      {accountInfo.plan}
                    </Badge>
                    <p className="text-cv-text-secondary text-sm">
                      Sisa analisis bulan ini:{" "}
                      <span className="text-cv-accent font-medium">
                        {usageLabel}
                      </span>
                    </p>
                  </div>
                  <Button className="w-full btn-primary">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade ke Pro
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Security Info */}
            <div>
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
                      {accountInfo.emailVerified ? "✓ Ya" : "Belum"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-text-secondary text-sm">
                      Password Terakhir Diubah
                    </span>
                    <span className="text-cv-text-secondary text-sm">
                      {formatDate(accountInfo.lastPasswordChange)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-text-secondary text-sm">
                      Login Terakhir
                    </span>
                    <span className="text-cv-text-secondary text-sm">
                      {formatDate(accountInfo.lastLoginAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing Info */}
            <div>
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
