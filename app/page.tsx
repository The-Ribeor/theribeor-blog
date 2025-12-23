"use client";
import React, { useEffect, useState } from 'react';
import PostGrid from '@/components/blog/PostGrid';
import { Post } from '@/types';
import { getPosts } from '@/services/postService';
import { Linkedin, Github, Instagram } from 'lucide-react';
import NewsletterForm from '@/components/blog/NewsletterForm';

const SkeletonCard = () => (
  <div className="space-y-4 animate-pulse">
    <div className="aspect-[16/9] w-full bg-white/5 rounded-sm"></div>
    <div className="space-y-2">
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
      <div className="h-3 bg-white/5 rounded w-full"></div>
    </div>
  </div>
);

const NewsletterBox = () => (
  <section className="my-12 p-8 md:p-12 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2.5rem] text-center">
    <div className="max-w-xl mx-auto space-y-4">
      <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px]">
        Newsletter
      </span>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
        Suscríbete al Journal.
      </h3>
      {/* TEXTO MEJORADO 1 */}
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        Una curaduría bimensual sobre estética funcional, arquitectura de software y el arte de construir productos digitales con alma.
      </p>
      <NewsletterForm />
    </div>
  </section>
);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth > 768) {
          if (window.scrollY > lastScrollY && window.scrollY > 50) { 
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      <div className={`
        transition-all duration-500 ease-in-out sticky top-0 z-50 bg-black/40 backdrop-blur-xl
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
        <header className="max-w-7xl mx-auto px-6 py-4 md:py-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-white">
                Journal<span className="text-blue-500">.</span>
              </h1>
              <span className="hidden md:block w-[1px] h-4 bg-white/10"></span>
              {/* TEXTO MEJORADO 2 (HEADER) */}
              <p className="hidden md:block text-gray-500 text-[10px] uppercase tracking-[0.2em] font-medium">
                Documentando procesos, código y la búsqueda de la simplicidad en lo digital.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2 hidden md:flex">
                <a href="https://github.com/The-Ribeor" target='_blank' rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Github className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/diegoberrio1601/" target='_blank' rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/theribeor/" target='_blank' rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
              <div className="text-right">
                <span className="block text-[9px] text-white font-bold tracking-widest uppercase">v.1.0</span>
              </div>
            </div>
          </div>
        </header>
      </div>
      
      <main className="pt-8 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <PostGrid posts={posts} />
          </div>
        )}
        <NewsletterBox />
      </main>
    </div>
  );
}