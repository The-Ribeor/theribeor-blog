// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPosts } from '@/services/postService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const baseUrl = 'https://theribeor.com' // Cambia por tu dominio real

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    ...postUrls,
  ]
}