import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware untuk memproteksi rute yang memerlukan autentikasi.
 * 
 * Cara kerja:
 * 1. Middleware ini akan berjalan untuk setiap rute yang didefinisikan di `config.matcher`.
 * 2. Ia akan memeriksa apakah ada cookie bernama 'auth_token' pada request yang masuk.
 * 3. Jika cookie tidak ditemukan, pengguna akan dialihkan ke halaman '/login'.
 *    URL asal pengguna akan ditambahkan sebagai query parameter 'from' untuk
 *    mengarahkan kembali pengguna setelah berhasil login.
 * 4. Jika cookie ditemukan, request akan dilanjutkan ke halaman yang dituju.
 */
export function proxy(request: NextRequest) {
  // Mengambil token dari cookies. Ganti 'auth_token' jika Anda menggunakan nama lain.
  const authToken = request.cookies.get('auth_token')?.value;

  // Jika token tidak ada, alihkan ke halaman login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Jika token ada, lanjutkan request
  return NextResponse.next();
}

// Konfigurasi untuk menentukan rute mana saja yang akan menggunakan middleware ini.
export const config = {
  matcher: [
    /*
     * Cocokkan semua rute di bawah ini, kecuali untuk file statis (_next/static),
     * file gambar (_next/image), dan favicon.ico.
     */
    '/dashboard/:path*',
    '/settings/:path*',
    '/history/:path*',
    '/analysis/:path*',
    '/summary-generator/:path*',
    '/cover-letter-generator/:path*',
    '/interview-prep/:path*',
  ],
};
