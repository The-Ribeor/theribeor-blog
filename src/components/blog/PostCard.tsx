import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // <--- Importante
import { Post } from '@/types';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    // Envolvemos todo en un Link usando el slug de Firebase
    <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gray-900 mb-6">
        <Image 
          src={post.imageUrl} 
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;