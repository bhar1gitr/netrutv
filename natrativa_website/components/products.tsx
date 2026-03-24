"use client"

import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"

export default function Products() {
  const { addToCart } = useCart()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const products = [
    { id: 1, name: "Executive White Tee", price: "₹45", image: "/white-t-shirt-minimalist.jpg" },
    { id: 2, name: "Command Oversized Shirt", price: "₹85", image: "/black-oversized-shirt.jpg" },
    { id: 3, name: "Heritage Monochrome Hoodie", price: "₹120", image: "/black-hoodie-minimalist.jpg" },
    { id: 4, name: "Signature Premium Denim", price: "₹160", image: "/black-denim-jeans.png" },
  ]

  return (
    <section id="products" className="py-32 px-8 sm:px-16 lg:px-32 xl:px-48 bg-black overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .product-card-anim {
          opacity: 0;
          animation: fadeInUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        .gold-underline {
          position: relative;
        }
        .gold-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          transform: translateX(-50%);
        }
        .group:hover .gold-underline::after {
          width: 40%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`flex flex-col items-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight text-center">
            The Release <span className="italic font-normal text-zinc-400">001</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] font-bold">
            By Leaderskey
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative product-card-anim"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-zinc-950 border border-zinc-900 transition-all duration-700 group-hover:border-[#d4af37]/30">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
                />
                
                {/* Elegant Button Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center px-8">
                  <button
                    onClick={() => addToCart({ ...product })}
                    className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#d4af37]"
                  >
                    Add to Collection
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3 text-center">
                <h3 className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-medium group-hover:text-white transition-colors duration-500">
                  <span className="gold-underline">{product.name}</span>
                </h3>
                <p className="text-[#d4af37] font-playfair italic text-xl">
                  {product.price}
                </p>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => addToCart({ ...product })}
                className="md:hidden mt-6 w-full border border-[#d4af37]/20 text-[#d4af37] py-3 text-[9px] font-bold uppercase tracking-widest active:bg-[#d4af37] active:text-black transition-all"
              >
                Quick Add
              </button>
            </div>
          ))}
        </div>

        {/* Decorative Footer Detail */}
        <div className="mt-32 flex flex-col items-center gap-4 opacity-20">
            <div className="h-12 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-white">Scroll for details</p>
        </div>
      </div>
    </section>
  )
}