import React from 'react';
import Link from 'next/link';
import PostCard from './PostCard';
import { Post } from '@/types';

interface Props {
  posts: Post[];
}

const PostGrid = ({ posts }: Props) => {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-0 pb-12">
      {featuredPost && (
        <Link href={`/blog/${featuredPost.slug}`} className="block mb-8 md:mb-10 group">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 items-center bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all cursor-pointer">
            
            <div className="w-full relative aspect-[16/10] lg:aspect-square rounded-2xl md:rounded-3xl overflow-hidden order-1 lg:order-2">
               <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                Featured Insight
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-white transition-colors text-white tracking-tighter">
                {featuredPost.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                {featuredPost.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                  {featuredPost.date}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid de posts restantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-14">
        {remainingPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostGrid;