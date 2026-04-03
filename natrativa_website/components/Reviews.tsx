'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { Star, Lock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { jwtDecode } from 'jwt-decode' // Import the decoder

export default function ReviewSection({ productId, reviews: initialReviews }: any) {
    const { user } = useAuth()
    const [reviews, setReviews] = useState(initialReviews || [])
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(5)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setReviews(initialReviews || [])
    }, [initialReviews])

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Get token and decode the ID
        const token = localStorage.getItem('token');
        let decodedId = null;

        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                decodedId = decoded.id; // Your backend signed the token with { id: user._id }
            } catch (err) {
                console.error("Token decoding failed", err);
            }
        }

        // 2. Final check before sending
        const finalUserId = decodedId || user?._id;

        if (!finalUserId) {
            alert("Session expired. Please sign in again.");
            return;
        }

        setLoading(true);

        const res = await fetch(`https://netrutv-server.onrender.com/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rating,
                comment,
                userId: finalUserId,
                name: user?.name || "Verified Leader"
            })
        }).catch(() => null);

        if (!res) {
            setLoading(false);
            return;
        }

        const data = await res.json();

        if (res.ok) {
            setReviews(data.reviews);
            setComment('');
            setRating(5);
        } else {
            alert(data.msg || "Failed to post review");
        }

        setLoading(false);
    };

    return (
        <div className="mt-24 border-t border-zinc-900 pt-16 max-w-4xl">
            <h2 className="text-3xl italic font-serif mb-12 uppercase tracking-tighter text-white">Guest Narratives</h2>

            <div className="mb-16 bg-zinc-950 p-8 border border-zinc-900 shadow-2xl">
                {user ? (
                    <form onSubmit={submitReview} className="space-y-6">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-bold">Authenticated as {user.name}</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={14}
                                        className={`cursor-pointer transition-colors ${star <= rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-zinc-800'}`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                        </div>
                        <textarea
                            className="w-full bg-black border border-zinc-900 p-5 text-sm text-zinc-400 outline-none focus:border-[#d4af37] transition-all min-h-[120px] italic"
                            placeholder="Your perspective on this piece..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        <button className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#d4af37] transition-all duration-500">
                            {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Publish Review'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-10">
                        <Lock className="mx-auto mb-4 text-zinc-800" size={24} />
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Sign in to share your narrative</p>
                        <Link href="/login" className="text-[#d4af37] text-[10px] font-bold uppercase underline tracking-[0.4em] decoration-[#d4af37]/30">Enter Portal</Link>
                    </div>
                )}
            </div>

            <div className="space-y-12">
                {reviews?.length > 0 ? [...reviews].reverse().map((r: any, i: number) => (
                    <div key={i} className="border-b border-zinc-900/50 pb-10 last:border-0">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-black text-white">{r.name}</p>
                                <div className="flex gap-1 mt-1">
                                    {Array.from({ length: r.rating }).map((_, i) => (
                                        <Star key={i} size={10} className="fill-[#d4af37] text-[#d4af37]" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
                                {new Date(r.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed font-light italic">"{r.comment}"</p>
                    </div>
                )) : (
                    <p className="text-zinc-700 text-[10px] uppercase tracking-[0.5em] italic text-center py-10">Waiting for first narrative...</p>
                )}
            </div>
        </div>
    )
}