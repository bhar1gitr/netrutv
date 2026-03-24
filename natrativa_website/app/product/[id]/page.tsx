"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import axios from "axios"
import { Box, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const API_URL = "http://localhost:5000/api/products"
const IMG_BASE_URL = "http://localhost:5000/"

export default function ProductDetails() {
  const { id } = useParams() // This gets the MongoDB _id from the URL
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Fetching from your Node.js server using the MongoDB _id
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
      <p className="text-zinc-500 mb-8 text-sm">This item may have been removed or the ID is incorrect.</p>
      <Link href="/collections" className="text-[#d4af37] border border-[#d4af37] px-8 py-3 uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black transition">
        Return to Collections
      </Link>
    </div>
  )

  const isSoldOut = product.stock <= 0
  const imageSrc = product.image.startsWith('http') ? product.image : `${IMG_BASE_URL}${product.image}`

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
                src={imageSrc}
                alt={product.name}
                className={`w-full h-full object-cover ${isSoldOut ? 'grayscale opacity-50' : ''}`}
              />
            </div>
            {product.modelUrl && (
              <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full cursor-pointer hover:bg-[#d4af37] transition">
                <Box size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">3D Experience</span>
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <header className="mb-8">
              <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">{product.sub}</h3>
              <h1 className="text-6xl font-bold tracking-tighter mb-4 italic uppercase">{product.name}</h1>
              <p className="text-4xl font-light text-[#d4af37]">₹{Number(product.price).toLocaleString()}</p>
            </header>

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
                  <span>Stock Availability</span>
                  <span className={isSoldOut ? "text-red-500" : "text-green-500"}>
                    {isSoldOut ? "Sold Out" : `${product.stock} Units`}
                  </span>
               </div>
            </div>

            {!isSoldOut ? (
              <button
                onClick={() => addToCart(product)}
                className="bg-[#d4af37] text-black w-full py-5 font-bold uppercase tracking-widest hover:bg-white transition flex items-center justify-center gap-3"
              >
                <ShoppingBag size={18} /> Add to Cart
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