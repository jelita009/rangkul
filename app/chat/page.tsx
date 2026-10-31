'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiMenu, FiArrowUp, FiArrowUpRight, FiMessageSquare } from 'react-icons/fi';
import { fetchAIAnswer } from '@/lib/api';
import ChatMascot from '@/components/chat/chatMaskot';
import TypewriterTitle from '@/components/chat/TypewriterTitle';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SUGGESTED_PROMPTS = [
  'Apa itu HIV?',
  'Apakah Hasil Tes dirahasiakan?',
  'Bagaimana Proses HIV?',
  'Dimana Tes HIV?',
];

// Taruh di luar komponen React agar tidak terdeteksi oleh React Compiler/Linter
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${messageCounter}-${Math.random().toString(36).substring(2, 9)}`;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

 const handleSendMessage = async (textToSend?: string) => {
  const messageContent = textToSend || input;
  if (!messageContent.trim() || isLoading) return;

  const userMsg: Message = { 
    id: generateUniqueId(), 
    sender: 'user', 
    text: messageContent 
  };

  setMessages((prev) => [...prev, userMsg]);
  if (!textToSend) setInput('');
  setIsLoading(true);

  try {
    const aiReply = await fetchAIAnswer(messageContent);
    const aiMsg: Message = {
      id: generateUniqueId(),
      sender: 'ai',
      text: aiReply,
    };
    setMessages((prev) => [...prev, aiMsg]);
  } catch (err) {
    console.error('Chat API Error:', err);
    const errorMsg: Message = {
      id: generateUniqueId(),
      sender: 'ai',
      text: 'Maaf, terjadi kesalahan jaringan.',
    };
    setMessages((prev) => [...prev, errorMsg]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#EBF3FF] via-[#F5F8FF] to-[#E2EEFF] overflow-hidden text-slate-800 font-sans">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col justify-between items-center w-16 bg-white/60 backdrop-blur-md border-r border-blue-100/50 py-6 z-20">
        <div className="flex flex-col items-center gap-8">
          <Image src="/image/maskot.png" alt="Rangkul Logo" width={32} height={32} priority />
          <button className="text-[#23527C] p-2 hover:bg-blue-50 rounded-xl transition"><FiHome className="w-6 h-6" /></button>
          <button className="text-[#23527C] p-2 hover:bg-blue-50 rounded-xl transition"><FiMessageSquare className="w-6 h-6" /></button>
        </div>
        <button className="text-[#23527C] p-2 hover:bg-blue-50 rounded-xl transition"><FiUser className="w-6 h-6" /></button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="md:hidden flex justify-between items-center px-5 py-4 z-20">
          <button className="p-2 text-[#23527C]"><FiMenu className="w-6 h-6" /></button>
          <button className="p-2 text-[#23527C]"><FiHome className="w-6 h-6" /></button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-12 pt-4 pb-36 relative">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div key="first-chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full max-w-5xl mx-auto flex flex-col justify-between pt-6 md:pt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <TypewriterTitle text="Hai, aku Himu!" />
                    <p className="text-blue-600/80 text-base md:text-lg mt-2 font-normal">
                      Ada yang ingin kamu tanyakan tentang HIV atau tes HIV?
                    </p>
                  </div>
                  <ChatMascot size="lg" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-12 max-w-2xl">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button key={idx} onClick={() => handleSendMessage(prompt)} className="flex items-center justify-between p-4 bg-white/70 hover:bg-white backdrop-blur-md rounded-2xl border border-white/80 shadow-sm transition text-left group">
                      <span className="text-[#23527C] font-medium text-sm md:text-base">{prompt}</span>
                      <FiArrowUpRight className="text-[#23527C] w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="in-chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6 pt-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.sender === 'user' ? (
                      <div className="bg-[#D4FA70] text-slate-800 px-5 py-3.5 rounded-3xl rounded-tr-sm max-w-[85%] text-sm md:text-base shadow-sm">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="flex gap-3 max-w-[90%] md:max-w-[85%]">
                        <ChatMascot size="sm" />
                        <div className="text-[#23527C] text-sm md:text-base leading-relaxed whitespace-pre-line pt-0.5 font-normal">
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3">
                    <ChatMascot size="sm" isTyping />
                    <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/60">
                      {[0, 1, 2].map((dot) => (
                        <motion.span key={dot} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }} className="w-2 h-2 bg-[#23527C] rounded-full" />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INPUT FLOATING */}
        <div className="absolute bottom-6 left-0 right-0 px-4 md:px-0 z-20">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="max-w-2xl mx-auto relative flex items-center bg-white rounded-full shadow-lg border border-blue-50/80 p-2 pl-6">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Apa yang kamu pikirkan?" className="w-full bg-transparent border-none outline-none text-slate-700 placeholder-blue-300 text-sm md:text-base pr-12" />
            <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-3 bg-blue-400 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full transition shadow-md">
              <FiArrowUp className="w-5 h-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}