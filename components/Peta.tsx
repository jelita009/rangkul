import Link from "next/link";
import Image from "next/image";

export default function Peta() {
  return (
    <section id="Peta" className="relative w-full min-h-[640px] flex items-center overflow-hidden mt-10 rounded-t-[3rem] bg-map-gradient">
      {/* Background Peta */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/image/peta.jpg"
          alt="Background Peta"
          fill
          className="object-cover"
        />
      </div>

      {/* Konten */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          <div className="inline-block bg-white/70 backdrop-blur-sm text-[#23527C] font-medium px-6 py-2 rounded-full mb-6">
            Daftar Skrinning
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#113B6B] tracking-tight mb-4 leading-tight">
            Langkahmu, <br /> lebih terarah.
          </h2>
          <p className="text-[#3B6FA3] text-lg mb-8 max-w-md">
            Temukan fasilitas skrining HIV dan kenali lokasi layanan yang ingin kamu kunjungi. Semua dimulai dari satu peta.
          </p>
          <Link
            href="/peta"
            className="inline-flex items-center gap-3 bg-[#113B6B] text-white font-medium text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            Lihat Peta
            <span className="bg-white text-[#113B6B] rounded-full w-8 h-8 flex items-center justify-center">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}