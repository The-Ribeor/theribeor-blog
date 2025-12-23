import { getPostBySlug } from '@/services/postService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import RelatedPosts from '@/components/blog/RelatedPosts';
import AuthorBox from '@/components/blog/AuthorBox';
import ReactMarkdown from 'react-markdown'; // 👈 Importamos Markdown

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post no encontrado | The Ribeor' };

  return {
    title: `${post.title} | The Ribeor`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.imageUrl }],
      type: 'article',
      authors: ['Diego Berrio (@diegoberrio1601)'],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Botón Volver (Actualizado a Bitácora) */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Volver a la Bitácora
        </Link>

        {/* Encabezado */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">
            <span className="text-blue-500 font-bold">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none mb-10">
            {post.title}
          </h1>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill 
              priority
              className="object-cover"
            />
          </div>
        </header>

        {/* --- CONTENIDO CON MARKDOWN --- */}
        <div className="prose prose-invert prose-blue max-w-none pb-12 border-b border-white/10 
          prose-headings:tracking-tighter prose-headings:font-bold 
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-white prose-strong:font-bold
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl">
          
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Caja de Autor */}
        <div className="py-12">
          <AuthorBox />
        </div>

        {/* Posts Relacionados */}
        <RelatedPosts currentPostId={post.id} category={post.category} />
      </div>
    </article>
  );
}