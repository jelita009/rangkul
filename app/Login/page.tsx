"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MascotPanel from "@/components/auth/MascotPanel";
import AuthLogo from "@/components/auth/AuthLogo";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal");
        setLoading(false);
        return;
      }

      const redirectMap: Record<string, string> = {
        PASIEN: "/pasien",
        PERAWAT: "/perawat",
        ADMIN: "/admin",
        SUPERADMIN: "/superadmin",
      };
      router.push(redirectMap[data.role] || "/");
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
            Selamat Datang
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#23527C] mb-1.5">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pasien.anonim@gmail.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="passwordRahasia123"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B6FA3] text-white font-medium text-base py-3 rounded-full hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-center text-sm text-[#5A7E9C] mt-6">
            Belum punya akun?{" "}
            <Link href="/daftar" className="font-semibold text-[#3B6FA3]">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}