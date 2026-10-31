import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 pt-16 overflow-hidden">
      <div className="flex-1 text-center md:text-left z-10">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#3B6FA3] leading-tight tracking-tight">
          Ada ruang <br />
          untuk setiap <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10">pertanyaan.</span>
            <span className="absolute bottom-1 left-0 w-full h-[60%] bg-[#D4FA70] -z-10 rounded-sm"></span>
          </span>
        </h1>
        <p className="mt-6 text-[#5A7E9C] text-lg md:text-xl max-w-md mx-auto md:mx-0">
          Kenali HIV, temukan jawaban yang tepercaya, dan persiapkan langkahmu menuju layanan kesehatan bersama Himu.
        </p>
        <div className="mt-8">
          <Link href="/chat" className="inline-flex items-center gap-3 bg-[#D4FA70] text-[#42602E] font-semibold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-sm">
            Tanya Himu!
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end relative">
        <Image
          src="/image/maskot.png"
          alt="Maskot Himu"
          width={500}
          height={500}
          className="w-72 md:w-96 lg:w-[460px] object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}