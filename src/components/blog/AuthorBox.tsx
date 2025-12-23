"use client";
import React from 'react';
import Image from 'next/image';
import { Github, Instagram, Linkedin } from 'lucide-react';

const AuthorBox = () => {
  return (
    <div className="my-16 p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row items-center gap-10 transition-all hover:border-blue-500/20 group">
      
      {/* Tu Foto con efecto premium */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-blue-500 transition-all duration-700">
        <Image
          src="https://avatars.githubusercontent.com/u/166042870?v=4" 
          alt="Diego Berrio"
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
        />
      </div>

      {/* Contenido Personal */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-block px-3 py-1 rounded-full border border-blue-500/20 mb-4">
          <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] block">
            Autor del Journal
          </span>
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-3 tracking-tighter">
          Diego Berrio
        </h3>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl font-medium">
          Exploro la forma en que el diseño y la tecnología se encuentran. Este espacio es mi registro personal de ideas, proyectos y fragmentos de código que dan forma a mi proceso creativo.
        </p>

        {/* Links Sociales con interacción suave */}
        <div className="flex items-center justify-center md:justify-start gap-6">
          <a href="https://github.com/Diegoberrio1601" target="_blank" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/diegoberrio1601/" target="_blank" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1">
            <Linkedin size={20} />
          </a>
          <a href="https://instagram.com/diegoberrio1602" target="_blank" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;