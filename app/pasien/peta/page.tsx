'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Map as MapInstance } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiMapPin,
  FiArrowRight,
  FiPlus,
  FiMinus,
  FiMenu,
} from 'react-icons/fi';

const RSU_CUT_MEUTIA_COORDS: [number, number] = [97.1583, 5.1221];

export default function PetaPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapInstance | null>(null);

  // States
  const [searchQuery, setSearchQuery] = useState('RSU Cut Meutia');
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [isDenahOpen, setIsDenahOpen] = useState(false);
  const [denahZoom, setDenahZoom] = useState(1);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import('maplibre-gl').then((maplibregl) => {
      const maplib = maplibregl as unknown as Record<string, unknown>;
      if (maplib.workerClass) {
        delete maplib.workerClass;
      }

      const map = new maplibregl.Map({
        container: mapContainerRef.current!,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors',
            },
          },
          layers: [
            {
              id: 'osm-tiles-layer',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        },
        center: RSU_CUT_MEUTIA_COORDS,
        zoom: 15,
      });

      mapInstanceRef.current = map;

      map.on('load', () => {
        map.resize();
      });

      // Marker
      const el = document.createElement('div');
      el.className = 'custom-hospital-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundColor = '#D4FA70';
      el.style.border = '2px solid white';
      el.style.borderRadius = '50%';
      el.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = '#23527C';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '18px';
      el.style.cursor = 'pointer';
      el.innerText = 'H';

      el.addEventListener('click', () => {
        setIsCardVisible(true);
        setIsCardExpanded(true);
        map.flyTo({
          center: RSU_CUT_MEUTIA_COORDS,
          zoom: 16,
          duration: 1500,
        });
      });

      new maplibregl.Marker({ element: el })
        .setLngLat(RSU_CUT_MEUTIA_COORDS)
        .addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-100 font-sans">
      {/* 1. CONTAINER PETA */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* 2. FLOATING SEARCH BAR */}
      <div className="absolute top-4 left-4 right-4 md:left-20 md:max-w-md z-10 flex items-center gap-2">
        <button className="bg-white p-3 rounded-full shadow-md text-[#23527C] md:hidden">
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center bg-white rounded-full shadow-lg border border-blue-50/80 px-4 py-2.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari lokasi rumah sakit..."
            className="w-full bg-transparent border-none outline-none text-slate-700 text-sm md:text-base pr-2"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-1"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
          <button className="p-2 bg-blue-50 text-[#23527C] rounded-full hover:bg-blue-100 transition">
            <FiSearch className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. CONTROL ZOOM PETA */}
      <div className="absolute right-4 top-20 md:top-24 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white p-3 rounded-full shadow-md text-[#23527C] hover:bg-blue-50 transition"
        >
          <FiPlus className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white p-3 rounded-full shadow-md text-[#23527C] hover:bg-blue-50 transition"
        >
          <FiMinus className="w-5 h-5" />
        </button>
      </div>

      {/* 4. BOTTOM SHEET INFORMASI */}
      <AnimatePresence>
        {isCardVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 md:w-[400px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl border border-blue-50/80 z-20 overflow-hidden"
          >
            <div
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              className="p-4 flex items-center justify-between cursor-pointer border-b border-slate-100 bg-slate-50/50"
            >
              <div>
                <h3 className="text-lg font-bold text-[#23527C]">RSU Cut Meutia</h3>
                {!isCardExpanded && (
                  <p className="text-xs text-slate-500 line-clamp-1">
                    Fasilitas layanan kesehatan Poli VCT
                  </p>
                )}
              </div>
              <button className="p-2 bg-blue-50 text-[#23527C] rounded-full">
                {isCardExpanded ? (
                  <FiChevronDown className="w-5 h-5" />
                ) : (
                  <FiChevronUp className="w-5 h-5" />
                )}
              </button>
            </div>

            <AnimatePresence>
              {isCardExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 space-y-4 max-h-[80vh] overflow-y-auto"
                >
                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-36 relative">
                    <div className="relative w-full h-full bg-slate-200">
                      <Image
                        src="/rsu-gedung.jpg"
                        alt="RSU Cut Meutia Gedung"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-full h-full bg-slate-200">
                      <Image
                        src="/rsu-poli.jpg"
                        alt="Poli VCT"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Fasilitas layanan kesehatan dengan lokasi Poli VCT yang ditampilkan
                      pada peta RANGKUL.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-600 text-xs md:text-sm">
                    <FiMapPin className="w-5 h-5 text-[#D4FA70] flex-shrink-0 fill-[#D4FA70] stroke-[#23527C]" />
                    <span>
                      45F4+7HR, Bulat Rata, Jl. Lintas Sumatera, Mesjid Punteut, Kec. Blang
                      Mangat, Kota Lokeshumawe, Aceh 24355
                    </span>
                  </div>

                  <button
                    onClick={() => setIsDenahOpen(true)}
                    className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl flex items-center justify-between shadow-md transition"
                  >
                    <span>Lihat Detail Denah</span>
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MODAL DENAH */}
      <AnimatePresence>
        {isDenahOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="bg-blue-600 text-white text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full">
                  Denah Rumah Sakit RSU Cut Meutia
                </span>
                <button
                  onClick={() => setIsDenahOpen(false)}
                  className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full transition"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-[60vh] overflow-auto my-3 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
                <motion.div
                  animate={{ scale: denahZoom }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative w-full h-full min-h-[300px]"
                >
                  <Image
                    src="/denah-rsu.png"
                    alt="Denah RSU Cut Meutia"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-white">
                  <button
                    onClick={() => setDenahZoom((prev) => Math.min(prev + 0.25, 2.5))}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDenahZoom((prev) => Math.max(prev - 0.25, 0.75))}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}