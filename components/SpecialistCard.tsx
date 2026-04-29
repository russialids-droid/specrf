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
  const modalId = `modal-${s.id}`

  return (
    <>
      {/* CSS-only модальное окно */}
      <style>{`
        #${modalId}:target { display:flex!important; }
        .modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center; }
        .modal-box { background:#fff; border-radius:1rem; padding:2rem; max-width:420px; width:90%; position:relative; }
        .modal-close { position:absolute; top:1rem; right:1rem; font-size:1.5rem; text-decoration:none; color:#9ca3af; line-height:1; }
        .modal-title { font-size:1.25rem; font-weight:700; margin-bottom:0.25rem; }
        .modal-sub { font-size:0.875rem; color:#6b7280; margin-bottom:1.5rem; }
        .modal-input { width:100%; border:1px solid #e5e7eb; border-radius:0.75rem; padding:0.75rem 1rem; font-size:1rem; margin-bottom:0.75rem; box-sizing:border-box; font-family:inherit; }
        .modal-btn { width:100%; background:#2563eb; color:#fff; border:none; border-radius:0.75rem; padding:0.875rem; font-size:1rem; font-weight:600; cursor:pointer; }
      `}</style>

      <div id={modalId} className="modal-overlay">
        <div className="modal-box">
          <a href="#" className="modal-close">×</a>
          <div className="modal-title">Оставить заявку</div>
          <div className="modal-sub">{s.name} — {category.name}</div>
          <form action="/api/leads" method="POST">
            <input type="hidden" name="category_slug" value={category.slug} />
            <input type="hidden" name="specialist" value={s.name} />
            <input className="modal-input" type="text" name="name" placeholder="Ваше имя" required />
            <input className="modal-input" type="tel" name="phone" placeholder="+7 (999) 123-45-67" required />
            <textarea className="modal-input" name="message" placeholder="Опишите задачу..." rows={3} style={{resize:'none'}} />
            <button className="modal-btn" type="submit">Отправить заявку</button>
          </form>
        </div>
      </div>

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
              <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                {s.phone && (
                  <a href={`tel:${s.phone}`} style={{
                    fontSize:'0.75rem', background:'#fff', color:'#2563eb',
                    border:'1px solid #2563eb', padding:'0.375rem 0.75rem',
                    borderRadius:'0.5rem', textDecoration:'none', fontWeight:500
                  }}>📞 {s.phone}</a>
                )}
                <a href={`#${modalId}`} style={{
                  fontSize:'0.75rem', background:'#2563eb', color:'#fff',
                  padding:'0.375rem 0.75rem', borderRadius:'0.5rem',
                  textDecoration:'none', fontWeight:500
                }}>Оставить заявку</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
