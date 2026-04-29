import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import type { Metadata } from 'next'

interface Props { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const cat = CATEGORIES.find(c => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.namePlural} по всей России — найти специалиста | СпецРФ`,
    description: `Найдите ${cat.nameVin} в вашем городе. ${cat.description}. Сравните цены и отзывы.`,
    alternates: { canonical: `https://specrf.pages.dev/${slug}/` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const cat = CATEGORIES.find(c => c.slug === slug)
  if (!cat) notFound()

  const cities = CITIES.slice(0, 60)
  const related = CATEGORIES.filter(c => c.slug !== cat.slug).slice(0, 8)

  return (
    <div>
      <div style={{maxWidth:'1152px',margin:'0 auto',padding:'2rem 1rem'}}>
        <nav style={{fontSize:'0.875rem',color:'#9ca3af',marginBottom:'1.5rem'}}>
          <a href="/">Главная</a> / <span style={{color:'#111827'}}>{cat.namePlural}</span>
        </nav>

        <div style={{marginBottom:'2.5rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
            <span style={{fontSize:'2.5rem'}}>{cat.icon}</span>
            <h1 style={{fontSize:'2rem',fontWeight:700}}>{cat.namePlural} в России</h1>
          </div>
          <p style={{color:'#4b5563',fontSize:'1.125rem',maxWidth:'700px',marginBottom:'1rem'}}>{cat.description}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
            <span style={{background:'#d1fae5',color:'#065f46',fontSize:'0.875rem',padding:'0.25rem 0.75rem',borderRadius:'9999px'}}>
              💰 {cat.avgPrice} {cat.priceUnit}
            </span>
            {cat.subcategories.slice(0,3).map(s => (
              <span key={s} style={{background:'#dbeafe',color:'#1e40af',fontSize:'0.875rem',padding:'0.25rem 0.75rem',borderRadius:'9999px'}}>{s}</span>
            ))}
          </div>
        </div>

        <h2 style={{fontSize:'1.25rem',fontWeight:700,marginBottom:'1rem'}}>Выберите ваш город</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.75rem',marginBottom:'3rem'}}>
          {cities.map(city => (
            <a key={city.slug} href={`/${cat.slug}/${city.slug}/`}
              style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:'0.75rem',padding:'0.875rem 1rem',display:'block',transition:'border-color 0.15s'}}>
              <div style={{fontWeight:500,fontSize:'0.9rem',color:'#111827'}}>{city.name}</div>
              <div style={{fontSize:'0.75rem',color:'#9ca3af',marginTop:'0.2rem'}}>{city.region}</div>
            </a>
          ))}
        </div>

        <div style={{background:'#f9fafb',borderRadius:'1rem',padding:'1.5rem'}}>
          <h2 style={{fontSize:'1rem',fontWeight:600,marginBottom:'1rem'}}>Специализации</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
            {cat.subcategories.map(s => (
              <span key={s} style={{background:'#fff',border:'1px solid #e5e7eb',fontSize:'0.875rem',color:'#374151',padding:'0.375rem 0.875rem',borderRadius:'0.75rem'}}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{marginTop:'2rem'}}>
          <h3 style={{fontWeight:600,marginBottom:'0.75rem',color:'#374151'}}>Смежные специалисты</h3>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
            {related.map(r => (
              <a key={r.slug} href={`/${r.slug}/`}
                style={{background:'#fff',border:'1px solid #e5e7eb',fontSize:'0.875rem',color:'#4b5563',padding:'0.375rem 0.875rem',borderRadius:'0.75rem'}}>
                {r.icon} {r.namePlural}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
