"use client";
import React, { useEffect, useState } from 'react';
import PostGrid from '@/components/blog/PostGrid';
import { Post } from '@/types';
import { getPosts } from '@/services/postService';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header centrado, limpio y personal */}
      <header className="text-center pt-32 pb-16 px-6">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
          Bitácora<span className="text-blue-500">.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Proyectos, reflexiones y notas personales sobre el proceso de crear en el mundo digital.
        </p>
      </header>
      
      <main className="pb-24">
        {posts.length > 0 ? (
          <div className="animate-in fade-in duration-1000">
            <PostGrid posts={posts} />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-sm tracking-widest uppercase">
              No hay publicaciones todavía
            </p>
          </div>
        )}
      </main>
    </div>
  );
}