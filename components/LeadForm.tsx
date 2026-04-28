'use client'

import { useState } from 'react'

interface Props {
  categorySlug: string
  citySlug: string
  categoryName: string
  cityName: string
}

export default function LeadForm({ categorySlug, citySlug, categoryName, cityName }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, category_slug: categorySlug, city_slug: citySlug }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setPhone(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div id="lead-form" className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-lg mb-1">Найти {categoryName}</h3>
      <p className="text-sm text-gray-500 mb-4">в {cityName} — бесплатно</p>

      {status === 'success' ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-gray-800 mb-1">Заявка принята!</p>
          <p className="text-sm text-gray-500">Специалист свяжется с вами в течение 1 часа</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Ваше имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Александр"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Телефон</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 font-medium">Опишите задачу (необязательно)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Кратко опишите, что нужно сделать..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-xs">Произошла ошибка. Попробуйте ещё раз.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? 'Отправляем...' : 'Найти специалиста'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="/privacy" className="underline hover:text-gray-600">политикой конфиденциальности</a>
          </p>
        </form>
      )}
    </div>
  )
}
