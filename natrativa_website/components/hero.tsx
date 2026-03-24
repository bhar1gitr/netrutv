'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }

        .hero-gradient {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(50px);
          z-index: 10;
          transition: opacity 1s ease;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title { animation: fade-in-up 1s ease both; }
      `}</style>

      {/* 1. BACKGROUND MARQUEE LAYER (Moved to the very top for depth) */}
      <div className="fixed inset-0 flex items-center overflow-hidden pointer-events-none z-0">
        <div className="animate-marquee">
          <p className="text-[25vw] font-black text-white/[0.03] uppercase tracking-tighter select-none pr-40">
            Leaderskey
          </p>
          <p className="text-[25vw] font-black text-white/[0.03] uppercase tracking-tighter select-none pr-40">
            Leaderskey
          </p>
        </div>
      </div>

      {/* 2. MOUSE GLOW LAYER */}
      <div
        className="hero-gradient"
        style={{
          left: `${mousePosition.x - 200}px`,
          top: `${mousePosition.y - 200}px`,
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* 3. CONTENT LAYER */}
      <div className="content relative z-20">
        <section className="min-h-screen flex items-center px-8 sm:px-16 lg:px-32 xl:px-48 pt-32 pb-20">
          <div className="max-w-6xl w-full">
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent mb-8" />
            
            <h1 className="hero-title font-playfair text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[1.1] mb-6 tracking-tight">
              Timeless Luxury
            </h1>
            
            <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-10">
              Curated Elegance
            </p>
            
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl font-light mb-12">
              Discover our exclusive collection of meticulously crafted pieces,
              designed for those who appreciate the finer things. Each item tells
              a story of craftsmanship and uncompromising quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                Shop Collection
              </button>
              <button className="px-10 py-4 border border-zinc-800 text-white font-bold uppercase tracking-widest text-xs hover:border-[#d4af37] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}