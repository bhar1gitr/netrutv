'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import logo from '../public/logo.jpeg'
import CartSidebar from './CartSidebar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()
  const { items } = useCart()
  const { user, logout } = useAuth()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Our Story', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 w-full z-[60] transition-all duration-700 ${scrolled
          ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-[#d4af37]/20 shadow-2xl'
          : 'bg-transparent py-8'
        }`}>
        <nav className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center relative z-[70]">
            <div className="relative h-8 w-32 sm:h-12 sm:w-52 transition-transform duration-500 group-hover:scale-105">
              <Image src={logo} alt="NETRUTV" fill className="object-contain" priority />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${pathname === link.href ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 sm:gap-10 relative z-[70]">

            {/* CONDITIONAL AUTH SECTION */}
            {user ? (
              <div className="flex items-center gap-5 pl-4 border-l border-zinc-800">
                <div className="flex items-center gap-3">
                  {/* User Icon - Small and Subtle */}
                  <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

                  <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
                    {user.name.split(' ')[0]}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 hover:text-[#d4af37] transition-all duration-500 py-1"
                >
                  [ Sign Out ]
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-[#d4af37] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-white transition-colors border border-zinc-800 px-4 py-2 rounded-full"
                >
                  Join
                </Link>
              </div>
            )}

            {/* CART TRIGGER */}
            <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white group-hover:text-[#d4af37] transition-colors">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE TOGGLE */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col items-end gap-1.5 p-2">
              <div className={`h-[1px] bg-white transition-all duration-500 ${isOpen ? 'w-7 -rotate-45 translate-y-[4px]' : 'w-7'}`} />
              <div className={`h-[1px] bg-[#d4af37] transition-all duration-500 ${isOpen ? 'w-7 rotate-45 -translate-y-[4px]' : 'w-4'}`} />
            </button>
          </div>
        </nav>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}