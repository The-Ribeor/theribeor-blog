"use client";
import React, { useEffect, useState } from 'react';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post } from '@/types';
import PostCard from './PostCard';

interface Props {
  currentPostId: string;
  category: string;
}

export default function RelatedPosts({ currentPostId, category }: Props) {
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const postsRef = collection(db, 'posts');
      // Buscamos posts de la misma categoría, excluyendo el actual
      const q = query(
        postsRef, 
        where('category', '==', category),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Post))
        .filter(post => post.id !== currentPostId) // No mostrar el post que ya están leyendo
        .slice(0, 3); // Solo mostrar 3

      setRelated(posts);
    };

    fetchRelated();
  }, [currentPostId, category]);

  if (related.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-white/5">
      <h3 className="text-2xl font-bold text-white mb-10 tracking-tighter">
        Sigue leyendo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}