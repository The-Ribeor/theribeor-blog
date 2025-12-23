"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPosts } from '@/services/postService';
import PostGrid from '@/components/blog/PostGrid';
import { Post } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-center';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchPosts(query);
        setResults(data);
      } catch (error) {
        console.error("❌ Error en la búsqueda:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <header className="mb-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group text-xs uppercase tracking-widest font-bold"
        >
          <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-1" />
          Volver a la Bitácora
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-none">
          {query ? (
            <>Resultados para <span className="text-blue-500">{query}</span></>
          ) : (
            "Archivo General"
          )}
        </h1>
        <p className="text-gray-500 text-lg font-light tracking-tight">
          {loading 
            ? "Explorando la base de datos..." 
            : `${results.length} ${results.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}.`
          }
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <PostGrid posts={results} />
        </div>
      ) : (
        /* Tarjeta de "Sin coincidencias" con Glassmorphism */
        <div className="py-24 text-center border border-white/5 rounded-[3rem] bg-white/[0.02] backdrop-blur-md">
          <p className="text-white text-2xl font-bold tracking-tighter mb-2">Sin coincidencias</p>
          <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
            No pudimos encontrar nada para "{query}". Intenta con términos generales como Diseño o Código.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    /* Cambiado bg-black a bg-black/40 con blur para consistencia */
    <div className="min-h-screen bg-black/40 backdrop-blur-[2px] pt-32 pb-32 relative">
      <Suspense fallback={
        <div className="flex justify-center pt-20">
          <div className="animate-pulse text-gray-500 uppercase tracking-widest text-[10px] font-bold">
            Sincronizando Archivo...
          </div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}