import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SliderBerita from "@/components/SliderBerita";
import Tentang from "@/components/Tentang";
import Peta from "@/components/Peta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Navbar />
      <div className="pt-24 pb-12">
        <Hero />
      </div>
      <SliderBerita />
      <Tentang />
      <Peta />
      <Footer />
    </main>
  );
}