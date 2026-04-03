"use client"

import { useState } from "react"
import Image from "next/image"
import logo from "../public/logo.jpeg"

export default function Footer() {
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode } | null>(null)

  const policies = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-zinc-400 text-sm">
          <p>At Netrutva Internationals, we respect your privacy. This policy outlines how we handle your data.</p>
          <h5 className="text-white font-bold">1. Information Collection</h5>
          <p>We collect information you provide directly, such as when you create an account, make a purchase, or contact our support team.</p>
          <h5 className="text-white font-bold">2. Use of Information</h5>
          <p>Your data is used to process transactions, improve our apparel collections, and send updates regarding your orders.</p>
          <h5 className="text-white font-bold">3. Data Protection</h5>
          <p>We implement industry-standard encryption to ensure your personal and payment information remains secure.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-zinc-400 text-sm">
          <p>By accessing Netrutva Internationals, you agree to the following terms.</p>
          <h5 className="text-white font-bold">1. Luxury Standards</h5>
          <p>Our apparel is precision-engineered. Minor variations in texture are a hallmark of bespoke quality.</p>
          <h5 className="text-white font-bold">2. Intellectual Property</h5>
          <p>All designs, imagery, and branding are the exclusive property of Netrutva Internationals and Leaderskey.</p>
          <h5 className="text-white font-bold">3. Shipping & Liability</h5>
          <p>We are not responsible for delays caused by international customs, though we will assist in tracking all premium shipments.</p>
        </div>
      )
    }
  }

  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="relative h-10 w-40">
              <Image 
                src={logo} 
                alt="Netrutva Internationals" 
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
              <li><a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">All Collections</a></li>
              <li><a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">New Arrivals</a></li>
              <li><a href="#products" className="hover:text-[#d4af37] transition-colors duration-300">Limited Release</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">The House</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><a href="#about" className="hover:text-[#d4af37] transition-colors duration-300">Our Vision</a></li>
              <li><a href="#contact" className="hover:text-[#d4af37] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Follow Column */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-light">
              <li><a href="https://www.instagram.com/netrutvainternationals/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">Instagram</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61587194071192" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">Facebook</a></li>
              <li><a href="https://www.linkedin.com/in/netrutva-internationals-4b62b63a9/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">LinkedIn</a></li>
              <li><a href="https://x.com/NetrutvaIntl" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">X (Twitter)</a></li>
              <li><a href="https://in.pinterest.com/netrutvainternational/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors duration-300">Pinterest</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} <span className="text-[#d4af37]">NETRUTVA INTERNATIONALS</span>. All rights reserved.
          </p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <button 
              onClick={() => setModalContent(policies.privacy)}
              className="hover:text-white transition-colors uppercase"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setModalContent(policies.terms)}
              className="hover:text-white transition-colors uppercase"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 rounded-lg relative">
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-xl"
            >
              &times;
            </button>
            <h3 className="text-[#d4af37] text-lg font-bold mb-6 tracking-widest uppercase">
              {modalContent.title}
            </h3>
            <div className="mb-4">
              {modalContent.body}
            </div>
            <button 
              onClick={() => setModalContent(null)}
              className="mt-6 w-full bg-[#d4af37] text-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#b8962e] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}