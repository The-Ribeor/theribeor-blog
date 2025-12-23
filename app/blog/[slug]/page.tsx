import { getPostBySlug } from '@/services/postService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import RelatedPosts from '@/components/blog/RelatedPosts';
import AuthorBox from '@/components/blog/AuthorBox';
import ReactMarkdown from 'react-markdown'; 
import NewsletterForm from '@/components/blog/NewsletterForm';

const NewsletterBox = () => (
  <section className="my-12 p-8 md:p-12 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2.5rem] text-center">
    <div className="max-w-xl mx-auto space-y-4">
      <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px]">
        Newsletter
      </span>
      <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
        Únete a la Bitácora.
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        Recibe mis reflexiones sobre diseño, fragmentos de código y el oficio de crear directamente en tu bandeja.
      </p>
      <NewsletterForm />
    </div>
  </section>
);

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post no encontrado | The Ribeor' };

  const fullTitle = `${post.title} | The Ribeor`;
  const description = post.description || post.content.substring(0, 160);
  const ogImage = post.imageUrl || '/og-image.jpg';

  return {
    title: fullTitle,
    description: description,
    alternates: { canonical: `https://theribeor.com/blog/${slug}` },
    openGraph: {
      title: fullTitle,
      description: description,
      url: `https://theribeor.com/blog/${slug}`,
      siteName: 'The Ribeor',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Diego Berrio'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.imageUrl,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Diego Berrio', url: 'https://theribeor.com' },
    description: post.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Article con fondo traslúcido para mejorar legibilidad */}
      <article className="min-h-screen bg-black/40 backdrop-blur-[2px] text-white pt-12 pb-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Volver a la Bitácora
          </Link>

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
              <Image src={post.imageUrl} alt={post.title} fill priority className="object-cover" />
            </div>
          </header>

          <div className="prose prose-invert prose-blue max-w-none pb-12 border-b border-white/10 
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <NewsletterBox />
          <div className="py-12">
            <AuthorBox />
          </div>
          <RelatedPosts currentPostId={post.id} category={post.category} />
        </div>
      </article>
    </>
  );
}