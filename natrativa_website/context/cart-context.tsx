// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// export interface CartItem {
//   id: string | number
//   name: string
//   price: string
//   quantity: number
//   image: string
// }

// interface CartContextType {
//   items: CartItem[]
//   addToCart: (item: Omit<CartItem, "quantity">) => void
//   removeFromCart: (id: string | number) => void
//   updateQuantity: (id: string | number, quantity: number) => void
//   clearCart: () => void
//   total: string
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   // Initialize items as empty, then load from localStorage in useEffect
//   const [items, setItems] = useState<CartItem[]>([])
//   const [isLoaded, setIsLoaded] = useState(false)

//   // 1. Load data from localStorage on initial mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem("netrutv_cart")
//     if (savedCart) {
//       try {
//         setItems(JSON.parse(savedCart))
//       } catch (error) {
//         console.error("Failed to parse cart from localStorage", error)
//       }
//     }
//     setIsLoaded(true)
//   }, [])

//   // 2. Save data to localStorage whenever items change
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem("netrutv_cart", JSON.stringify(items))
//     }
//   }, [items, isLoaded])

//   const addToCart = (item: Omit<CartItem, "quantity">) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id)
//       if (existingItem) {
//         return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//       }
//       return [...prevItems, { ...item, quantity: 1 }]
//     })
//   }

//   const removeFromCart = (id: string | number) => {
//     setItems((prevItems) => prevItems.filter((i) => i.id !== id))
//   }

//   const updateQuantity = (id: string | number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id)
//       return
//     }
//     setItems((prevItems) => prevItems.map((i) => (i.id === id ? { ...i, quantity } : i)))
//   }

//   const clearCart = () => setItems([])

//   const total = items
//     .reduce((sum, item) => {
//       const priceString = String(item.price || "0")
//       const numericPrice = Number.parseFloat(priceString.replace(/[₹$,]/g, "")) || 0
//       return sum + numericPrice * item.quantity
//     }, 0)
//     .toLocaleString('en-IN', {
//       maximumFractionDigits: 0, // Set to 0 if you don't want decimals for Rupee
//       style: 'currency',
//       currency: 'INR'
//     })

//   return (
//     <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (!context) throw new Error("useCart must be used within CartProvider")
//   return context
// }








"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const BASE_URL = "https://netrutv-server.onrender.com";
// const BASE_URL = "http://localhost:5000"

interface CartItem {
  id: string       
  productId: string
  name: string
  price: any
  image: string
  quantity: number
  size: string     
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState("₹0")
  const [isLoaded, setIsLoaded] = useState(false) // Prevents hydration mismatch

  // 1. Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem("netrutv_cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // 2. Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("netrutv_cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  // 3. Calculate total
  useEffect(() => {
    const subtotal = items.reduce((acc, item) => {
      const priceString = String(item.price || "0")
      const numericPrice = parseFloat(priceString.replace(/[₹, ]/g, "")) || 0
      return acc + (numericPrice * item.quantity)
    }, 0)
    setTotal(`₹${subtotal.toLocaleString("en-IN")}`)
  }, [items])

  const addToCart = (product: any) => {
    setItems((prev) => {
      const prodId = product._id || product.id
      const selectedSize = product.selectedSize || "N/A"
      const uniqueId = `${prodId}-${selectedSize}`
      
      const existing = prev.find((item) => item.id === uniqueId)
      
      let imageUrl = product.image || "";
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      if (existing) {
        return prev.map((item) =>
          item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [
        ...prev,
        {
          id: uniqueId,
          productId: prodId,
          name: product.name,
          price: product.price,
          image: imageUrl,
          quantity: 1,
          size: selectedSize,
        },
      ]
    })
  }

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id))

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("netrutv_cart")
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {/* Only render children after checking localStorage to prevent UI flicker/mismatch */}
      {isLoaded ? children : <div className="bg-black min-h-screen" />}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}