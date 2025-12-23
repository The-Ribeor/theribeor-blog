"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPosts } from '@/services/postService';
import PostGrid from '@/components/blog/PostGrid';
import { Post } from '@/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // Logs en consola para depuración
        console.log("🔍 Buscando en Firebase la palabra:", query);
        
        const data = await searchPosts(query);
        
        console.log("✅ Resultados recibidos:", data.length);
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
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
          {query ? `Resultados para "${query}"` : "Explorar todos los artículos"}
        </h1>
        <p className="text-gray-500 text-lg">
          {loading ? "Buscando en nuestra base de datos..." : `${results.length} artículos encontrados.`}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="animate-in fade-in duration-500">
          <PostGrid posts={results} />
        </div>
      ) : (
        <div className="py-20 text-center border border-white/5 rounded-[2.5rem] bg-[#0a0a0a]">
          <p className="text-gray-400 text-xl font-medium">No se encontraron resultados para tu búsqueda.</p>
          <p className="text-gray-600 mt-2">Prueba buscando temas como Design, Tech o Insights.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <Suspense fallback={
        <div className="text-white text-center pt-20">
          <div className="animate-pulse text-gray-400">Iniciando motor de búsqueda...</div>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}