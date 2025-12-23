// src/app/layout.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from "@/components/layout/Footer";
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body>
        <Navbar />
        <main className="pt-24"> {/* El padding-top es para que el contenido no quede debajo del nav fijo */}
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}