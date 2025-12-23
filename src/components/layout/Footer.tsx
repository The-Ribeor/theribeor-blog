"use client";
import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* Cambiado a bg-transparent y añadido backdrop-blur para ver las burbujas */
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/5 pt-24 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* IDENTIDAD */}
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white group">
              The Ribeor<span className="text-blue-500 group-hover:animate-pulse">.</span>
            </Link>
            {/* Texto mejorado alineado al Header */}
            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium">
              Explorando la ingeniería visual y el diseño sistémico. Un registro dedicado al oficio de construir software con intención estética.
            </p>
            {/* Indicador de Status (Toque Pro) */}
            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                Disponible para proyectos
              </span>
            </div>
          </div>

          {/* NAVEGACIÓN Y REDES */}
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            {/* Explorar */}
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Explorar</span>
              <nav className="flex flex-col gap-3 text-sm">
                {/* Corregido: "Disign" -> "Design" */}
                <Link href="/search?q=Design" className="text-gray-500 hover:text-white transition-colors">Design</Link>
                <Link href="/search?q=Code" className="text-gray-500 hover:text-white transition-colors">Code</Link>
                <Link href="/search?q=Process" className="text-gray-500 hover:text-white transition-colors">Process</Link>
              </nav>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Conectar</span>
              <div className="flex flex-col gap-3 text-sm">
                <a 
                  href="https://github.com/The-Ribeor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                >
                  <Github size={14} className="group-hover:text-blue-500 transition-colors" /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/diegoberrio1601/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                >
                  <Linkedin size={14} className="group-hover:text-blue-500 transition-colors" /> LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/theribeor/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                >
                  <Instagram size={14} className="group-hover:text-blue-500 transition-colors" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PIE DE PÁGINA FINAL */}
        <div className="mt-24 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
              © {currentYear} The Ribeor
            </p>
            <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
               DIGITAL JOURNAL
            </p>
          </div>
          
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
             Fabricado con <span className="text-blue-500">pasión</span> & <span className="text-blue-500">código</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;