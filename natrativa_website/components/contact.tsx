"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  
  const whatsappNumber = "917039674351" 
  const whatsappMessage = encodeURIComponent("Greetings NETRUTV Concierge. I'm interested in your collections.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  const emailAddress = "netrutvainternational@gmail.com"

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 px-6 lg:px-24 bg-black text-white border-t border-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-[#d4af37]">
            Connect With Us
          </h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Get in Touch
          </h3>
          <div className="h-[1px] w-12 bg-[#d4af37]" />
        </div>

        <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-light max-w-2xl mx-auto">
          Reach out via our premium concierge services to inquire about the archive or custom collections.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* WhatsApp Link */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-[#d4af37] text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06a9.879 9.879 0 00-3.464.608l.564 2.173 1.888-.959a9.877 9.877 0 018.368 1.215l.341-.11a9.876 9.876 0 015.52 5.588l.325 1.001 2.04-1.111a9.88 9.88 0 00-1.51-5.26 9.877 9.877 0 00-8.769-4.479z" />
            </svg>
            Chat on WhatsApp
          </a>
          
          {/* Copy Email Button */}
          <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyEmail}
              className={`w-full sm:w-auto px-10 py-5 border font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 ${
                copied 
                ? "bg-white text-black border-white" 
                : "bg-transparent text-white border-zinc-800 hover:border-white"
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} className="animate-in fade-in zoom-in duration-300" />
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy Email Address
                </>
              )}
            </button>
            
            {/* <p className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] font-medium">
              {emailAddress}
            </p> */}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="h-px w-8 bg-zinc-800" />
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em]">Response Window</p>
          <p className="text-[#d4af37] font-playfair italic text-lg tracking-wide">2 — 4 Hours</p>
        </div>
      </div>
    </section>
  )
}