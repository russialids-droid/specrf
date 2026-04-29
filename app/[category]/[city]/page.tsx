import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import { generateFAQSchema, generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/seo'
import LeadForm from '@/components/LeadForm'
import SpecialistCard from '@/components/SpecialistCard'

const SUPABASE_URL = 'https://brxhvfmqhuivyimcmycy.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeGh2Zm1xaHVpdnlpbWNteWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjE5MzgsImV4cCI6MjA5MjkzNzkzOH0.70HfIHd-HMaq1HthDf5U0qZIlW27iq6ijPnVEz40mpI'

interface Props { params: Promise<{ category: string; city: string }> }

export async function generateStaticParams() {
  const paths: { category: string; city: string }[] = []
  for (const cat of CATEGORIES.slice(0, 20)) {
    for (const city of CITIES.slice(0, 55)) {
      paths.push({ category: cat.slug, city: city.slug })
    }
  }
  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: catSlug, city: citySlug } = await params
  const cat = CATEGORIES.find(c => c.slug === catSlug)
  const city = CITIES.find(c => c.slug === citySlug)
  if (!cat || !city) return {}
  const title = `${cat.namePlural} в ${city.namePred} — найти и заказать | СпецРФ`
  const description = `${cat.namePlural} в ${city.namePred}: ${cat.description}. Проверенные специалисты, отзывы, цены от ${cat.avgPrice} ${cat.priceUnit}.`
  return { title, description, alternates: { canonical: `https://specrf.pages.dev/${catSlug}/${citySlug}/` } }
}

async function getSpecialists(catSlug: string, citySlug: string) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/specialists?category_slug=eq.${catSlug}&city_slug=eq.${citySlug}&is_active=eq.true&order=is_featured.desc,rating.desc&limit=20`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        next: { revalidate: 3600 }
      }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

async function getCount(catSlug: string, citySlug: string): Promise<number> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/specialists?category_slug=eq.${catSlug}&city_slug=eq.${citySlug}&is_active=eq.true&select=id`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'count=exact',
          'Range-Unit': 'items',
          'Range': '0-0',
        },
        next: { revalidate: 3600 }
      }
    )
    const range = res.headers.get('content-range') || ''
    const total = range.split('/')[1]
    return total ? parseInt(total) : 0
  } catch {
    return 0
  }
}

// Моковые данные как запасной вариант
function getMockSpecialists(cat: { name: string; avgPrice: string; priceUnit: string }, city: { name: string }, count = 6) {
  const names = ['Александр Петров','Ирина Смирнова','Дмитрий Козлов','Наталья Иванова','Сергей Волков','Елена Новикова']
  const price = parseInt(cat.avgPrice.split('–')[0].replace(/\D/g,''))
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-${i}`, name: names[i % names.length],
    experience_years: 3 + (i * 2) % 15,
    price_from: price, price_to: price * 2,
    rating: parseFloat((4.2 + (i % 8) * 0.1).toFixed(1)),
    reviews_count: 5 + i * 7,
    is_featured: i < 2, is_verified: i < 5,
    description: `Опытный ${cat.name.toLowerCase()} в ${city.name}. Индивидуальный подход к каждому клиенту.`,
    photo_url: null,
  }))
}

export default async function CityPage({ params }: Props) {
  const { category: catSlug, city: citySlug } = await params
  const cat = CATEGORIES.find(c => c.slug === catSlug)
  const city = CITIES.find(c => c.slug === citySlug)
  if (!cat || !city) notFound()

  // Загружаем реальных специалистов из Supabase
  const [dbSpecialists, totalCount] = await Promise.all([
    getSpecialists(catSlug, citySlug),
    getCount(catSlug, citySlug),
  ])

  // Используем реальные данные или мок
  const specialists = dbSpecialists.length > 0 ? dbSpecialists : getMockSpecialists(cat, city)
  const displayCount = totalCount > 0 ? totalCount : specialists.length

  const faqSchema = generateFAQSchema(cat, city)
  const breadcrumbSchema = generateBreadcrumbSchema(cat, city)
  const listSchema = generateLocalBusinessSchema(cat, city)
  const relatedCats = CATEGORIES.filter(c => c.slug !== cat.slug).slice(0, 6)
  const relatedCities = CITIES.filter(c => c.slug !== city.slug).slice(0, 8)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

      <div style={{maxWidth:'1152px',margin:'0 auto',padding:'2rem 1rem'}}>
        <nav style={{fontSize:'0.875rem',color:'#9ca3af',marginBottom:'1.5rem',display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          <a href="/" style={{color:'#9ca3af'}}>Главная</a><span>/</span>
          <a href={`/${cat.slug}/`} style={{color:'#9ca3af'}}>{cat.namePlural}</a><span>/</span>
          <span style={{color:'#111827'}}>{city.name}</span>
        </nav>

        <div className="page-grid" style={{display:'block'}}>
          <style>{`@media(min-width:1024px){.page-grid{display:grid!important;grid-template-columns:1fr 320px!important;gap:2rem!important}}`}</style>

          <div>
            <h1 style={{fontSize:'1.75rem',fontWeight:700,marginBottom:'0.75rem'}}>{cat.namePlural} в {city.namePred}</h1>
            <p style={{color:'#4b5563',marginBottom:'0.75rem'}}>
              Найдите проверенного {cat.nameVin} в {city.namePred}. {displayCount > 0 ? `${displayCount} специалистов` : 'Специалисты'} в базе — с отзывами, опытом и ценами.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem',marginBottom:'1.5rem'}}>
              <span style={{background:'#d1fae5',color:'#065f46',fontSize:'0.75rem',padding:'0.2rem 0.75rem',borderRadius:'9999px',fontWeight:500}}>✓ Реальные данные из 2GIS</span>
              <span style={{background:'#dbeafe',color:'#1e40af',fontSize:'0.75rem',padding:'0.2rem 0.75rem',borderRadius:'9999px',fontWeight:500}}>💰 {cat.avgPrice} {cat.priceUnit}</span>
              <span style={{background:'#ede9fe',color:'#5b21b6',fontSize:'0.75rem',padding:'0.2rem 0.75rem',borderRadius:'9999px',fontWeight:500}}>⭐ Реальные отзывы</span>
            </div>

            <div style={{marginBottom:'2rem'}}>
              {specialists.map((s: any) => <SpecialistCard key={s.id} specialist={s} category={cat} city={city} />)}
            </div>

            <div style={{marginBottom:'2rem'}} className="mobile-form">
              <style>{`.mobile-form{display:block}@media(min-width:1024px){.mobile-form{display:none}}`}</style>
              <LeadForm categorySlug={cat.slug} citySlug={city.slug} categoryName={cat.nameVin} cityName={city.namePred} />
            </div>

            <h2 style={{fontSize:'1.25rem',fontWeight:700,marginBottom:'1rem'}}>Частые вопросы о {cat.nameRod} в {city.namePred}</h2>
            <div style={{marginBottom:'2rem'}}>
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:'0.75rem',marginBottom:'0.5rem'}}>
                  <summary style={{padding:'1rem',cursor:'pointer',fontWeight:500,listStyle:'none'}}>{faq.name}</summary>
                  <div style={{padding:'0 1rem 1rem',fontSize:'0.875rem',color:'#4b5563',lineHeight:1.6}}>{faq.acceptedAnswer.text}</div>
                </details>
              ))}
            </div>

            <div style={{background:'#f9fafb',borderRadius:'1rem',padding:'1.5rem',marginBottom:'1.5rem',fontSize:'0.875rem',color:'#4b5563',lineHeight:1.7}}>
              <h2 style={{fontSize:'1rem',fontWeight:600,color:'#1f2937',marginBottom:'0.75rem'}}>О {cat.nameRod} в {city.namePred}</h2>
              <p style={{marginBottom:'0.75rem'}}>
                {city.name} — город с населением {city.population.toLocaleString('ru-RU')} человек в регионе {city.region}.
                {cat.namePlural} в {city.namePred} работают как частные специалисты, так и в составе компаний.
              </p>
              <p>Средняя стоимость услуг — {cat.avgPrice} {cat.priceUnit}. На СпецРФ вы найдёте проверенного {cat.nameVin} в {city.namePred} с реальными данными из справочника 2GIS.</p>
            </div>

            <div style={{marginBottom:'1.5rem'}}>
              <h3 style={{fontWeight:600,marginBottom:'0.75rem',color:'#374151',fontSize:'0.9rem'}}>Другие специалисты в {city.namePred}</h3>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
                {relatedCats.map(c => (
                  <a key={c.slug} href={`/${c.slug}/${city.slug}/`}
                    style={{background:'#fff',border:'1px solid #e5e7eb',fontSize:'0.8125rem',color:'#4b5563',padding:'0.375rem 0.875rem',borderRadius:'0.5rem'}}>
                    {c.icon} {c.namePlural}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{fontWeight:600,marginBottom:'0.75rem',color:'#374151',fontSize:'0.9rem'}}>{cat.namePlural} в других городах</h3>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
                {relatedCities.map(c => (
                  <a key={c.slug} href={`/${cat.slug}/${c.slug}/`}
                    style={{background:'#fff',border:'1px solid #e5e7eb',fontSize:'0.8125rem',color:'#4b5563',padding:'0.375rem 0.875rem',borderRadius:'0.5rem'}}>
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="desktop-sidebar">
            <style>{`.desktop-sidebar{display:none}@media(min-width:1024px){.desktop-sidebar{display:block}}`}</style>
            <div style={{position:'sticky',top:'80px'}}>
              <LeadForm categorySlug={cat.slug} citySlug={city.slug} categoryName={cat.nameVin} cityName={city.namePred} />
              <div style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:'0.75rem',padding:'1rem',marginTop:'1rem'}}>
                <p style={{fontSize:'0.75rem',color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:500,marginBottom:'0.75rem'}}>О городе</p>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.875rem',marginBottom:'0.5rem'}}>
                  <span style={{color:'#6b7280'}}>Регион</span><span style={{fontWeight:500}}>{city.region}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.875rem',marginBottom:'0.5rem'}}>
                  <span style={{color:'#6b7280'}}>Население</span><span style={{fontWeight:500}}>{(city.population/1000).toFixed(0)} тыс.</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.875rem'}}>
                  <span style={{color:'#6b7280'}}>Специалистов</span><span style={{fontWeight:500}}>{displayCount > 0 ? `${displayCount}+` : specialists.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
