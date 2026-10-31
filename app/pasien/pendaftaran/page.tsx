"use client";
import { useState } from "react";
import AuthLogo from "@/components/auth/AuthLogo";

export default function PendaftaranPage() {
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    umur: "",
    alamat: "",
    noHp: "",
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: sambungkan ke API pendaftaran skrining
    console.log(form);
  };

  return (
    <main className="min-h-screen bg-[#F3F8FD] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-sm p-8 sm:p-10">
        <AuthLogo />

        <div className="inline-block bg-blue-50 text-[#23527C] font-medium px-5 py-1.5 rounded-full text-sm mt-6 mb-3">
          Daftar Skrinning
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B6FA3] mb-2">
          Lengkapi Data Dirimu
        </h1>
        <p className="text-[#5A7E9C] text-sm sm:text-base mb-8">
          Data ini digunakan untuk mengatur jadwal skrining dan dijamin
          kerahasiaannya.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="nik"
              className="block text-sm font-medium text-[#23527C] mb-1.5"
            >
              NIK / No. BPJS
            </label>
            <input
              id="nik"
              type="text"
              inputMode="numeric"
              value={form.nik}
              onChange={handleChange("nik")}
              placeholder="3201xxxxxxxxxxxx"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-[#23527C] mb-1.5"
            >
              Nama Lengkap
            </label>
            <input
              id="nama"
              type="text"
              value={form.nama}
              onChange={handleChange("nama")}
              placeholder="Nama sesuai KTP"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="umur"
                className="block text-sm font-medium text-[#23527C] mb-1.5"
              >
                Umur
              </label>
              <input
                id="umur"
                type="number"
                min={0}
                value={form.umur}
                onChange={handleChange("umur")}
                placeholder="25"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="noHp"
                className="block text-sm font-medium text-[#23527C] mb-1.5"
              >
                No. HP
              </label>
              <input
                id="noHp"
                type="tel"
                value={form.noHp}
                onChange={handleChange("noHp")}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-[#23527C] mb-1.5"
            >
              Tempat Tinggal
            </label>
            <input
              id="alamat"
              type="text"
              value={form.alamat}
              onChange={handleChange("alamat")}
              placeholder="Alamat domisili saat ini"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#23527C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FA3]/30 focus:border-[#3B6FA3]"
              required
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-[#5A7E9C] pt-1">
            <input
              type="checkbox"
              className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-[#3B6FA3] focus:ring-[#3B6FA3]/30"
              required
            />
            Saya setuju data saya digunakan untuk keperluan skrining dan
            dijamin kerahasiaannya.
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#3B6FA3] text-white font-medium text-base py-3 rounded-full hover:scale-[1.02] transition-transform mt-2"
          >
            Kirim Pendaftaran
            <span className="text-lg">→</span>
          </button>
        </form>
      </div>
    </main>
  );
}