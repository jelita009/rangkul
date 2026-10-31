"use client";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import PillNav from "./PillNav";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    // pointer-events-none di container utama agar area kosong tidak memblokir klik pada konten web di bawahnya
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      
      {/* 1. Logo Kiri */}
      <div className="pointer-events-auto flex items-center gap-2 text-blue-500 font-bold text-2xl drop-shadow-sm bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
        <Link href="/">Rangkul</Link>
      </div>

      {/* 2. Navigasi Tengah */}
      <div className="pointer-events-auto hidden md:flex">
        <PillNav
          // @ts-expect-error PillNav linkComponent type mismatch with Next Link
          linkComponent={Link}
          items={[
            { label: "Berita", href: "/SliderBerita" },
            { label: "Tentang", href: "/Tentang" },
            { label: "Peta", href: "/pasien/peta" },
            { label: "Daftar Skrinning", href: isLoggedIn ? "/pendaftaran" : "/Daftar" },
          ]}
          activeHref="/"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          layout="joined"
          surface="glass"
          theme="light"
          size="md"
          bounce={0.3}
          stretch={0.5}
          collapse="auto"
          intro={true}
        />
      </div>

      {/* 3. Navigasi Kanan (Login & Profile) */}
      <div className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100/30">
        {isLoggedIn ? (
          <Link href="/pasien/profil" className="text-blue-500 hover:text-blue-700 transition">
            <UserCircleIcon className="w-8 h-8" />
          </Link>
        ) : (
          <>
            <Link href="/Login" className="text-blue-500 font-medium hidden md:block hover:text-blue-700 transition">
              Login
            </Link>
            <UserCircleIcon className="w-8 h-8 text-blue-500" />
          </>
        )}
      </div>

    </nav>
  );
}