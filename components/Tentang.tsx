"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Tentang() {
  const fitur = [
    { no: "1/4", title: "Edukasi HIV", desc: "Informasi HIV yang mudah dipahami dari sumber tepercaya." },
    { no: "2/4", title: "Pendamping AI", desc: "Bertanya tentang HIV bersama Himu tanpa takut dihakimi." },
    { no: "3/4", title: "Akses Layanan Skrining", desc: "Temukan fasilitas skrining HIV dan persiapkan kunjunganmu." },
    { no: "4/4", title: "Navigasi Fasilitas", desc: "Kenali lokasi rumah sakit dan temukan informasi menuju Poli VCT." },
  ];

  return (
    <section id="Tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-16 overflow-hidden">
      <motion.div
        className="flex-1 flex justify-center"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Image
          src="/image/iphone16.png"
          alt="Chat Interface Mockup"
          width={350}
          height={700}
          className="w-[280px] md:w-[350px] drop-shadow-2xl"
        />
      </motion.div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fitur.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 hover:shadow-md transition">
            <span className="text-[#23527C] font-bold text-lg">{item.no}</span>
            <h3 className="font-serif text-[#23527C] font-semibold text-xl mt-4 mb-2">{item.title}</h3>
            <p className="text-[#5A7E9C] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}