"use client"

import Link from "next/link"

export default function Collections() {
  const categoryCards = [
    
    {
      title: "T-Shirts",
      subtitle: "GRAPHIC & OVERSIZED",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
      link: "/tshirts",
    },
    {
      title: "Shirts",
      subtitle: "CLASSIC & FORMAL",
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=800&auto=format&fit=crop",
      link: "/shirts",
    },
    {
      title: "Pants",
      subtitle: "CARGOS & CHINOS",
      image: "https://plus.unsplash.com/premium_photo-1690366911138-bd50985e0379?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/pants",
    },
    {
      title: "Bags",
      subtitle: "TACTICAL & TRAVEL",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop",
      link: "/bags",
    },
  ]

  return (
    <section className="bg-black py-24 border-t border-zinc-900">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-24">

        <div className="flex flex-col items-center mb-16">
          <h2 className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Browse The Archive
          </h2>
          <div className="h-[1px] w-12 bg-[#d4af37]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((card, index) => (
            <Link
              href={card.link}
              key={index}
              className="group relative block overflow-hidden bg-zinc-950 aspect-[3/4] border border-zinc-900 transition-colors duration-500 hover:border-[#d4af37]/30"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover opacity-50 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-70 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <div className="text-center transform transition-transform duration-700 group-hover:-translate-y-2">
                  <p className="text-[10px] tracking-[0.5em] font-light mb-2 opacity-70 group-hover:text-[#d4af37] group-hover:opacity-100 transition-colors">THE</p>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
                    {card.title}
                  </h3>
                  <div className="h-[1px] w-0 bg-[#d4af37] mx-auto transition-all duration-700 group-hover:w-full mb-3" />
                  <p className="text-[9px] tracking-[0.3em] font-bold opacity-50 group-hover:opacity-100">{card.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}