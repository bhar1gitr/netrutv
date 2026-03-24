// "use client"

// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// // NO IMPORT NEEDED FOR PUBLIC ASSETS

// export default function VideoPreloader() {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     const hasSeenIntro = sessionStorage.getItem("netrutv_intro_seen")
//     if (hasSeenIntro) {
//       setIsVisible(false)
//     }
//   }, [])

//   const handleVideoEnd = () => {
//     sessionStorage.setItem("netrutv_intro_seen", "true")
//     setIsVisible(false)
//   }

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           exit={{ 
//             y: "-100%", 
//             transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
//           }}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
//         >
//           <video
//             autoPlay
//             muted
//             playsInline
//             onEnded={handleVideoEnd}
//             className="w-full h-full object-cover"
//           >
//             {/* Direct path to your file in the public folder */}
//             <source src="/Video_With_Sound_Effects_Only.mp4" type="video/mp4" />
//           </video>

//           <button 
//             onClick={handleVideoEnd}
//             className="absolute bottom-12 right-12 text-white/40 hover:text-[#d4af37] text-[10px] uppercase tracking-[0.5em] transition-all duration-500 font-bold border-b border-white/10 hover:border-[#d4af37] pb-1"
//           >
//             Skip Intro
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }







// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// const NetrutvPreloader = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const brandName = "NETRUTV";

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 3800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Extremely smooth easing curve (like Apple or high-end fashion sites)
//   const smoothEase = [0.76, 0, 0.24, 1];

//   return (
//     <AnimatePresence>
//       {isLoading && (
//         <motion.div
//           key="loader-container"
//           exit={{ 
//             y: "-100vh",
//             transition: { duration: 1, ease: smoothEase, delay: 0.2 } 
//           }}
//           className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070707]"
//         >
//           {/* Static Subtle Glow - No lag because it doesn't animate */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#d4af37] opacity-5 blur-[100px] rounded-full pointer-events-none" />

//           <div className="relative z-10 flex flex-col items-center">

//             {/* 1. Masked Text Reveal (No shaking, 60fps) */}
//             <div className="flex gap-1 md:gap-2 overflow-hidden px-4 pb-2">
//               {brandName.split("").map((char, i) => (
//                 <motion.span
//                   key={i}
//                   initial={{ y: "110%", opacity: 0 }}
//                   animate={{ y: "0%", opacity: 1 }}
//                   transition={{
//                     duration: 1.2,
//                     ease: smoothEase,
//                     delay: i * 0.08, // Subtle stagger
//                   }}
//                   className="text-6xl md:text-8xl font-black text-white tracking-tighter will-change-transform"
//                 >
//                   {char}
//                 </motion.span>
//               ))}
//             </div>

//             {/* 2. Hardware Accelerated Line Expansion */}
//             <div className="relative w-full h-[1px] bg-white/10 mt-2 overflow-hidden">
//                <motion.div 
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 1.5, ease: smoothEase, delay: 0.8 }}
//                   className="absolute inset-0 bg-[#d4af37] origin-left will-change-transform"
//                />
//             </div>

//             {/* 3. Static Letter Spacing (Fixes the Jitter) */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.5, duration: 1, ease: smoothEase }}
//               className="mt-6 text-[11px] md:text-xs text-[#d4af37] font-medium uppercase tracking-[0.8em] ml-[0.8em]"
//             >
//               By Leaderskey
//             </motion.div>
//           </div>

//           {/* Minimalist Loading Percentage Box */}
//           <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 flex items-center gap-4">
//              <motion.div 
//                initial={{ height: 0 }}
//                animate={{ height: "20px" }}
//                transition={{ delay: 0.5, duration: 1, ease: smoothEase }}
//                className="w-[2px] bg-[#d4af37]"
//              />
//              <motion.div
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1, duration: 1, ease: smoothEase }}
//              >
//                 <p className="text-[#d4af37] text-[10px] tracking-widest uppercase font-medium">Loading</p>
//                 <p className="text-white/40 text-[9px] tracking-widest uppercase">Experience</p>
//              </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default NetrutvPreloader;






"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NetrutvPreloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const brandName = "NETRUTV";

    const montageAssets = [
        // T-SHIRTS / UPPERWEAR (Minimalist & Studio)
        "https://images.unsplash.com/photo-1521572267360-ee072958f397?auto=format&fit=crop&q=80&w=1000", // Minimalist White Editorial
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000", // Black Oversize Textured
        "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=80&w=1000", // Dark Luxury Cotton

        // PANTS / BOTTOMS (Streetwear & Tailored)
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000", // Luxury Cargo/Stitch Details
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000", // Premium Denim Texture
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000", // Tailored Trouser Detail
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1000", // Tech/Luxury Jogger

        // SHIRTS / POLOS (Editorial & High Fashion)
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000", // Luxury Polo/Knitwear
        "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=1000", // Button Down Editorial
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000", // Silk/Premium Fabric Shirt

        // ACCESSORIES / BAGS
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000", // High-end Leather/Duffel
    ];

    useEffect(() => {
        // 3.2 seconds total to allow the montage to play out
        const timer = setTimeout(() => setIsLoading(false), 3200);
        return () => clearTimeout(timer);
    }, []);

    const athleticEase = [0.76, 0, 0.24, 1];

    return (
        <AnimatePresence>
            {isLoading && (
                <>
                    {/* Gold Flash Wipe */}
                    <motion.div
                        key="gold-wipe"
                        initial={{ top: 0 }}
                        exit={{
                            top: "-100vh",
                            transition: { duration: 0.8, ease: athleticEase, delay: 0.1 }
                        }}
                        className="fixed inset-0 z-[9998] bg-[#d4af37]"
                    />

                    {/* Main Loader Container */}
                    <motion.div
                        key="loader-container"
                        exit={{
                            top: "-100vh",
                            transition: { duration: 0.8, ease: athleticEase }
                        }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
                    >

                        {/* --- THE RAPID ASSET MONTAGE --- */}
                        <div className="absolute inset-0 z-0 opacity-60">
                            {montageAssets.map((src, index) => (
                                <motion.img
                                    key={index}
                                    src={src}
                                    alt={`Montage ${index}`}
                                    initial={{ opacity: 0, scale: 1.2 }}
                                    animate={{
                                        opacity: [0, 1, 0], // Flash on and off
                                        scale: 1 // Slight zoom out
                                    }}
                                    transition={{
                                        duration: 0.4, // Extremely fast flash
                                        delay: 0.5 + (index * 0.3), // Staggered one after another
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity" // Makes images black & white for that edgy look
                                />
                            ))}
                        </div>

                        {/* --- HUD / CAMERA ACCENTS (Fills the screen) --- */}
                        <div className="absolute inset-8 z-10 pointer-events-none">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30" />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30" />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30" />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30" />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-0 left-12 text-[9px] text-white/40 font-mono uppercase tracking-widest"
                            >
                                REC &bull; 00:00:{montageAssets.length}
                            </motion.div>
                        </div>

                        {/* --- KINETIC TEXT SLAM --- */}
                        <div className="relative z-20 flex overflow-hidden pb-4">
                            {brandName.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%", scale: 2.5, opacity: 0, rotateZ: 15 }}
                                    animate={{ y: "0%", scale: 1, opacity: 1, rotateZ: 0 }}
                                    transition={{
                                        type: "spring",
                                        damping: 12,
                                        stiffness: 120,
                                        delay: 1.5 + (i * 0.04), // Waits for montage to almost finish before slamming
                                    }}
                                    className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase will-change-transform leading-none mix-blend-difference"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* --- GEOMETRIC BRAND BADGE --- */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.2, type: "spring", damping: 15 }}
                            className="relative z-20 mt-4 bg-[#d4af37] text-black px-6 py-2 flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        >
                            <span className="text-[11px] md:text-sm font-bold uppercase tracking-[0.3em]">
                                By Leaderskey
                            </span>
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-3 h-4 bg-black"
                            />
                        </motion.div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NetrutvPreloader;