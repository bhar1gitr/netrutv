"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import axios from "axios"
import { Search, Box, AlertTriangle, X, ShoppingBag } from "lucide-react"

const API_URL = "https://netrutv-server.onrender.com/api/products"
const IMG_BASE_URL = "https://netrutv-server.onrender.com/"

export default function CollectionsPage() {
  const { addToCart } = useCart()
  const [dbProducts, setDbProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSubCategory, setActiveSubCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL)
        setDbProducts(res.data)
      } catch (err) { console.error("Fetch error:", err) }
    }
    fetchProducts()
  }, [])

  const categories = ["All", "T-Shirts", "Shirts", "Pants", "Bags"]
  
  const subCategories = useMemo(() => {
    const cat = activeCategory.toLowerCase()
    if (cat === "t-shirts") return ["All", "Round Neck", "Polo", "Dry Fit", "Oversize Graphic", "Long Sleeve", "Sports", "Hoodie", "Stripped", "Henley", "Sleeve Less", "Drop Sholder", "Puff Print"]
    if (cat === "pants") return ["All", "Chinos", "Pull on Denim", "Jogger", "Trouser", "Baggy", "Cargo"]
    if (cat === "shirts") return ["All", "Classic", "Formal", "Denim", "Printed", "Mandarin Collar", "Linen", "Half Sleeve"]
    if (cat === "bags") return ["All", "Leather", "Backpack", "Laptop"]
    return []
  }, [activeCategory])

  const priceFilters = [
    { label: "All", min: 0, max: 100000 },
    { label: "Under ₹2,000", min: 0, max: 2000 },
    { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
    { label: "Premium (₹5k+)", min: 5000, max: 100000 }
  ]

  const handleFilterChange = (setter, value) => {
    setIsFiltering(true)
    setter(value)
    if (setter === setActiveCategory) setActiveSubCategory("All")
    setTimeout(() => setIsFiltering(false), 300)
  }

  const filteredItems = useMemo(() => {
    return dbProducts.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      const normalizedDataCat = item.type.toLowerCase().replace("-", "") 
      const normalizedActiveCat = activeCategory.toLowerCase().replace("-", "")
      const matchCategory = activeCategory === "All" || normalizedDataCat === normalizedActiveCat
      const matchSubCategory = activeSubCategory === "All" || item.sub === activeSubCategory
      const priceObj = priceFilters.find(p => p.label === priceRange)
      const matchPrice = item.price >= (priceObj?.min || 0) && item.price <= (priceObj?.max || 100000)
      return matchSearch && matchCategory && matchSubCategory && matchPrice
    })
  }, [dbProducts, searchQuery, activeCategory, activeSubCategory, priceRange])

  const col1 = filteredItems.filter((_, i) => i % 3 === 0)
  const col2 = filteredItems.filter((_, i) => i % 3 === 1)
  const col3 = filteredItems.filter((_, i) => i % 3 === 2)

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-24">
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h1 className="text-7xl font-bold tracking-tighter uppercase italic">Collections</h1>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d4af37]" size={18} />
              <input 
                type="text"
                placeholder="SEARCH PIECES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 py-3 pl-8 outline-none focus:border-[#d4af37] text-xs tracking-widest"
              />
            </div>
          </div>
          
          <div className="space-y-10 border-y border-zinc-900 py-12">
            <FilterRow label="Category" active={activeCategory} options={categories} onChange={(val) => handleFilterChange(setActiveCategory, val)} />
            {subCategories.length > 0 && (
              <FilterRow label="Type" active={activeSubCategory} options={subCategories} onChange={(val) => handleFilterChange(setActiveSubCategory, val)} />
            )}
            <FilterRow label="Price" active={priceRange} options={priceFilters.map(p => p.label)} onChange={(val) => handleFilterChange(setPriceRange, val)} />
          </div>
        </header>

        {filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-opacity duration-500 ${isFiltering ? "opacity-0" : "opacity-100"}`}>
            <div className="space-y-24">{col1.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
            <div className="space-y-24 md:mt-40">{col2.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
            <div className="space-y-24 md:mt-80">{col3.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center border border-dashed border-zinc-900 rounded-3xl text-center">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-6">No pieces match filters</p>
            <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); setPriceRange("All"); }} className="text-[#d4af37] text-xs border border-[#d4af37] px-8 py-3">Reset</button>
          </div>
        )}
      </div>
    </main>
  )
}

function FilterRow({ label, active, options, onChange }) {
  return (
    <div className="flex items-start md:items-center gap-x-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 w-24">{label}</span>
      <div className="flex flex-wrap gap-x-8 gap-y-4 flex-1">
        {options.map(opt => (
          <button key={opt} onClick={() => onChange(opt)} className={`uppercase text-[11px] tracking-[0.2em] transition-all ${active === opt ? "text-[#d4af37] border-b border-[#d4af37]" : "text-zinc-500 hover:text-white"}`}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product, addToCart }) {
  const [showSizes, setShowSizes] = useState(false);
  const imageSrc = product.image.startsWith('http') ? product.image : `${IMG_BASE_URL}${product.image}`
  const isSoldOut = product.totalStock <= 0

  return (
    <div className="group relative" onMouseLeave={() => setShowSizes(false)}>
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-900 shadow-2xl">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {isSoldOut && <span className="bg-zinc-900/90 text-zinc-500 text-[8px] px-3 py-1 rounded-full uppercase font-bold">Sold Out</span>}
          </div>

          <img 
            // src={imageSrc} 
            src={product.image}
            alt={product.name} 
            className={`w-full h-full object-cover transition duration-1000 group-hover:scale-110 ${isSoldOut ? 'grayscale opacity-40' : 'group-hover:opacity-40'}`} 
          />
          
          {!isSoldOut && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
              {!showSizes ? (
                <button 
                  onClick={(e) => { e.preventDefault(); setShowSizes(true); }}
                  className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#d4af37] transition-colors"
                >
                  Quick Add
                </button>
              ) : (
                <div className="bg-black/80 backdrop-blur-md p-4 w-full border border-white/10 animate-in fade-in zoom-in duration-300">
                   <p className="text-[8px] text-[#d4af37] uppercase tracking-widest text-center mb-3">Select Size</p>
                   <div className="flex flex-wrap justify-center gap-2">
                     {Object.entries(product.sizes || {}).map(([size, stock]) => (
                       <button
                         key={size}
                         disabled={stock <= 0}
                         onClick={(e) => {
                           e.preventDefault();
                           addToCart({ ...product, selectedSize: size });
                           setShowSizes(false);
                         }}
                         className={`w-8 h-8 text-[9px] border flex items-center justify-center transition-all ${stock <= 0 ? 'opacity-20 cursor-not-allowed border-zinc-700' : 'border-zinc-500 hover:border-[#d4af37] hover:text-[#d4af37]'}`}
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
      </Link>

      <div className="mt-8 flex justify-between items-start px-2">
        <div>
          <h3 className="text-[10px] uppercase text-zinc-600 mb-1">{product.sub}</h3>
          <h2 className={`text-lg font-bold uppercase italic ${isSoldOut ? 'text-zinc-600' : 'group-hover:text-[#d4af37]'}`}>{product.name}</h2>
        </div>
        <p className={`text-xl font-light ${isSoldOut ? 'text-zinc-700 line-through' : 'text-[#d4af37]'}`}>₹{Number(product.price).toLocaleString()}</p>
      </div>
    </div>
  )
}