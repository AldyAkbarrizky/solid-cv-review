import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { SESSION_EXPIRED_MESSAGE, setAuthToken } from "@/lib/auth-client";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isCheckingAuth, refreshSession } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "password_reset_success") {
      toast.success("Password berhasil direset! Silakan masuk.");
    } else if (message === SESSION_EXPIRED_MESSAGE) {
      const infoMessage = "Sesi login Anda berakhir, silakan login kembali.";
      toast.info(infoMessage);
      setStatusMessage({ type: "info", text: infoMessage });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({
      type: "info",
      text: "Sedang memverifikasi kredensial Anda...",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      const token = result?.data?.token ?? result?.token;
      const expiresIn = result?.data?.expiresIn ?? result?.expiresIn;

      if (response.ok && token) {
        setAuthToken(token, expiresIn);
        const successMessage =
          result?.data?.message || result.message || "Login berhasil!";
        toast.success(successMessage);
        setStatusMessage({ type: "success", text: successMessage });
        const userData: any = await refreshSession();

        if (userData) {
          const redirectTo = searchParams.get("from") || "/dashboard";
          router.replace(redirectTo);
          router.refresh();
        }
      } else {
        const errorMsg =
          result?.message || "Login gagal. Silakan cek kredensial Anda.";
        toast.error(errorMsg);
        setStatusMessage({ type: "error", text: errorMsg });
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMsg = "Terjadi kesalahan. Silakan coba lagi.";
      toast.error(errorMsg);
      setStatusMessage({ type: "error", text: errorMsg });
    } finally {
      setIsLoading(false);
      setStatusMessage((current) =>
        current?.type === "info" ? null : current
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-narrow w-full">
      <div className="mx-auto max-w-md">
        <Card className="glass-card py-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-cv-text-primary">
              Masuk ke Akun Anda
            </CardTitle>
            <CardDescription className="text-cv-text-secondary">
              Masukkan email dan password Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {statusMessage && (
                <div
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    statusMessage.type === "error"
                      ? "border-cv-error/40 bg-cv-error/10 text-cv-error"
                      : statusMessage.type === "success"
                      ? "border-cv-success/40 bg-cv-success/10 text-cv-success"
                      : "border-cv-text-secondary/30 bg-cv-bg-secondary/60 text-cv-text-secondary"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-cv-text-primary">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-cv-text-primary">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-cv-text-secondary" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-cv-bg-secondary border-cv-text-secondary/30 text-cv-text-primary placeholder:text-cv-text-secondary/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-cv-text-secondary hover:text-cv-text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-cv-accent hover:underline block text-right"
              >
                Lupa Password?
              </Link>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Memuat..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-cv-text-secondary">
              Belum punya akun?{" "}
              <Link href="/register" className="text-cv-accent hover:underline">
                Daftar Sekarang
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
