"use client"

import { CartProvider } from "@/context/cart-context"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import Collections from "@/components/collections"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (

    <CartProvider>
      <main className="min-h-screen bg-white text-black">
        <Header />
        <Hero />
        <div className="group relative w-full bg-[#C5A028] py-6 border-y border-black/10 overflow-hidden cursor-default">
          {/* Soft fade edges for a premium look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#C5A028] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#C5A028] to-transparent z-10" />

          <div className="flex whitespace-nowrap animate-marquee group-hover:pause-animation">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                {/* Message 1: Corporate/Branding */}
                <div className="flex items-center mx-8">
                  <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-black">
                    Elevate Your Brand
                  </span>
                  <span className="mx-6 text-black/30 text-2xl">•</span>
                  <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-black/80">
                    Bulk & Corporate Branding
                  </span>
                </div>

                {/* Message 2: Retail/Wholesale */}
                <div className="flex items-center mx-8 px-8 border-l border-black/10">
                  <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-black">
                    Wholesale Partners
                  </span>
                  <span className="mx-6 text-black/30 text-2xl">•</span>
                  <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-black/80">
                    Special Pricing for Retailers & Distributors
                  </span>

                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="ml-10 px-6 py-2 bg-black text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
                  >
                    Enquire Now
                  </button>
                </div>

                <span className="mx-12 text-black/20 text-3xl font-thin">/</span>
              </div>
            ))}
          </div>
        </div>
        {/* <Products /> */}
        <Collections />
        <About />
        <Contact />
        {/* <Footer /> */}
      </main>
    </CartProvider>
  )
}
