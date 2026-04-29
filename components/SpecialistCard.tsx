'use client'
import { useState } from 'react'
import type { Category } from '@/data/categories'
import type { City } from '@/data/cities'

const SUPABASE_URL = 'https://brxhvfmqhuivyimcmycy.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeGh2Zm1xaHVpdnlpbWNteWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjE5MzgsImV4cCI6MjA5MjkzNzkzOH0.70HfIHd-HMaq1HthDf5U0qZIlW27iq6ijPnVEz40mpI'

// Токен бота добавим после создания
const TG_BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN || ''
const TG_CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID || ''

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

function Modal({ specialist, category, city, onClose }: {
  specialist: SpecialistProps['specialist']
  category: Category
  city: City
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      // 1. Сохраняем лид в Supabase
      await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name, phone, message,
          category_slug: category.slug,
          city_slug: city.slug,
          source_url: window.location.href
        })
      })

      // 2. Отправляем уведомление в Telegram (владельцу)
      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        const tgText = `🔔 *Новая заявка с СпецРФ*\n\n` +
          `👤 Клиент: ${name}\n` +
          `📞 Телефон: ${phone}\n` +
          `🔧 Специалист: ${specialist.name}\n` +
          `📂 Категория: ${category.name}\n` +
          `🏙️ Город: ${city.name}\n` +
          `${message ? `💬 Сообщение: ${message}\n` : ''}` +
          `${specialist.phone ? `📱 Телефон специалиста: ${specialist.phone}\n` : ''}` +
          `🌐 Страница: ${window.location.href}`

        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text: tgText,
            parse_mode: 'Markdown'
          })
        })
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.55)',
      zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'#fff', borderRadius:'1rem', padding:'2rem',
        maxWidth:'420px', width:'90%', position:'relative',
        maxHeight:'90vh', overflowY:'auto'
      }}>
        <button onClick={onClose} style={{
          position:'absolute', top:'1rem', right:'1rem',
          background:'none', border:'none', fontSize:'1.5rem',
          cursor:'pointer', color:'#9ca3af', lineHeight:1
        }}>×</button>

        {status === 'success' ? (
          <div style={{textAlign:'center', padding:'1rem'}}>
            <div style={{fontSize:'3rem', marginBottom:'1rem'}}>✅</div>
            <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:'0.5rem'}}>Заявка отправлена!</div>
            <div style={{color:'#6b7280', fontSize:'0.875rem', marginBottom:'1rem'}}>
              Специалист свяжется с вами в ближайшее время
            </div>
            {specialist.phone && (
              <div style={{background:'#eff6ff', borderRadius:'0.75rem', padding:'1rem', marginBottom:'1rem'}}>
                <div style={{fontSize:'0.875rem', color:'#4b5563', marginBottom:'0.5rem'}}>Или позвоните сами:</div>
                <a href={`tel:${specialist.phone}`} style={{
                  fontWeight:700, color:'#2563eb', fontSize:'1.1rem', textDecoration:'none'
                }}>📞 {specialist.phone}</a>
              </div>
            )}
            <button onClick={onClose} style={{
              background:'#2563eb', color:'#fff', border:'none',
              borderRadius:'0.75rem', padding:'0.75rem 2rem',
              cursor:'pointer', fontWeight:600
            }}>Закрыть</button>
          </div>
        ) : (
          <>
            <div style={{fontWeight:700, fontSize:'1.1rem', marginBottom:'0.25rem'}}>Оставить заявку</div>
            <div style={{color:'#6b7280', fontSize:'0.875rem', marginBottom:'1.25rem'}}>
              {specialist.name} — {category.name} в {city.namePred}
            </div>
            <form onSubmit={submit}>
              <input value={name} onChange={e=>setName(e.target.value)} required
                placeholder="Ваше имя" style={{
                  width:'100%', border:'1px solid #e5e7eb', borderRadius:'0.75rem',
                  padding:'0.75rem 1rem', fontSize:'1rem', marginBottom:'0.75rem',
                  boxSizing:'border-box' as any, fontFamily:'inherit', outline:'none'
                }} />
              <input value={phone} onChange={e=>setPhone(e.target.value)} required
                type="tel" placeholder="+7 (999) 123-45-67" style={{
                  width:'100%', border:'1px solid #e5e7eb', borderRadius:'0.75rem',
                  padding:'0.75rem 1rem', fontSize:'1rem', marginBottom:'0.75rem',
                  boxSizing:'border-box' as any, fontFamily:'inherit', outline:'none'
                }} />
              <textarea value={message} onChange={e=>setMessage(e.target.value)}
                placeholder="Опишите задачу (необязательно)..." rows={3} style={{
                  width:'100%', border:'1px solid #e5e7eb', borderRadius:'0.75rem',
                  padding:'0.75rem 1rem', fontSize:'1rem', marginBottom:'0.75rem',
                  boxSizing:'border-box' as any, fontFamily:'inherit',
                  outline:'none', resize:'none'
                }} />
              {status === 'error' && (
                <div style={{color:'#ef4444', fontSize:'0.8rem', marginBottom:'0.5rem'}}>
                  Ошибка. Попробуйте ещё раз.
                </div>
              )}
              <button type="submit" disabled={status==='loading'} style={{
                width:'100%', background:'#2563eb', color:'#fff',
                border:'none', borderRadius:'0.75rem', padding:'0.875rem',
                fontSize:'1rem', fontWeight:600, cursor:'pointer'
              }}>
                {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
              </button>
              <div style={{fontSize:'0.75rem', color:'#9ca3af', textAlign:'center', marginTop:'0.75rem'}}>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy/" style={{color:'#9ca3af'}}>политикой конфиденциальности</a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function SpecialistCard({ specialist: s, category, city }: SpecialistProps) {
  const [showModal, setShowModal] = useState(false)
  const initials = s.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const fullStars = Math.floor(s.rating)
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)

  return (
    <>
      {showModal && (
        <Modal specialist={s} category={category} city={city} onClose={() => setShowModal(false)} />
      )}
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
                  {category.name}{s.experience_years > 0 && ` · Опыт ${s.experience_years} лет`}
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                {s.price_from > 0 ? (
                  <><div className="price">от {s.price_from.toLocaleString('ru-RU')} ₽</div><div className="price-unit">{category.priceUnit}</div></>
                ) : (
                  <div style={{fontSize:'0.8rem',color:'#9ca3af'}}>Цена по запросу</div>
                )}
              </div>
            </div>
            {s.description && <div className="specialist-desc" style={{marginTop:'0.5rem'}}>{s.description}</div>}
            <div className="specialist-footer" style={{marginTop:'0.75rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
                {s.rating > 0 && (
                  <><span className="stars">{stars}</span>
                  <span style={{fontSize:'0.875rem',fontWeight:500}}>{s.rating.toFixed(1)}</span>
                  {s.reviews_count > 0 && <span className="rating-count">({s.reviews_count} отзывов)</span>}</>
                )}
              </div>
              <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                {s.phone && (
                  <a href={`tel:${s.phone}`} style={{
                    fontSize:'0.75rem',background:'#fff',color:'#2563eb',
                    border:'1px solid #2563eb',padding:'0.375rem 0.75rem',
                    borderRadius:'0.5rem',textDecoration:'none',fontWeight:500
                  }}>📞 {s.phone}</a>
                )}
                <button onClick={() => setShowModal(true)} style={{
                  fontSize:'0.75rem',background:'#2563eb',color:'#fff',
                  padding:'0.375rem 0.75rem',borderRadius:'0.5rem',
                  border:'none',cursor:'pointer',fontWeight:500
                }}>Оставить заявку</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
