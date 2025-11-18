"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isCheckingAuth, logout, user } = useAuth();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-cv-text-secondary/20 bg-cv-bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-cv-bg-primary/60"
    >
      <div className="container-centered flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold gradient-text"
          >
            Solid CV Review
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isCheckingAuth ? (
            <div className="h-8 w-32 rounded-full bg-cv-bg-secondary/60 animate-pulse" />
          ) : isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-cv-text-secondary hover:text-cv-text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/history"
                className="text-cv-text-secondary hover:text-cv-text-primary transition-colors"
              >
                Riwayat
              </Link>
              <Link
                href="/pricing"
                className="text-cv-text-secondary hover:text-cv-text-primary transition-colors"
              >
                Harga
              </Link>
              <div className="flex items-center space-x-3">
                {user && !user.emailVerified && (
                  <Link
                    href="/verify-email?status=pending"
                    className="px-3 py-1 text-xs rounded-full bg-cv-warning/10 text-cv-warning border border-cv-warning/30"
                  >
                    Verifikasi email
                  </Link>
                )}
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cv-text-secondary hover:text-cv-text-primary"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cv-text-secondary hover:text-cv-error"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className="text-cv-text-secondary hover:text-cv-text-primary transition-colors"
              >
                Tentang
              </Link>
              <Link
                href="/pricing"
                className="text-cv-text-secondary hover:text-cv-text-primary transition-colors"
              >
                Harga
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-cv-text-secondary hover:text-cv-text-primary"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="btn-primary">Daftar Gratis</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`w-5 h-0.5 bg-cv-text-primary transition-all ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-cv-text-primary transition-all mt-1 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-cv-text-primary transition-all mt-1 ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t border-cv-text-secondary/20 bg-cv-bg-secondary"
        >
          <div className="container-centered py-4 space-y-4">
            {isCheckingAuth ? (
              <p className="text-cv-text-secondary">Memuat...</p>
            ) : isAuthenticated ? (
              <>
                {user && !user.emailVerified && (
                  <div className="p-3 rounded-lg border border-cv-warning/40 bg-cv-warning/10 text-sm text-cv-warning">
                    Email Anda belum diverifikasi.{" "}
                    <Link
                      href="/verify-email?status=pending"
                      className="underline"
                    >
                      Verifikasi sekarang
                    </Link>
                    .
                  </div>
                )}
                <Link
                  href="/dashboard"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/history"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Riwayat
                </Link>
                <Link
                  href="/pricing"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Harga
                </Link>
                <Link
                  href="/settings"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Pengaturan
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-cv-error hover:text-cv-error/80 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Tentang
                </Link>
                <Link
                  href="/pricing"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Harga
                </Link>
                <Link
                  href="/login"
                  className="block text-cv-text-secondary hover:text-cv-text-primary transition-colors"
                >
                  Masuk
                </Link>
                <Link href="/register" className="block">
                  <Button className="btn-primary w-full">Daftar Gratis</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
