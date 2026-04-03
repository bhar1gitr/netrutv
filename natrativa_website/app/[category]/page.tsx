"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import { ShoppingBag, Loader2 } from "lucide-react"

export default function CategoryPage() {
  const { category } = useParams()
  const { addToCart } = useCart()
  
  const [products, setProducts] = useState([])
  const [activeSub, setActiveSub] = useState("All")
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = "https://netrutv-server.onrender.com";

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/category/${category}`)
        const data = await res.json()
        setProducts(data)
        setActiveSub("All") 
      } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    loadProducts()
  }, [category])

  const subCategories = useMemo(() => {
    const specificSubs = {
      tshirts: ["All", "Round Neck", "Polo", "Dry Fit", "Oversize Graphic", "Long Sleeve", "Sports", "Hoodie", "Stripped", "Henley", "Sleeve Less", "Drop Sholder", "Puff Print"],
      pants: ["All", "Chinos", "Pull on Denim", "Jogger", "Trouser", "Baggy", "Cargo"],
      shirts: ["All", "Classic", "Formal", "Denim", "Printed", "Mandarin Collar", "Linen", "Half Sleeve"],
      bags: ["All", "Leather", "Backpack", "Laptop"]
    }
    return specificSubs[category] || ["All", ...Array.from(new Set(products.map(p => p.sub))).filter(Boolean)]
  }, [category, products])

  const displayItems = useMemo(() => {
    return products.filter(item => activeSub === "All" || item.sub === activeSub)
  }, [products, activeSub])

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 pb-20 max-w-[1800px] mx-auto px-6 lg:px-24">
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-2">Collection</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">{category}</h1>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar border-y border-zinc-900 py-6 mb-12">
          {subCategories.map((sub) => (
            <button key={sub} onClick={() => setActiveSub(sub)} className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${activeSub === sub ? "text-[#d4af37]" : "text-zinc-500 hover:text-white"}`}>
              {sub}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center uppercase tracking-widest text-xs animate-pulse">Accessing Archive...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayItems.map((item) => <CategoryProductCard key={item._id} item={item} addToCart={addToCart} baseUrl={API_BASE_URL} />)}
          </div>
        )}
      </div>
    </main>
  )
}

function CategoryProductCard({ item, addToCart, baseUrl }) {
  const [showSizes, setShowSizes] = useState(false);
  const imageSrc = item.image.startsWith('http') ? item.image : `${baseUrl}/${item.image}`
  const isSoldOut = item.totalStock <= 0;

  return (
    <div className="group" onMouseLeave={() => setShowSizes(false)}>
      <div className="relative aspect-[3/4] bg-zinc-950 border border-zinc-900 overflow-hidden mb-4">
        <Link href={`/product/${item._id}`}>
          <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isSoldOut ? 'opacity-20 grayscale' : 'opacity-80 group-hover:opacity-40'}`} />

        </Link>
        
        {!isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 px-4">
            {!showSizes ? (
               <button 
                 onClick={() => setShowSizes(true)}
                 className="bg-white text-black py-3 w-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-colors"
               >
                 Add to Cart
               </button>
            ) : (
              <div className="bg-black/90 backdrop-blur-md p-4 w-full border border-white/10">
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(item.sizes || {}).map(([size, stock]) => (
                    <button
                      key={size}
                      disabled={stock <= 0}
                      onClick={() => {
                        addToCart({ ...item, selectedSize: size });
                        setShowSizes(false);
                      }}
                      className={`py-2 text-[8px] border transition-all ${stock <= 0 ? 'opacity-20 border-zinc-800' : 'border-zinc-700 hover:border-[#d4af37] text-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Link href={`/product/${item._id}`}>
        <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-[#d4af37] transition-colors">{item.name}</h3>
      </Link>
      <p className="font-bold text-lg text-[#d4af37] mt-1">₹{item.price}</p>
    </div>
  )
}