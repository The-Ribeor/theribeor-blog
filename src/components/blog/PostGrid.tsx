import React from 'react';
import Link from 'next/link'; // Importamos Link
import PostCard from './PostCard';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

const PostGrid = ({ posts }: Props) => {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Post Destacado con LINK añadido */}
      {featuredPost && (
        <Link href={`/blog/${featuredPost.slug}`} className="block mb-16 group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#111] rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer">
            <div className="space-y-6">
              <span className="text-blue-500 font-medium tracking-widest uppercase text-sm">Featured Insight</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-blue-400 transition-colors text-white">
                {featuredPost.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed line-clamp-3">
                {featuredPost.description}
              </p>
              <span className="block text-gray-500 text-sm font-medium">{featuredPost.date}</span>
            </div>
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden">
               <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Link>
      )}

      {/* Grid de posts restantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {remainingPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostGrid;