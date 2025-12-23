import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
     
      <div className="relative aspect-video overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] bg-gray-900 mb-3">
        <Image 
          src={post.imageUrl} 
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1.5"> {/* Reducido para mayor densidad visual */}
        <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-medium text-gray-500 uppercase tracking-widest">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg md:text-xl font-bold leading-tight text-white group-hover:text-blue-400 transition-colors line-clamp-2 tracking-tight">
          {post.title}
        </h3>
        <p className="text-gray-400 line-clamp-2 text-xs md:text-sm leading-relaxed opacity-80 font-normal">
          {post.description}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;