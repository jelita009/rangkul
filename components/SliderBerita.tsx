"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

export default function SliderBerita() {
  const beritaData = [
    { title: "Human Immunodeficiency", desc: "penyebab AIDS dengan. See More", img: "/image/1.jpg" },
    { title: "Virus imunodefisiensi manusia", desc: "adalah virus mematikan dari dua spesies lentivirus penyebab AIDS.[2] Virus ini menyerang manusia dengan. See More", img: "/image/2.jpg", highlight: true },
    { title: "Immunodeficiency virus", desc: "Virus ini menyerang manusia dengan. See More", img: "/image/3.jpg" },
    { title: "Human Immunodeficiency", desc: "penyebab AIDS dengan. See More", img: "/image/4.jpg" },
  ];

  return (
    <section id="SliderBerita" className="py-20 w-full overflow-hidden">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full max-w-6xl mx-auto"
      >
        {beritaData.map((item, idx) => (
          <SwiperSlide key={idx} className="!w-[300px] md:!w-[400px]">
            <div className={`relative rounded-3xl p-4 overflow-hidden transition-all duration-300 shadow-xl border ${item.highlight ? 'bg-[#D4FA70] scale-105' : 'bg-white'}`}>
              <div className="h-48 w-full relative rounded-2xl overflow-hidden mb-4 bg-gray-100">
                
                {/* Menggunakan komponen Image bawaan Next.js agar tidak error */}
                <Image 
                  src={item.img} 
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 400px"
                />

              </div>
              <h3 className="font-serif text-xl font-bold text-[#23527C] leading-tight mb-2">{item.title}</h3>
              <p className="text-sm text-green-800 line-clamp-3 mb-6">{item.desc}</p>
              <button className="absolute bottom-4 right-4 w-10 h-10 border border-[#23527C] rounded-full flex items-center justify-center hover:bg-[#23527C] hover:text-white transition">
                ↗
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}