"use client"

import { useEffect, useState } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simple intersection observer to trigger animations on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('about-content')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 px-8 sm:px-16 lg:px-32 xl:px-48 bg-black text-white overflow-hidden">
      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }
        .image-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .text-gradient {
          background: linear-gradient(to right, #ffffff 20%, #d4af37 50%, #ffffff 80%);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>

      <div id="about-content" className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Image Side - Animated Frame */}
          <div className={`relative order-2 md:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Decorative Gold Border - Thinner for more class */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-[#d4af37]/20 pointer-events-none"></div>
            
            <div className="relative group aspect-[4/5] overflow-hidden border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img
                src="/golf.jpg"
                alt="NETRUTV Vision"
                className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] cubic-bezier(0.19, 1, 0.22, 1)"
              />
              {/* Luxury Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Floating Info Box - Glassmorphism */}
            <div className="absolute -bottom-8 -right-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 hidden lg:block image-float">
               <p className="font-playfair italic text-2xl text-[#d4af37] mb-2">Heritage</p>
               <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Established 2026</p>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="space-y-12 order-1 md:order-2">
            <div className="space-y-6">
              <div className={`flex items-center gap-4 reveal-up ${isVisible ? 'active' : ''}`}>
                <div className="h-[1px] w-16 bg-[#d4af37]"></div>
                <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.5em]">The Manifesto</span>
              </div>
              
              <h2 className={`font-playfair text-6xl md:text-7xl font-bold leading-[1.1] reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.2s' }}>
                Engineering <br />
                <span className="text-gradient">Silence.</span>
              </h2>
            </div>

            <div className={`space-y-8 text-zinc-500 font-light leading-relaxed text-lg max-w-xl reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <p className="border-l border-zinc-800 pl-8">
                NETRUTV, by Leaderskey, exists at the intersection of power and restraint. 
                We move beyond the noise of fast fashion, curating a visual language 
                rooted in architectural minimalism.
              </p>
              <p className="pl-8">
                Every silhouette is calculated. Every fabric is chosen for its weight 
                and narrative. We don't just dress the body; we provide the armor 
                for your most significant moments.
              </p>
            </div>

            {/* Premium Stats Bar - Staggered Reveal */}
            <div className={`grid grid-cols-2 gap-12 pt-12 border-t border-zinc-900 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.6s' }}>
              <div className="group cursor-default">
                <p className="font-playfair text-5xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-500">100%</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-2">Organic Traceability</p>
              </div>
              <div className="group cursor-default">
                <p className="font-playfair text-5xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-500">Global</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-2">Elite Network</p>
              </div>
            </div>
            
            <div className={`pt-6 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0.8s' }}>
              <button className="group relative flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white overflow-hidden">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Read our Manifesto</span>
                <div className="absolute inset-0 bg-[#d4af37] translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="relative z-10 transition-all duration-500 group-hover:text-black group-hover:translate-x-2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}