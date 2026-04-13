import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediFlux | Portail Médical Premium",
  description: "Système de gestion médicale intelligente de haute performance.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-bg-main text-white antialiased`}>
        <div className="relative min-height-screen overflow-hidden">
          {/* Background Glow Overlay */}
          <div className="pointer-events-none absolute -top-1/2 -left-1/2 w-full h-full bg-accent-green/5 blur-[120px] rounded-full" />
          <div className="pointer-events-none absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent-green/5 blur-[120px] rounded-full" />
          
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
