"use client"

import Link from "next/image"
import Image from "next/image"
import logo from "../public/logo.jpeg"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="relative h-10 w-40">
              <Image 
                src={logo} 
                alt="NETRUTV" 
                fill 
                className="object-contain" 
              />
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Defining the standard of modern leadership through precision-engineered apparel. By Leaderskey.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Collection</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li>
                <a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">All Collections</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">New Arrivals</a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">Limited Release</a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">The House</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li>
                <a href="#about" className="hover:text-[#d4af37] transition-colors duration-300">Our Vision</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4af37] transition-colors duration-300">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37] transition-colors duration-300">Shipping & Returns</a>
              </li>
            </ul>
          </div>

          {/* Follow Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li>
                <a href="#" className="hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2">
                   Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37] transition-colors duration-300">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37] transition-colors duration-300">TikTok</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600">
          <p className="font-medium">
            &copy; 2026 <span className="text-[#d4af37]">NETRUTV</span>. All rights reserved.
          </p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}