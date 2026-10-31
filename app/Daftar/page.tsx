"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MascotPanel from "@/components/auth/MascotPanel";
import AuthLogo from "@/components/auth/AuthLogo";

export default function DaftarPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch {
      setError("Terjadi kesalahan, coba lagi");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F3F8FD] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-sm overflow-hidden flex flex-col md:flex-row">
        <MascotPanel className="w-full h-48 md:h-auto md:w-1/2" />

        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <AuthLogo />

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B6FA3] mt-6 mb-6">
            Buat Akunmu
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#23527C] mb-1.5">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#23527C] mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3B6FA3]"
                  aria-label="Tampilkan kata sandi"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-[#23527C] mb-1.5">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3B6FA3]"
                  aria-label="Tampilkan konfirmasi kata sandi"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-[#5A7E9C] pt-1">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-[#3B6FA3] focus:ring-[#3B6FA3]/30"
              />
              Data pendaftaran dijamin anonim dan rahasia
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#3B6FA3] text-white font-medium text-base py-3 rounded-full hover:scale-[1.02] transition-transform mt-2 disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Memproses..." : "Daftar Akun"}
              {!loading && <span className="text-lg">→</span>}
            </button>
          </form>

          <p className="text-center text-sm text-[#5A7E9C] mt-6">
            Sudah punya akun?{" "}
            <Link href="/Login" className="font-semibold text-[#3B6FA3]">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}