import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna Logo */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              the ribeor<span className="text-blue-500">.</span>
            </Link>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              Explorando la intersección entre el diseño minimalista, la tecnología de vanguardia y las ideas que dan forma al futuro.
            </p>
          </div>

          {/* Columna Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-6">Explorar</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/search?q=design" className="hover:text-white transition-colors">Diseño</Link></li>
              <li><Link href="/search?q=tech" className="hover:text-white transition-colors">Tecnología</Link></li>
              <li><Link href="/search?q=insights" className="hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>

          {/* Columna Social */}
          <div>
            <h4 className="text-white font-semibold mb-6">Social</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">X (Twitter)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} The Ribeor. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacidad</a>
            <a href="#" className="hover:text-gray-400">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;