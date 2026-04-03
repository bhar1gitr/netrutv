'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('https://netrutv-server.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            // Check if the response is JSON before parsing
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json()
                if (res.ok) {
                    login({ name: data.user.name, email: data.user.email }, data.token)
                    router.push('/')
                } else {
                    alert(data.msg || "Invalid Credentials")
                }
            } else {
                // This captures the "Server error" plain text
                const textError = await res.text();
                console.error("Backend Error:", textError);
                alert("Server is having trouble. Check backend console.");
            }
        } catch (err) {
            console.error("Connection Error:", err)
            alert("Cannot connect to server. Is the backend running?")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-[450px] space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-[#d4af37] text-[10px] uppercase tracking-[0.6em] font-bold font-sans">
                        Welcome Back
                    </h2>
                    <h1 className="text-5xl sm:text-6xl italic font-serif tracking-tight">Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-10">
                    <div className="space-y-8">
                        <div className="border-b border-zinc-800 focus-within:border-[#d4af37] transition-all">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                required
                                className="w-full bg-transparent py-4 outline-none text-[10px] tracking-[0.3em] placeholder:text-zinc-700 uppercase"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="border-b border-zinc-800 focus-within:border-[#d4af37] transition-all">
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                required
                                className="w-full bg-transparent py-4 outline-none text-[10px] tracking-[0.3em] placeholder:text-zinc-700 uppercase"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-[#d4af37] text-black text-[11px] font-black uppercase tracking-[0.4em] py-5 hover:bg-white transition-all duration-500 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Secure Sign In'}
                    </button>
                </form>

                <div className="flex flex-col items-center gap-4">
                    <Link href="/signup" className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                        Create an Account
                    </Link>
                    <div className="h-[1px] w-12 bg-[#d4af37]/30" />
                </div>
            </div>
        </div>
    )
}