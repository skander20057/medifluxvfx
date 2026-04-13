import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediFlux - OS Médical Premium",
  description: "Plateforme de gestion médicale nouvelle génération",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-black antialiased overflow-x-hidden`}>
        {/* Atmosphere Layer */}
        <div className="fixed inset-0 z-[-1] bg-mesh pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-green/5 blur-[120px] rounded-full animate-glow-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-green/3 blur-[100px] rounded-full animate-glow-slow [animation-delay:4s]" />
        </div>
        
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
