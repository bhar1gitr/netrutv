'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://netrutv-server.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) router.push('/login')
      else alert("Registration failed")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-[450px] space-y-12">
        {/* Header matching your Collections UI */}
        <div className="text-center space-y-4">
          <h2 className="text-[#d4af37] text-[10px] uppercase tracking-[0.6em] font-bold">New Member</h2>
          <h1 className="text-5xl sm:text-6xl italic font-serif tracking-tight">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="group border-b border-zinc-800 focus-within:border-[#d4af37] transition-colors">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent py-3 outline-none text-sm tracking-wide"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="group border-b border-zinc-800 focus-within:border-[#d4af37] transition-colors">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent py-3 outline-none text-sm tracking-wide"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="group border-b border-zinc-800 focus-within:border-[#d4af37] transition-colors">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-transparent py-3 outline-none text-sm tracking-wide"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] py-5 hover:bg-[#d4af37] transition-all duration-500"
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-[#d4af37] transition-colors">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  )
}