## Solid CV Review – Frontend

Solid CV Review adalah aplikasi Next.js 16 yang membantu pengguna menilai, memperbaiki,
dan menyiapkan dokumen lamaran kerja. Repositori frontend ini berisi seluruh UI/UX untuk
landing page, dashboard analisis, generator ringkasan, cover letter, hingga interview prep.

### 🧱 Tech Stack

- Next.js App Router + TypeScript
- Tailwind (custom design system `cv-*`)
- React Query–style hooks (manual) + custom Auth context
- React PDF untuk export laporan
- Lucide-icons, Framer Motion, js-cookie

### 🚀 Menjalankan Aplikasi

```bash
cd solid-cv
npm install
npm run dev
# buka http://localhost:3000
```

#### Environment variables

Buat `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### ✨ Highlight Fitur

- **Autentikasi & verifikasi email**
  - Form register/login, email verification flow dengan halaman khusus.
  - Guard global untuk membatasi akses dashboard sebelum email terverifikasi.
- **Dashboard analisis CV**
  - Menampilkan skor keseluruhan, detail section, riwayat, rekomendasi, dsb.
  - Ekspor laporan PDF bergaya sama dengan UI menggunakan React PDF.
- **Generator**: summary, cover letter (dummy UI untuk backend endpoints).
- **Interview Prep**
  - Komponen `QuestionDetail` menampilkan jawaban baik/buruk secara visual.
- **UI sistem**
  - Header responsif, glass-card utilities, theme warning banners, dsb.

### ✅ Checklist Frontend

- [x] Landing page dan CTA
- [x] Flow registrasi + verifikasi email (pending/success/error/resend)
- [x] Auth context + refresh token integration
- [x] Dashboard guard (hanya pengguna terverifikasi)
- [x] Laporan PDF dengan styling menyerupai halaman detail
- [x] History list + tombol download
- [x] Interview prep UI (good vs bad answer)
- [ ] Integrasi upload CV & analisis nyata (saat ini dummy data)
- [ ] Pembayaran & aktivasi paket Pro
- [ ] Push notification / email preference UI detail

### 📁 Struktur Penting

- `src/app/(auth)` – halaman login/register/verify email
- `src/app/(dashboard)` – area privat (dashboard, history, interview, dll.)
- `src/context/auth-context.tsx` – sumber kebenaran status user
- `src/components/auth/email-verification-guard.tsx` – guard halaman privat
- `src/pdf/analysis-report.tsx` – template React PDF
- `src/lib/pdf.tsx` – helper download laporan

### 🧪 Testing

Belum ada pengaturan automated test. Gunakan `npm run lint` untuk memastikan konsistensi, dan uji manual halaman yang berdampak (register/login/dashboard/pdf).

---

Lihat juga README backend (`solid-cv-be/README.md`) untuk setup API/DB. Pastikan backend sudah berjalan dan memiliki tabel terbaru (termasuk kolom verifikasi email) sebelum menjalankan frontend.
