"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import axios from "axios"
import { Box, ShoppingBag, ArrowLeft, Loader2, Check } from "lucide-react"
import Link from "next/link"

// const API_URL = "http://localhost:5000/api/products"
// const IMG_BASE_URL = "http://localhost:5000/"

const API_URL = "https://netrutv-server.onrender.com/api/products"
const IMG_BASE_URL = "https://netrutv-server.onrender.com/"

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedSize, setSelectedSize] = useState("") // Track selected size

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
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
      <span className="uppercase tracking-[0.3em] text-[10px]">Loading Piece...</span>
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h2 className="text-4xl font-bold mb-4 italic uppercase">Piece Not Found</h2>
      <Link href="/collections" className="text-[#d4af37] border border-[#d4af37] px-8 py-3 uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black transition">
        Return to Collections
      </Link>
    </div>
  )

  const isSoldOut = product.totalStock <= 0
  const imageSrc = product.image.startsWith('http') ? product.image : `${IMG_BASE_URL}${product.image}`

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.")
      return
    }
    // Pass product with selected size to cart
    addToCart({ ...product, selectedSize })
  }

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <Link href="/collections" className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#d4af37] transition mb-12 uppercase text-[10px] tracking-widest">
          <ArrowLeft size={14} /> Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-32">
          
          {/* IMAGE */}
          <div className="relative">
            <div className="border border-zinc-900 bg-zinc-950 aspect-[4/5] overflow-hidden">
              <img
                // src={imageSrc}
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover ${isSoldOut ? 'grayscale opacity-50' : ''}`}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <header className="mb-8">
              <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">{product.sub}</h3>
              <h1 className="text-6xl font-bold tracking-tighter mb-4 italic uppercase">{product.name}</h1>
              <p className="text-4xl font-light text-[#d4af37]">₹{Number(product.price).toLocaleString()}</p>
            </header>

            {/* SIZES SELECTION */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] uppercase text-zinc-500 tracking-widest">Select Size</h4>
                {selectedSize && (
                  <span className="text-[10px] text-green-500 uppercase tracking-widest">
                    In Stock: {product.sizes[selectedSize]} Units
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(product.sizes || {}).map(([size, stock]) => {
                  const sizeDisabled = stock <= 0
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size}
                      disabled={sizeDisabled}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        min-w-[60px] h-[60px] flex items-center justify-center border text-xs transition-all duration-300
                        ${sizeDisabled ? "border-zinc-900 text-zinc-800 cursor-not-allowed" : "border-zinc-800 hover:border-[#d4af37]"}
                        ${isSelected ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-transparent text-white"}
                      `}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-y border-zinc-900 py-10 mb-10">
              <h4 className="text-[10px] uppercase text-zinc-600 mb-4 tracking-widest">Product Description</h4>
              <p className="text-zinc-400 leading-relaxed font-light">
                {product.description || "No description provided for this exclusive piece."}
              </p>
            </div>

            <div className="space-y-6 mb-12">
               <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                  <span>Category</span>
                  <span className="text-white">{product.type}</span>
               </div>
               <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                  <span>Total Stock</span>
                  <span className={isSoldOut ? "text-red-500" : "text-green-500"}>
                    {isSoldOut ? "Sold Out" : `${product.totalStock} Units Available`}
                  </span>
               </div>
            </div>

            {!isSoldOut ? (
              <button
                onClick={handleAddToCart}
                className="bg-[#d4af37] text-black w-full py-5 font-bold uppercase tracking-widest hover:bg-white transition flex items-center justify-center gap-3 shadow-2xl"
              >
                <ShoppingBag size={18} /> {selectedSize ? `Add Size ${selectedSize} to Cart` : "Select a Size"}
              </button>
            ) : (
              <button disabled className="border border-zinc-800 text-zinc-700 w-full py-5 uppercase tracking-widest cursor-not-allowed">
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}