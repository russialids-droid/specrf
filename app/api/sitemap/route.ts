import { NextResponse } from 'next/server'
import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'

export const dynamic = 'force-static'
export const revalidate = 86400 // раз в сутки

export async function GET() {
  const baseUrl = 'https://specrf.ru'
  const now = new Date().toISOString().split('T')[0]

  const urls: string[] = []

  // Главная
  urls.push(`<url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${now}</lastmod></url>`)

  // Категории
  for (const cat of CATEGORIES) {
    urls.push(`<url><loc>${baseUrl}/${cat.slug}/</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${now}</lastmod></url>`)
  }

  // Страницы категория + город (основные SEO-страницы)
  for (const cat of CATEGORIES) {
    for (const city of CITIES) {
      urls.push(`<url><loc>${baseUrl}/${cat.slug}/${city.slug}/</loc><changefreq>weekly</changefreq><priority>0.7</priority><lastmod>${now}</lastmod></url>`)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
