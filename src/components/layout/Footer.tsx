"use client";
import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* IDENTIDAD */}
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white group">
              the ribeor<span className="text-blue-500 group-hover:animate-pulse">.</span>
            </Link>
            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium">
              Perspectivas sobre diseño, código y la creación de productos digitales desde una visión personal y minimalista.
            </p>
          </div>

          {/* NAVEGACIÓN Y REDES */}
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            {/* Explorar */}
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Explorar</span>
              <nav className="flex flex-col gap-3 text-sm">
                <Link href="/search?q=Design" className="text-gray-500 hover:text-white transition-colors">Disign</Link>
                <Link href="/search?q=Tech" className="text-gray-500 hover:text-white transition-colors">Tech</Link>
                <Link href="/search?q=Insights" className="text-gray-500 hover:text-white transition-colors">Insights</Link>
              </nav>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Social</span>
              <div className="flex flex-col gap-3 text-sm">
                <a 
                  href="https://github.com/The-Ribeor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/diegoberrio1601/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/theribeor/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PIE DE PÁGINA FINAL */}
        <div className="mt-24 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
              © {currentYear} Theribeor.com
            </p>
            <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
              Blog.theribeor.com
            </p>
          </div>
          
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
            Hecho con pasión & código
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;