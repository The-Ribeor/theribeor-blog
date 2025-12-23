"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react'; 
import SubscribeModal from './SubscribeModal';
import SearchModal from './SearchModal'; // ✅ Importación corregida al componente local

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-white group">
            The Ribeor<span className="text-blue-500 group-hover:animate-pulse">.</span>
          </Link>

          {/* CATEGORÍAS (Escritorio) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/search?q=Design" className="hover:text-white transition-colors font-semibold">Design</Link>
            <Link href="/search?q=Tech" className="hover:text-white transition-colors font-semibold">Tech</Link>
            <Link href="/search?q=Insights" className="hover:text-white transition-colors font-semibold">Insights</Link>
          </div>

          {/* ACCIONES (Escritorio) */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => setIsSubscribeOpen(true)}
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Suscríbete al Journal.
            </button>
          </div>

          {/* MENÚ MÓVIL (Botones visibles en móvil) */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="text-gray-400 p-2"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE PARA MÓVIL */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6 text-2xl font-bold tracking-tight">
              <Link href="/search?q=Design" onClick={() => setIsMobileMenuOpen(false)}>Design</Link>
              <Link href="/search?q=Tech" onClick={() => setIsMobileMenuOpen(false)}>Tech</Link>
              <Link href="/search?q=Insights" onClick={() => setIsMobileMenuOpen(false)}>Insights</Link>
            </div>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSubscribeOpen(true);
              }}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg"
            >
              Suscríbete al Journal.
            </button>
          </div>
        )}
      </nav>

      {/* COMPONENTES DE MODAL */}
      {/* Estos se activan mediante los estados controlados arriba */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <SubscribeModal 
        isOpen={isSubscribeOpen} 
        onClose={() => setIsSubscribeOpen(false)} 
      />
    </>
  );
};

export default Navbar;