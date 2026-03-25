"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import axios from "axios"
import { Search, Box, AlertTriangle, X, ShoppingBag } from "lucide-react"

// const API_URL = "http://localhost:5000/api/products"
// const IMG_BASE_URL = "http://localhost:5000/"

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

  // Fetch products from backend
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
  
  // Logic to determine which Sub-Categories to show
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
    // If we change the main category, reset the sub-category to "All"
    if (setter === setActiveCategory) setActiveSubCategory("All")
    setTimeout(() => setIsFiltering(false), 300)
  }

  const filteredItems = useMemo(() => {
    return dbProducts.filter(item => {
      // 1. Search Query Match
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      // 2. Main Category Match (Normalizing "T-Shirts" to "tshirts")
      const normalizedDataCat = item.type.toLowerCase().replace("-", "") 
      const normalizedActiveCat = activeCategory.toLowerCase().replace("-", "")
      const matchCategory = activeCategory === "All" || normalizedDataCat === normalizedActiveCat
      
      // 3. Sub-Category Match
      const matchSubCategory = activeSubCategory === "All" || item.sub === activeSubCategory

      // 4. Price Match
      const priceObj = priceFilters.find(p => p.label === priceRange)
      const matchPrice = item.price >= (priceObj?.min || 0) && item.price <= (priceObj?.max || 100000)
      
      return matchSearch && matchCategory && matchSubCategory && matchPrice
    })
  }, [dbProducts, searchQuery, activeCategory, activeSubCategory, priceRange])

  // Masonry layout splits
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
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d4af37] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="SEARCH NETRUTV PIECES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 py-3 pl-8 outline-none focus:border-[#d4af37] transition-all placeholder:text-zinc-700 text-xs tracking-widest"
              />
              {searchQuery && <X className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer" size={14} onClick={() => setSearchQuery("")} />}
            </div>
          </div>
          
          <div className="space-y-10 border-y border-zinc-900 py-12">
            {/* Main Category Row */}
            <FilterRow label="Category" active={activeCategory} options={categories} onChange={(val) => handleFilterChange(setActiveCategory, val)} />
            
            {/* SUB-CATEGORY ROW (Only shows if a category is selected) */}
            {subCategories.length > 0 && (
              <FilterRow 
                label="Type" 
                active={activeSubCategory} 
                options={subCategories} 
                onChange={(val) => handleFilterChange(setActiveSubCategory, val)} 
              />
            )}

            {/* Price Row */}
            <FilterRow label="Price" active={priceRange} options={priceFilters.map(p => p.label)} onChange={(val) => handleFilterChange(setPriceRange, val)} />
          </div>
        </header>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-opacity duration-500 ${isFiltering ? "opacity-0" : "opacity-100"}`}>
            <div className="space-y-24">{col1.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
            <div className="space-y-24 md:mt-40">{col2.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
            <div className="space-y-24 md:mt-80">{col3.map(item => <ProductCard key={item._id} product={item} addToCart={addToCart} />)}</div>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center border border-dashed border-zinc-900 rounded-3xl text-center px-4">
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mb-6">No pieces match your current filters</p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setPriceRange("All"); }} 
              className="text-[#d4af37] text-xs uppercase tracking-widest border border-[#d4af37] px-8 py-3 hover:bg-[#d4af37] hover:text-black transition duration-500"
            >
              Reset All
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

function FilterRow({ label, active, options, onChange }) {
  return (
    <div className="flex items-start md:items-center gap-x-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 w-24 mt-1 md:mt-0">{label}</span>
      <div className="flex flex-wrap gap-x-8 gap-y-4 flex-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`uppercase text-[11px] tracking-[0.2em] transition-all duration-300 font-medium ${active === opt ? "text-[#d4af37] border-b border-[#d4af37]" : "text-zinc-500 hover:text-white"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product, addToCart }) {
  const imageSrc = product.image.startsWith('http') ? product.image : `${IMG_BASE_URL}${product.image}`
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isSoldOut = product.stock <= 0

  return (
    <div className="group relative">
      <Link href={`/product/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-900 shadow-2xl">
          
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.modelUrl && (
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                <Box size={10} className="text-[#d4af37]" />
                <span className="text-[8px] uppercase tracking-tighter text-white font-bold">3D Asset</span>
              </div>
            )}
            {isLowStock && !isSoldOut && (
              <div className="bg-red-950/60 backdrop-blur-md border border-red-500/20 px-3 py-1 rounded-full flex items-center gap-2 text-red-400">
                <AlertTriangle size={10} />
                <span className="text-[8px] uppercase tracking-tighter font-bold">Limited</span>
              </div>
            )}
            {isSoldOut && (
              <div className="bg-zinc-900/90 border border-zinc-700 px-3 py-1 rounded-full text-zinc-500">
                <span className="text-[8px] uppercase tracking-tighter font-bold">Sold Out</span>
              </div>
            )}
          </div>

          <img 
            src={imageSrc} 
            alt={product.name} 
            className={`w-full h-full object-cover transition duration-1000 group-hover:scale-110 ${isSoldOut ? 'grayscale opacity-40' : 'group-hover:opacity-60'}`} 
          />
          
          {!isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button 
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#d4af37] transition-colors shadow-2xl"
              >
                <ShoppingBag size={14} className="inline mr-2" /> Quick Add
              </button>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-8 flex justify-between items-start px-2">
        <div className="max-w-[70%]">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-1">{product.sub}</h3>
          <h2 className={`text-lg font-bold leading-tight transition-colors uppercase italic ${isSoldOut ? 'text-zinc-600' : 'group-hover:text-[#d4af37]'}`}>
            {product.name}
          </h2>
        </div>
        <p className={`text-xl font-light ${isSoldOut ? 'text-zinc-700 line-through' : 'text-[#d4af37]'}`}>
          ₹{Number(product.price).toLocaleString()}
        </p>
      </div>
    </div>
  )
}