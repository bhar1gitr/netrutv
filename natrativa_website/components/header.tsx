'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import logo from '../public/logo.jpeg'
import CartSidebar from './CartSidebar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const pathname = usePathname()
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: 'Collections', href: '/collections' },
    { name: 'Our Story', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 w-full z-[60] transition-all duration-700 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-[#d4af37]/20 shadow-2xl' 
          : 'bg-transparent py-8'
      }`}>
        <nav className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="group flex items-center relative z-[70]">
            <div className="relative h-8 w-32 sm:h-12 sm:w-52 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src={logo} 
                alt="NETRUTV" 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`relative text-[10px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 group ${
                    isActive ? 'text-[#d4af37]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#d4af37] transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 sm:gap-10 relative z-[70]">
            {/* CART TRIGGER */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative group p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white group-hover:text-[#d4af37] transition-colors">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden flex flex-col items-end gap-1.5 p-2 transition-all"
              aria-label="Toggle Menu"
            >
              <div className={`h-[1px] bg-white transition-all duration-500 ${isOpen ? 'w-7 -rotate-45 translate-y-[4px]' : 'w-7'}`} />
              <div className={`h-[1px] bg-[#d4af37] transition-all duration-500 ${isOpen ? 'w-7 rotate-45 -translate-y-[4px]' : 'w-4'}`} />
            </button>
          </div>
        </nav>

        {/* MOBILE OVERLAY MENU */}
        <div className={`fixed inset-0 h-screen w-full bg-black/95 backdrop-blur-2xl z-[50] transition-all duration-500 md:hidden ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-4" />
            
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-light tracking-[0.2em] text-white hover:text-[#d4af37] transition-all duration-300 uppercase"
                style={{ 
                  transitionDelay: isOpen ? `${i * 100 + 200}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isOpen ? 1 : 0
                }}
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mt-4" />
            
            {/* Mobile Socials or Extra Info */}
            <div 
              className="mt-8 text-[10px] tracking-[0.3em] text-zinc-500 uppercase"
              style={{ 
                transitionDelay: isOpen ? '600ms' : '0ms',
                opacity: isOpen ? 1 : 0 
              }}
            >
              Excellence Redefined
            </div>
          </div>
        </div>
      </header>

      {/* CART SIDEBAR COMPONENT */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}