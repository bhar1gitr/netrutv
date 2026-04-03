// "use client"

// import { useCart } from "@/context/cart-context"
// import { X, Plus, Minus, Trash2 } from "lucide-react"

// export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const BASE_URL = "https://netrutv-server.onrender.com";

//   const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()

//   const handleCheckout = () => {
//     if (items.length === 0) return

//     // 1. Format the cart items for the WhatsApp message
//     const cartSummary = items
//       .map((item) => {
//         // Strip out currency symbols and commas for calculation
//         const itemPrice = parseFloat(item.price.replace(/[₹, ]/g, ""))
//         const lineTotal = (itemPrice * item.quantity).toLocaleString('en-IN')
//         return `▪ ${item.name} (x${item.quantity}) - ₹${lineTotal}`
//       })
//       .join("\n")

//     // 2. Create the Premium Concierge Message
//     const message = `Greetings NETRUTV Concierge. I would like to finalize my collection:\n\n${cartSummary}\n\n*Total Value: ${total}*`

//     // 3. TARGET NUMBER: 917039674351
//     window.open(`https://wa.me/917039674351?text=${encodeURIComponent(message)}`, "_blank")

//     // 4. Clear the cart and close the sidebar
//     clearCart()
//     onClose()
//   }

//   return (
//     <>
//       {/* Overlay Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={onClose}
//       />

//       {/* Sidebar Panel */}
//       <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#050505] z-[70] shadow-2xl border-l border-[#d4af37]/20 transform transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

//         {/* Header */}
//         <div className="p-8 border-b border-zinc-900 flex justify-between items-start">
//           <div>
//             <h2 className="font-playfair text-2xl text-white font-bold">Your Collection</h2>
//             <p className="text-[10px] uppercase tracking-widest text-[#d4af37] mt-1">Netrutv Curated Selection</p>
//           </div>
//           <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors mt-1">
//             <X size={24} strokeWidth={1} />
//           </button>
//         </div>

//         {/* Items List */}
//         <div className="flex-1 overflow-y-auto p-8 space-y-8 h-[calc(100vh-250px)] no-scrollbar">
//           {items.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
//               <p className="font-playfair italic text-xl text-zinc-500">The collection is empty</p>
//               <button onClick={onClose} className="mt-4 text-[10px] uppercase tracking-widest text-[#d4af37] underline underline-offset-8 transition-colors hover:text-white">
//                 Return to Gallery
//               </button>
//             </div>
//           ) : (
//             items.map((item) => (
//               <div key={item.id} className="flex gap-6 group">
//                 <div className="relative w-20 h-24 bg-zinc-950 border border-zinc-900 overflow-hidden">
//                   {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" /> */}
//                   <img
//                     src={item.image.startsWith('http') ? item.image : `${BASE_URL}${item.image}`}
//                     alt={item.name}
//                     className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
//                   />
//                 </div>

//                 <div className="flex-1 space-y-2">
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-xs font-bold text-zinc-300 tracking-wider uppercase">{item.name}</h3>
//                     <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors ml-2">
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                   <p className="text-[#d4af37] font-playfair italic text-lg">{item.price}</p>

//                   <div className="flex items-center gap-4 mt-4">
//                     <div className="flex items-center border border-zinc-800 rounded-sm bg-black">
//                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-zinc-500 hover:text-white transition-colors"><Minus size={12} /></button>
//                       <span className="px-2 text-[10px] font-bold text-white tabular-nums">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-zinc-500 hover:text-white transition-colors"><Plus size={12} /></button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer Checkout */}
//         {items.length > 0 && (
//           <div className="absolute bottom-0 left-0 w-full p-8 bg-black border-t border-zinc-900 space-y-6">
//             <div className="flex justify-between items-end">
//               <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Subtotal Value</span>
//               <span className="text-2xl font-playfair text-[#d4af37]">{total}</span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="w-full bg-[#d4af37] text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
//             >
//               Finalize Order via Concierge
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }





"use client"

import { useCart } from "@/context/cart-context"
import { X, Plus, Minus, Trash2 } from "lucide-react"

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    
    const cartSummary = items
      .map((item) => {
        const p = String(item.price).replace(/[₹, ]/g, "")
        const lineTotal = (parseFloat(p) * item.quantity).toLocaleString('en-IN')
        // Include SIZE and formatted line total
        return `▪ ${item.name} [Size: ${item.size}] (x${item.quantity}) - ₹${lineTotal}`
      })
      .join("\n")

    // Added netrutv.com to the message template
    const message = `Greetings NETRUTV Concierge. I would like to finalize my collection from netrutv.com:\n\n${cartSummary}\n\n*Total Value: ${total}*\n\nSent via: https://netrutv.com`
    
    // Open WhatsApp with the updated message
    window.open(`https://wa.me/917039674351?text=${encodeURIComponent(message)}`, "_blank")
    
    // Cleanup
    clearCart()
    onClose()
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

      <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#080808] z-[70] border-l border-[#d4af37]/20 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="font-serif text-xl text-white">Collection</h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-center text-zinc-600 italic">Empty collection</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* Image Container */}
                  <div className="w-16 h-20 bg-zinc-900 overflow-hidden border border-white/5 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image")}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold truncate">{item.name}</h3>
                      {/* SIZE BADGE */}
                      <span className="ml-2 px-1.5 py-0.5 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[8px] font-bold rounded">
                        {item.size}
                      </span>
                    </div>
                    <p className="text-[#d4af37] font-serif mt-0.5">
                      {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-3 border border-white/5 px-2 py-1 rounded">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-500 hover:text-white"><Minus size={10}/></button>
                        <span className="text-[10px] text-white w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-500 hover:text-white"><Plus size={10}/></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-zinc-700 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-zinc-950 border-t border-white/5">
              <div className="flex justify-between mb-6">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Total Value</span>
                <span className="text-[#d4af37] font-serif text-xl">{total}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="w-full bg-[#d4af37] text-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
              >
                Contact Concierge
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}