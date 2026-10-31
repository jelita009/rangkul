'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ChatMascotProps {
  size?: 'sm' | 'lg';
  isTyping?: boolean;
}

export default function ChatMascot({ size = 'lg', isTyping = false }: ChatMascotProps) {
  if (size === 'sm') {
    return (
      <motion.div
        animate={isTyping ? { scale: [1, 1.15, 1] } : {}}
        transition={isTyping ? { duration: 1.5, repeat: Infinity } : {}}
        className="relative w-7 h-7 flex-shrink-0"
      >
        <Image src="/image/maskot.png" alt="Himu Avatar" fill className="object-contain" priority />
      </motion.div>
    );
  }

  return (
    <div className="flex justify-center md:justify-end relative">
      <motion.div
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-60 h-60 md:w-80 md:h-80"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-lime-200/50 to-blue-300/50 rounded-full blur-3xl -z-10" />
        <Image src="/image/maskot.png" alt="Himu Mascot" fill className="object-contain drop-shadow-xl" priority />
      </motion.div>
    </div>
  );
}