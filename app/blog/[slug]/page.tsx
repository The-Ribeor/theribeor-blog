import { getPostBySlug } from '@/services/postService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import RelatedPosts from '@/components/blog/RelatedPosts';
import AuthorBox from '@/components/blog/AuthorBox'; // Asegúrate de crear este componente

// --- CONFIGURACIÓN DE SEO DINÁMICO ---
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
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Botón Volver */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Newsroom
        </Link>

        {/* Encabezado */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">
            <span className="text-blue-500">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-10">
            {post.title}
          </h1>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 shadow-2xl shadow-blue-900/10">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill 
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </header>

        {/* Contenido principal */}
        <div className="prose prose-invert prose-lg max-w-none pb-12 border-b border-white/10">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* --- CAJA DE AUTOR (DIEGO BERRIO) --- */}
        <AuthorBox/>
       

        {/* --- SECCIÓN DE POSTS RELACIONADOS --- */}
        <RelatedPosts currentPostId={post.id} category={post.category} />
        
      </div>
    </article>
  );
}