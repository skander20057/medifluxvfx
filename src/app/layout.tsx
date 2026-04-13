import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ViewProvider } from "@/context/ViewContext";

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
        <ViewProvider>
          {/* V5 Atmosphere Layer */}
          <div className="atmosphere-mesh" />
          
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
        </ViewProvider>
      </body>
    </html>
  );
}
