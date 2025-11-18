"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-cv-text-secondary/20 bg-cv-bg-secondary/50">
      <div className="container-centered py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold gradient-text">
              AI CV Review
            </h3>
            <p className="text-cv-text-secondary text-sm">
              Asisten karier cerdas berbasis AI untuk mengoptimalkan CV Anda dan
              meningkatkan peluang lolos seleksi kerja.
            </p>
          </div>

          <div
            className="space-y-4"
          >
            <h4 className="font-medium text-cv-text-primary">Produk</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/dashboard"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Analisis CV
              </Link>
              <Link
                href="/pricing"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/history"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Riwayat Analisis
              </Link>
            </div>
          </div>

          <div
            className="space-y-4"
          >
            <h4 className="font-medium text-cv-text-primary">Perusahaan</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href="/privacy"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/contact"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Kontak
              </Link>
            </div>
          </div>

          <div
            className="space-y-4"
          >
            <h4 className="font-medium text-cv-text-primary">Dukungan</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/help"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Bantuan
              </Link>
              <Link
                href="/faq"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/settings"
                className="block text-cv-text-secondary hover:text-cv-accent transition-colors"
              >
                Pengaturan Akun
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-8 border-t border-cv-text-secondary/20 text-center"
        >
          <p className="text-cv-text-secondary text-sm">
            © 2025 AI CV Review. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
