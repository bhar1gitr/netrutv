"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import { ShoppingBag, Loader2, Tag, Star } from "lucide-react"

// Helper to calculate sale price
const getSalePrice = (price, discount) => {
  if (!discount) return price;
  if (discount.discountType === 'percentage') {
    return price - (price * discount.value / 100);
  }
  return price - discount.value;
};

export default function CategoryPage() {
  const { category } = useParams()
  const { addToCart } = useCart()
  
  const [products, setProducts] = useState([])
  const [activeSub, setActiveSub] = useState("All")
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = "https://netrutv-server.onrender.com"; // Change to your backend URL

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      setLoading(true)
      try {
        // Backend now populates 'discount' in this route
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
          <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-2">Collection Archive</p>
          <h1 className="text-7xl font-black uppercase tracking-tighter italic">{category}</h1>
        </div>

        <div className="flex gap-10 overflow-x-auto no-scrollbar border-y border-zinc-900 py-8 mb-12">
          {subCategories.map((sub) => (
            <button 
              key={sub} 
              onClick={() => setActiveSub(sub)} 
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all whitespace-nowrap ${activeSub === sub ? "text-[#d4af37] border-b border-[#d4af37] pb-1" : "text-zinc-500 hover:text-white"}`}
            >
              {sub}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-40 text-center uppercase tracking-[0.4em] text-[10px] text-zinc-500 animate-pulse font-bold">
            Decrypting {category} Archive...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {displayItems.map((item) => (
              <CategoryProductCard key={item._id} item={item} addToCart={addToCart} />
            ))}
          </div>
        )}

        {!loading && displayItems.length === 0 && (
          <div className="py-20 text-center border border-dashed border-zinc-900 rounded-2xl">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">No pieces currently listed in this sector.</p>
          </div>
        )}
      </div>
    </main>
  )
}

function CategoryProductCard({ item, addToCart }) {
  const [showSizes, setShowSizes] = useState(false);
  const isSoldOut = item.totalStock <= 0;
  
  // Sale Logic
  const hasDiscount = !!item.discount;
  const salePrice = getSalePrice(item.price, item.discount);

  return (
    <div className="group" onMouseLeave={() => setShowSizes(false)}>
      <div className="relative aspect-[3/4] bg-zinc-950 border border-zinc-900 overflow-hidden mb-6 shadow-2xl">
        
        {/* SALE & STATUS BADGES */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isSoldOut && (
            <span className="bg-zinc-900/90 text-zinc-500 text-[8px] px-3 py-1 rounded-full uppercase font-bold tracking-widest">
              Sold Out
            </span>
          )}
          {!isSoldOut && hasDiscount && (
            <span className="bg-[#d4af37] text-black text-[9px] px-3 py-1 rounded-sm uppercase font-black tracking-tighter flex items-center gap-1 shadow-lg">
              <Tag size={10} />
              {item.discount.discountType === 'percentage' 
                ? `-${item.discount.value}%` 
                : `₹${item.discount.value} OFF`}
            </span>
          )}
        </div>

        <Link href={`/product/${item._id}`}>
          <img 
            src={item.image} 
            alt={item.name} 
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isSoldOut ? 'opacity-20 grayscale' : 'opacity-80 group-hover:opacity-30'}`} 
          />
        </Link>
        
        {!isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 px-6">
            {!showSizes ? (
               <button 
                 onClick={() => setShowSizes(true)}
                 className="bg-white text-black py-4 w-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all transform hover:scale-105"
               >
                 Quick Add
               </button>
            ) : (
              <div className="bg-black/90 backdrop-blur-xl p-5 w-full border border-white/10 animate-in fade-in zoom-in duration-300">
                <p className="text-[8px] text-[#d4af37] uppercase tracking-[0.3em] text-center mb-4 font-bold">Select Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(item.sizes || {}).map(([size, stock]) => (
                    <button
                      key={size}
                      disabled={stock <= 0}
                      onClick={() => {
                        // Pass sale price to cart context
                        addToCart({ ...item, selectedSize: size, price: salePrice });
                        setShowSizes(false);
                      }}
                      className={`py-2 text-[9px] border font-bold transition-all ${stock <= 0 ? 'opacity-10 border-zinc-800 pointer-events-none' : 'border-zinc-700 hover:border-[#d4af37] text-white hover:text-[#d4af37]'}`}
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

      <div className="px-1">
        <Link href={`/product/${item._id}`}>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-[#d4af37] transition-colors font-bold mb-2">
            {item.name}
          </h3>
        </Link>
        
        {/* DYNAMIC PRICE DISPLAY */}
        <div className="flex items-end gap-3 mt-1">
          {hasDiscount && !isSoldOut ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#d4af37] italic tracking-tighter">
                ₹{Number(salePrice).toLocaleString()}
              </span>
              <span className="text-[11px] text-zinc-600 line-through tracking-tighter uppercase font-light">
                ₹{Number(item.price).toLocaleString()}
              </span>
            </div>
          ) : (
            <span className={`font-bold text-lg tracking-tighter ${isSoldOut ? 'text-zinc-700 line-through' : 'text-[#d4af37]'}`}>
              ₹{Number(item.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}