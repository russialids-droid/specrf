'use client'
import type { Category } from '@/data/categories'
import type { City } from '@/data/cities'

interface SpecialistProps {
  specialist: {
    id: string; name: string; experience_years: number
    price_from: number; price_to: number; rating: number
    reviews_count: number; is_featured: boolean; is_verified: boolean
    description: string; photo_url: string | null
  }
  category: Category
  city: City
}

export default function SpecialistCard({ specialist: s, category }: SpecialistProps) {
  const initials = s.name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const fullStars = Math.floor(s.rating)
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

  return (
    <div className={`specialist-card${s.is_featured ? ' featured' : ''}`}>
      {s.is_featured && <div className="top-label">⭐ Топ специалист</div>}
      <div className="inner">
        <div className="specialist-avatar">{initials}</div>
        <div className="specialist-info">
          <div className="specialist-name">
            {s.name}{s.is_verified && <span style={{color:'#2563eb',marginLeft:'4px'}}>✓</span>}
          </div>
          <div className="specialist-meta">{category.name} · Опыт {s.experience_years} лет</div>
          <div className="specialist-desc">{s.description}</div>
          <div className="specialist-footer">
            <div>
              <span className="stars">{stars}</span>
              <span style={{fontSize:'0.875rem',fontWeight:500,marginLeft:'4px'}}>{s.rating.toFixed(1)}</span>
              <span className="rating-count">({s.reviews_count} отзывов)</span>
            </div>
            <button className="btn-contact" onClick={() => document.getElementById('lead-form')?.scrollIntoView({behavior:'smooth'})}>
              Связаться
            </button>
          </div>
        </div>
        <div className="specialist-price">
          <div className="price">от {s.price_from.toLocaleString('ru-RU')} ₽</div>
          <div className="price-unit">{category.priceUnit}</div>
        </div>
      </div>
    </div>
  )
}
