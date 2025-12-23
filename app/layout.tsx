import type { Metadata } from "next"; // Importamos el tipo para tener autocompletado
import Navbar from '@/components/layout/Navbar';
import Footer from "@/components/layout/Footer";
import BubblesBackground from '@/components/BubblesBackground';
import './globals.css';

// 1. Configuración de Metadata Global
export const metadata: Metadata = {
  title: {
    default: "The Ribeor. | Digital Journal",
    template: "%s | The Ribeor." // Esto permite que los blogs digan "Título del Post | The Ribeor."
  },
  description: "Explorando la intersección entre diseño, tecnología e insights digitales. Un archivo visual y narrativo.",
  metadataBase: new URL('https://theribeor.com'), // Reemplaza con tu dominio real cuando lo tengas
  keywords: ["Design", "Technology", "Digital Journal", "Minimalism", "The Ribeor"],
  authors: [{ name: "The Ribeor" }],
  creator: "The Ribeor",
  
  // Open Graph (Cómo se ve en Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://theribeor.com",
    title: "The Ribeor. | Digital Journal",
    description: "Explorando la intersección entre diseño, tecnología e insights digitales.",
    siteName: "The Ribeor",
    images: [
      {
        url: "/og-image.jpg", // Debes subir una imagen de 1200x630 a tu carpeta /public
        width: 1200,
        height: 630,
        alt: "The Ribeor. Digital Journal cover",
      },
    ],
  },

  // Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "The Ribeor. | Digital Journal",
    description: "Archivo digital sobre diseño y tecnología.",
    images: ["/og-image.jpg"], 
  },

  // Iconos
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-black text-white">
      <body className="antialiased"> {/* antialiased mejora la legibilidad de la fuente */}
        <BubblesBackground />
        <Navbar />
        <main className="pt-24 relative z-10"> 
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}