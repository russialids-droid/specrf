'use client'
import type { Category } from '@/data/categories'
import type { City } from '@/data/cities'

interface SpecialistProps {
  specialist: {
    id: string; name: string; experience_years: number
    price_from: number; price_to: number; rating: number
    reviews_count: number; is_featured: boolean; is_verified: boolean
    description: string; photo_url: string | null; phone?: string | null
  }
  category: Category
  city: City
}

export default function SpecialistCard({ specialist: s, category }: SpecialistProps) {
  const initials = s.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const fullStars = Math.floor(s.rating)
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

  function scrollToForm() {
    const el = document.getElementById('lead-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.style.outline = '3px solid #2563eb'
      setTimeout(() => { el.style.outline = '' }, 2000)
      const input = el.querySelector('input') as HTMLInputElement
      if (input) setTimeout(() => input.focus(), 600)
    }
  }

  return (
    <div className={`specialist-card${s.is_featured ? ' featured' : ''}`}>
      {s.is_featured && <div className="top-label">⭐ Топ специалист</div>}
      <div className="inner">
        <div className="specialist-avatar">{initials}</div>
        <div className="specialist-info">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'0.5rem'}}>
            <div>
              <div className="specialist-name">
                {s.name}
                {s.is_verified && <span style={{color:'#2563eb',marginLeft:'4px',fontSize:'0.875rem'}}>✓</span>}
              </div>
              <div className="specialist-meta">
                {category.name}
                {s.experience_years > 0 && ` · Опыт ${s.experience_years} лет`}
              </div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              {s.price_from > 0 ? (
                <>
                  <div className="price">от {s.price_from.toLocaleString('ru-RU')} ₽</div>
                  <div className="price-unit">{category.priceUnit}</div>
                </>
              ) : (
                <div style={{fontSize:'0.8rem',color:'#9ca3af'}}>Цена по запросу</div>
              )}
            </div>
          </div>

          {s.description && (
            <div className="specialist-desc" style={{marginTop:'0.5rem'}}>{s.description}</div>
          )}

          <div className="specialist-footer" style={{marginTop:'0.75rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
              {s.rating > 0 && (
                <>
                  <span className="stars">{stars}</span>
                  <span style={{fontSize:'0.875rem',fontWeight:500}}>{s.rating.toFixed(1)}</span>
                  {s.reviews_count > 0 && (
                    <span className="rating-count">({s.reviews_count} отзывов)</span>
                  )}
                </>
              )}
            </div>
            <div style={{display:'flex',gap:'0.5rem',alignItems:'center',flexWrap:'wrap'}}>
              {s.phone && (
                <a href={`tel:${s.phone}`} style={{
                  display:'inline-block', fontSize:'0.75rem',
                  background:'#fff', color:'#2563eb',
                  border:'1px solid #2563eb',
                  padding:'0.375rem 0.75rem', borderRadius:'0.5rem',
                  textDecoration:'none', fontWeight:500
                }}>
                  📞 {s.phone}
                </a>
              )}
              <button
                onClick={scrollToForm}
                style={{
                  fontSize:'0.75rem', background:'#2563eb', color:'#fff',
                  padding:'0.375rem 0.75rem', borderRadius:'0.5rem',
                  border:'none', cursor:'pointer', fontWeight:500
                }}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
