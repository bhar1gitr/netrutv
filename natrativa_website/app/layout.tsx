import { CartProvider } from "@/context/cart-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoPreloader from "@/components/video-preloader"; // Import your new component
import { AuthProvider } from '@/context/auth-context'
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        {/* The CartProvider wraps everything to share state */}
        <AuthProvider>
          <CartProvider>

            {/* 1. The Video Preloader sits at the top level to cover the screen */}
            <VideoPreloader />

            {/* 2. The standard site layout remains below */}
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}