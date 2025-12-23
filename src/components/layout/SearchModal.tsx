"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Lógica para cerrar con ESC y poner el foco automático
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // El timeout da tiempo a que el modal aparezca antes de enfocar
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
      setSearchTerm('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-start justify-center pt-32 px-6 animate-in fade-in duration-300">
      
      {/* Botón X para cerrar con el mouse */}
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 text-gray-500 hover:text-white transition-all hover:rotate-90"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-3xl">
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search insights, tech, design..."
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-transparent border-b-2 border-white/10 pb-6 text-4xl md:text-6xl font-bold text-white outline-none focus:border-blue-500 transition-colors placeholder:text-white/5"
          />
          
          {/* Aquí está el texto que recordabas */}
          <div className="mt-6 flex items-center justify-between text-gray-500">
            <p className="text-sm tracking-[0.2em] uppercase font-medium">
              Escribe algo para buscar
            </p>
            <p className="text-xs border border-white/20 px-2 py-1 rounded uppercase tracking-tighter">
              Presiona <span className="text-white">Esc</span> para cerrar
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}