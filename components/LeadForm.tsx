'use client'
import { useState } from 'react'

interface Props {
  categorySlug: string; citySlug: string; categoryName: string; cityName: string
}

export default function LeadForm({ categorySlug, citySlug, categoryName, cityName }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name, phone, message, category_slug: categorySlug, city_slug: citySlug}),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) { setName(''); setPhone(''); setMessage('') }
    } catch { setStatus('error') }
  }

  return (
    <div className="lead-form-wrap">
      <div id="lead-form" className="lead-form">
        <h3>Найти {categoryName}</h3>
        <p className="sub">в {cityName} — бесплатно</p>
        {status === 'success' ? (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <p style={{fontWeight:600,marginBottom:'0.25rem'}}>Заявка принята!</p>
            <p style={{fontSize:'0.875rem',color:'#6b7280'}}>Специалист свяжется с вами в течение 1 часа</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Ваше имя</label>
              <input className="form-input" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Александр" required />
            </div>
            <div className="form-group">
              <label className="form-label">Телефон</label>
              <input className="form-input" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+7 (999) 123-45-67" required />
            </div>
            <div className="form-group">
              <label className="form-label">Опишите задачу (необязательно)</label>
              <textarea className="form-input form-textarea" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Кратко опишите, что нужно..." rows={3} />
            </div>
            {status === 'error' && <p style={{color:'#ef4444',fontSize:'0.75rem',marginBottom:'0.5rem'}}>Ошибка. Попробуйте ещё раз.</p>}
            <button className="btn-submit" type="submit" disabled={status==='loading'}>
              {status === 'loading' ? 'Отправляем...' : 'Найти специалиста'}
            </button>
            <p className="form-privacy">Нажимая кнопку, вы соглашаетесь с <a href="/privacy">политикой конфиденциальности</a></p>
          </form>
        )}
      </div>
    </div>
  )
}
