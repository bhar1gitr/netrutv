"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import ReviewSection from "@/components/Reviews"
import axios from "axios"
import { ShoppingBag, ArrowLeft, Loader2, Star, ShieldCheck, Truck, Tag } from "lucide-react"
import Link from "next/link"

const API_URL = "https://netrutv-server.onrender.com/api/products"

// Helper to calculate sale price
const getSalePrice = (price, discount) => {
  if (!discount) return price;
  if (discount.discountType === 'percentage') {
    return price - (price * discount.value / 100);
  }
  return price - discount.value;
};

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Backend now populates 'discount' in this route
        const res = await axios.get(`${API_URL}/${id}`)
        setProduct(res.data)
        setError(false)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-[#d4af37]">
      <Loader2 className="animate-spin mb-4" size={32} />
      <span className="uppercase tracking-[0.4em] text-[10px] font-bold">Refining Details...</span>
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h2 className="text-4xl font-serif italic mb-6">Archive Piece Not Found</h2>
      <Link href="/collections" className="text-[#d4af37] border border-[#d4af37]/30 px-10 py-4 uppercase text-[10px] tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all duration-700">
        Return to Collections
      </Link>
    </div>
  )

  const isSoldOut = product.totalStock <= 0
  const hasDiscount = !!product.discount
  const salePrice = getSalePrice(product.price, product.discount)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size to continue.")
      return
    }
    // CRITICAL: Passing the calculated salePrice to the cart
    addToCart({ ...product, selectedSize, price: salePrice })
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* BREADCRUMB */}
        <Link href="/collections" className="group inline-flex items-center gap-3 text-zinc-500 hover:text-[#d4af37] transition-all duration-500 mb-16 uppercase text-[9px] tracking-[0.4em] font-bold">
          <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform duration-500" /> 
          Back to Archive
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
          
          {/* LEFT: IMAGE GALLERY (Sticky) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 space-y-4">
              <div className="relative group overflow-hidden border border-zinc-900 bg-zinc-950 aspect-[4/5]">
                {/* DISCOUNT BADGE */}
                {!isSoldOut && hasDiscount && (
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-[#d4af37] text-black text-[12px] px-4 py-2 rounded-sm uppercase font-black tracking-tighter shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center gap-2">
                      <Tag size={14} />
                      {product.discount.discountType === 'percentage' 
                        ? `${product.discount.value}% OFF` 
                        : `₹${product.discount.value} OFF`}
                    </span>
                  </div>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${isSoldOut ? 'grayscale opacity-40' : ''}`}
                />
                {isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="border border-white/20 px-8 py-3 backdrop-blur-md text-[10px] tracking-[0.5em] uppercase font-bold">Sold Out</span>
                  </div>
                )}
              </div>
              <p className="text-[8px] text-zinc-600 uppercase tracking-[0.5em] text-center italic">Professional Studio Capture • Limited Edition Archive</p>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:col-span-5 flex flex-col">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-8 bg-[#d4af37]" />
                <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[0.5em] font-black">
                  {product.sub || "Core Collection"} 
                  {hasDiscount && <span className="ml-3 text-white">/ PROMOTION ACTIVE</span>}
                </h3>
              </div>
              <h1 className="text-5xl sm:text-7xl font-serif italic tracking-tighter mb-6 leading-tight">{product.name}</h1>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-6">
                  {hasDiscount && !isSoldOut ? (
                    <>
                      <p className="text-5xl font-bold tracking-tighter text-[#d4af37] italic">₹{Number(salePrice).toLocaleString()}</p>
                      <p className="text-2xl font-light tracking-tighter text-zinc-600 line-through">₹{Number(product.price).toLocaleString()}</p>
                    </>
                  ) : (
                    <p className="text-4xl font-light tracking-tighter text-white">₹{Number(product.price).toLocaleString()}</p>
                  )}
                </div>
                
                {product.reviews?.length > 0 && (
                  <div className="flex items-center gap-2 text-[#d4af37] mt-2">
                    <Star size={12} className="fill-[#d4af37]" />
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                      {product.reviews.length} Narrative{product.reviews.length > 1 ? 's' : ''} Shared
                    </span>
                  </div>
                )}
              </div>
            </header>

            {/* SIZES */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <h4 className="text-[10px] uppercase text-zinc-400 tracking-[0.3em] font-bold">Select Perspective (Size)</h4>
                <button className="text-[9px] uppercase tracking-widest text-[#d4af37] border-b border-[#d4af37]/20 hover:border-[#d4af37] transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(product.sizes || {}).map(([size, stock]: [string, any]) => {
                  const sizeDisabled = stock <= 0
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size}
                      disabled={sizeDisabled}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        h-14 flex items-center justify-center text-[10px] font-bold transition-all duration-500 border
                        ${sizeDisabled ? "border-zinc-900 text-zinc-800 opacity-30 cursor-not-allowed" : "border-zinc-800 hover:border-[#d4af37]"}
                        ${isSelected ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "bg-transparent text-zinc-400"}
                      `}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="mb-12">
              {!isSoldOut ? (
                <button
                  onClick={handleAddToCart}
                  className="group relative w-full overflow-hidden bg-[#d4af37] text-black py-6 font-black uppercase text-[11px] tracking-[0.5em] transition-all duration-700 hover:bg-white active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    <ShoppingBag size={16} /> 
                    {selectedSize ? `Acquire Size ${selectedSize}` : "Choose Your Fit"}
                  </span>
                </button>
              ) : (
                <button disabled className="w-full border border-zinc-900 py-6 text-zinc-700 uppercase text-[11px] tracking-[0.5em] font-bold cursor-not-allowed">
                  Allocation Exhausted
                </button>
              )}
            </div>

            {/* PRODUCT INFO */}
            <div className="space-y-8 border-t border-zinc-900 pt-12">
              <section>
                <h4 className="text-[10px] uppercase text-[#d4af37] mb-4 tracking-[0.3em] font-bold underline underline-offset-8 decoration-1">The Narrative</h4>
                <p className="text-zinc-400 leading-relaxed font-light text-sm italic">
                  "{product.description || "An essential silhouette designed for the modern visionary. Crafted with precision for the Netrutv lifestyle."}"
                </p>
              </section>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="flex items-start gap-4">
                  <ShieldCheck size={18} className="text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-[10px] uppercase text-white tracking-widest font-bold mb-1">Authentic</p>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">Verified Archive Piece</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck size={18} className="text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-[10px] uppercase text-white tracking-widest font-bold mb-1">Shipping</p>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">Priority Global Dispatch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL WIDTH REVIEWS SECTION */}
        <div className="mt-40 border-t border-zinc-900">
          <ReviewSection 
            productId={product._id} 
            reviews={product.reviews} 
          />
        </div>
      </div>
    </main>
  )
}