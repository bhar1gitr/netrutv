"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link" // Import Link for navigation
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"

export default function CategoryPage() {
  const { category } = useParams()
  const { addToCart } = useCart()
  
  const [products, setProducts] = useState([])
  const [activeSub, setActiveSub] = useState("All")
  const [loading, setLoading] = useState(true)

  // const API_BASE_URL = "http://localhost:5000";
    const API_BASE_URL = "https://netrutv-server.onrender.com";

  // 1. Fetch data from Backend
  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/category/${category}`)
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json()
        setProducts(data)
        setActiveSub("All") 
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [category])

  // 2. Dynamic Subcategory Logic (Restored and Improved)
  const subCategories = useMemo(() => {
    if (category === "tshirts") {
      return ["All", "Round Neck", "Polo", "Dry Fit", "Oversize Graphic", "Long Sleeve", "Sports", "Hoodie", "Stripped", "Henley", "Sleeve Less", "Drop Sholder", "Puff Print"]
    }
    if (category === "pants") {
      return ["All", "Chinos", "Pull on Denim", "Jogger", "Trouser", "Baggy", "Cargo"]
    }
    if (category === "shirts") {
      return ["All", "Classic", "Formal", "Denim", "Printed", "Mandarin Collar", "Linen", "Half Sleeve"]
    }
    if (category === "bags") {
        return ["All", "Leather", "Backpack", "Laptop", "Tactical", "Travel"]
    }
    // Fallback: If category isn't defined above, pull unique subs from the database data
    const uniqueFromDB = Array.from(new Set(products.map(p => p.sub))).filter(Boolean);
    return ["All", ...uniqueFromDB];
  }, [category, products])

  // 3. Filter displayed items
  const displayItems = useMemo(() => {
    return products.filter(item => 
      activeSub === "All" || item.sub === activeSub
    )
  }, [products, activeSub])

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-32 pb-20 max-w-[1800px] mx-auto px-6 lg:px-24">
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-2">Category</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{category}</h1>
        </div>

        {/* Sub-category Navigation */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-y border-zinc-900 py-6 mb-12">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`text-[10px] whitespace-nowrap uppercase tracking-[0.3em] font-bold transition-all ${
                activeSub === sub ? "text-[#d4af37]" : "text-zinc-500 hover:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center animate-pulse uppercase tracking-widest text-xs">
            Accessing Archive...
          </div>
        ) : displayItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayItems.map((item) => (
              <div key={item._id} className="group">
                {/* 4. Link wrapper for redirection */}
                <Link href={`/product/${item._id}`}>
                    <div className="relative aspect-[3/4] bg-zinc-950 border border-zinc-900 overflow-hidden mb-4 cursor-pointer">
                    <img 
                        src={item.image.startsWith('http') ? item.image : `${API_BASE_URL}/${item.image}`} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" 
                    />
                    
                    {/* Add to Cart remains a button inside the link, 
                        use e.preventDefault() to stop redirection when clicking button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevents redirection to product page
                            addToCart(item);
                        }}
                        className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        Add to Cart
                    </button>
                    </div>
                </Link>

                <Link href={`/product/${item._id}`}>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer">{item.name}</h3>
                </Link>
                <p className="font-bold text-lg">₹{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-zinc-600 uppercase tracking-widest text-xs border border-dashed border-zinc-900">
            No items found in {category}.
          </div>
        )}
      </div>
    </main>
  )
}